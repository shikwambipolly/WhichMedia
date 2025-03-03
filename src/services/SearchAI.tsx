import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
    apiKey: '', // defaults to process.env["ANTHROPIC_API_KEY"]
    dangerouslyAllowBrowser: true
});

// Export the interface so it can be imported by other components
export interface Recommendation {
    title: string;
    id?: string;
}

async function SearchAI(description: string): Promise<Recommendation[]> {
    try {
        const msg = await anthropic.messages.create({
            model: "claude-3-haiku-20240307",
            system: "You are a an entertainment media expert. You are given a short description of a movie, TV show or game and you need to return a list of 5 recommendations based on the description. Only return the list, nothing else. Something like this: ['title1', 'title2', 'title3', 'title4', 'title5']",   
            max_tokens: 1024,
            messages: [
                { role: "user", content: description },
                { role: "assistant", content: "[" },
            ]
        });
        
        // Extract the content from the response
        let responseContent = '';

        console.log(msg.content);
        
        // Handle different Anthropic SDK response formats
        if (msg.content && Array.isArray(msg.content) && msg.content.length > 0) {
            const contentBlock = msg.content[0];
            
            // Handle different content block types based on Anthropic SDK versions
            if (typeof contentBlock === 'string') {
                // For SDK versions that might return string directly
                responseContent = contentBlock;
            } else if (typeof contentBlock === 'object') {
                // For object-based content blocks
                if ('type' in contentBlock && contentBlock.type === 'text' && 'text' in contentBlock) {
                    responseContent = contentBlock.text as string;
                } else if ('text' in contentBlock) {
                    responseContent = contentBlock.text as string;
                }
            }
        }
        
        // If we couldn't extract content, return empty array
        if (!responseContent) {
            console.error("Could not extract content from Claude response");
            return [];
        }
        
        // Complete the JSON array string (Claude will return a partial array)
        const jsonString = "[" + responseContent;
        
        // Parse the JSON string to get the array
        let titles: string[] = [];
        try {
            titles = JSON.parse(jsonString);
        } catch (parseError) {
            // If direct parsing fails, try to clean the string and parse again
            const cleanedContent = jsonString
                .replace(/'/g, '"')  // Replace single quotes with double quotes
                .replace(/\]\s*$/, ']'); // Ensure array is properly closed
                
            try {
                titles = JSON.parse(cleanedContent);
            } catch (e) {
                console.error("Failed to parse Claude response:", e);
                return [];
            }
        }
        
        // Convert the titles array to an array of recommendation objects
        const recommendations: Recommendation[] = titles.map((title) => ({
            title: typeof title === 'string' ? title.trim() : String(title).trim(),
            id: generateTempId(typeof title === 'string' ? title : String(title))
        }));
        
        return recommendations;
    } catch (error) {
        console.error("Error getting AI recommendations:", error);
        return []; // Return empty array instead of error message
    }
}

// Helper function to generate a temporary ID based on the title
function generateTempId(title: string): string {
    // Simple hash function to generate an ID from the title
    return 'rec_' + Math.abs(
        title.split('').reduce((acc, char) => {
            return ((acc << 5) - acc) + char.charCodeAt(0);
        }, 0)
    ).toString(16).substring(0, 8);
}

export default SearchAI;
