import axios from 'axios'
import { SearchResponse, ApiResponse, ErrorResponse, MovieDetailed } from '../types/api.types'; 
import { SearchFilters } from '../types/component.types';

// Create an axios instance with default configuration
const api = axios.create({
  baseURL: 'http://www.omdbapi.com/',
  params: {
    apiKey: '5e7560b6'
  }
})

/**
 * Function to search for movies by title
 * 
 * @param title The title to search for
 * @param page The page number to retrieve (default: 1)
 * @param filters Optional filters for type and year
 * @returns The search response from the API
 */
export const searchMedia = async (title: string, page = 1, filters?: Partial<SearchFilters>): Promise<ApiResponse<SearchResponse>> => {
  console.log(`Searching for "${title}" - page ${page} - filters:`, filters)
  try {
    // Build params object
    const params: Record<string, string | number> = {
      s: title,
      page: page
    }
    
    // Add filters if provided
    if (filters?.type && filters.type !== 'all') {
      params.type = filters.type
    }
    
    if (filters?.year && filters.year !== '') {
      params.y = filters.year
    }
    
    const response = await api.get('', {
      params
    })
    
    return response.data
  } catch (error) {
    console.error('API Error:', error)
    return {
      Response: "False",
      Error: "Failed to fetch data from the server"
    }
  }
}

/**
 * Function to fetch detailed information about a specific movie by its ID
 * 
 * @param imdbID The IMDb ID of the movie
 * @returns The detailed movie information
 */
export const fetchMovieDetails = async (imdbID: string): Promise<ApiResponse<MovieDetailed>> => {
  try {
    const response = await api.get('', {
      params: {
        i: imdbID,
        plot: 'full'
      }
    })
    
    return response.data
  } catch (error) {
    console.error('API Error:', error)
    return {
      Response: "False",
      Error: "Failed to fetch movie details"
    }
  }
}

/**
 * Utility function to check if a response is an error response
 * 
 * @param response The API response to check
 * @returns True if the response is an error response, false otherwise
 */
export const isErrorResponse = (response: any): response is ErrorResponse => {
  return response && 
         response.Response === "False" && 
         typeof response.Error === 'string';
}

export default {
  searchMedia,
  fetchMovieDetails,
  isErrorResponse
}