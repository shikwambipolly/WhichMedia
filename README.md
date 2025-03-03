# WhichMovie

A modern, responsive React application for searching movies, TV shows and games using the OMDB API. This application showcases modern React patterns with TypeScript, context-based state management, and robust error handling.

## Features

- **Instant Search**: Get results as you type with debounced search
- **Media Type & Year Filters**: Filter search results by media type and release year
- **Full Page Loading**: Load all results at once for better browsing
- **Pagination**: Navigate through search results with numbered pagination
- **Dark/Light Theme**: Toggle between dark and light modes with theme persistence
- **Responsive Design**: Optimized for desktop, tablet, and mobile screens
- **TypeScript Support**: Fully typed for better development experience and type safety
- **Movie Details Modal**: View detailed information about each movie with a click
- **AI Recommendations**: Get movie recommendations based on descriptions using AI
- **Liked Movies**: Save your favorite movies for later viewing
- **Error Handling**: Comprehensive error handling with error boundaries
- **Context API**: Efficient state management with React Context

## Project Structure

```
src/
├── assets/                  # Static assets
│   ├── like.svg
│   ├── media.svg
│   └── video-game.svg
├── components/
│   ├── error/               # Error handling components
│   │   ├── ErrorBoundary.tsx
│   │   └── GlobalErrorHandler.tsx
│   ├── layout/              # Layout components
│   │   ├── Header.tsx
│   │   └── Layout.tsx
│   ├── search/              # Search-related components
│   │   ├── AskAI.tsx        # AI recommendation interface
│   │   ├── LikedMovies.tsx  # Saved/liked movies display
│   │   ├── MovieCard.tsx    # Individual movie display
│   │   ├── MovieGrid.tsx    # Grid of movie results
│   │   ├── Pagination.tsx   # Page navigation
│   │   ├── StandardSearchForm.tsx  # Main search form
│   │   └── StandardSearchResults.tsx # Results display
│   └── ui/                  # Reusable UI components
│       ├── ErrorMessage.tsx
│       ├── LoadingMessage.tsx
│       ├── MovieDetailsModal.tsx
│       └── ThemeToggle.tsx
├── context/                 # React Context providers
│   ├── LikedMoviesContext.tsx  # Liked movies state management
│   └── ThemeContext.tsx     # Theme state management
├── hooks/                   # Custom React hooks
│   ├── useDebounce.ts       # Input debouncing
│   ├── useMovieSearch.ts    # Movie search functionality
│   ├── useSearch.ts         # Search state management
│   └── useTheme.ts          # Theme functionality
├── services/                # API services
│   ├── api.ts               # OMDB API client
│   └── SearchAI.tsx         # AI recommendation service
├── styles/                  # CSS styles
│   ├── components/
│   │   ├── error.css        # Error component styles
│   │   ├── layout.css       # Layout component styles
│   │   ├── modal.css        # Modal styles
│   │   ├── search.css       # Search component styles
│   │   └── ui.css           # UI component styles
│   ├── global.css           # Global styles
│   └── variables.css        # CSS variables for theming
├── types/                   # TypeScript type definitions
│   ├── api.types.ts         # API-related types
│   ├── component.types.ts   # Component prop types
│   ├── context.types.ts     # Context-related types
│   ├── hook.types.ts        # Hook return types
│   └── index.ts             # Type exports
├── App.tsx                  # Main App component
├── index.ts                 # Exports for easier imports
└── main.tsx                 # Application entry point
```

## Type System

The application uses a comprehensive TypeScript type system:

- **API Types**: Strong typing for API requests and responses in `api.types.ts`
- **Component Types**: Props interfaces for all components in `component.types.ts`
- **Context Types**: Type definitions for context providers in `context.types.ts`
- **Hook Types**: Return type definitions for custom hooks in `hook.types.ts`

## State Management

The application uses a multi-layered state management approach:

- **ThemeContext**: Manages light/dark theme with localStorage persistence
- **LikedMoviesContext**: Manages liked movies with sessionStorage persistence
- **Local Component State**: For UI-specific state management
- **React Query**: For server state management (caching API responses)
- **Custom Hooks**: Encapsulate complex state logic for reuse across components
  - `useTheme`: Manages theme state
  - `useSearch`: Manages search form state with debouncing
  - `useMovieSearch`: Handles search API requests and pagination

## Error Handling

The application includes a robust error handling system:

- **ErrorBoundary Component**: Class-based component that catches JavaScript errors in its child component tree
- **GlobalErrorHandler Component**: Wraps the app with an ErrorBoundary and provides a user-friendly fallback UI
- **API Error Handling**: 
  - Typed error responses with the `ErrorResponse` interface
  - Centralized error processing in the API service
  - Graceful degradation with meaningful error messages
- **Component-Level Error Handling**: 
  - Try/catch blocks for async operations
  - Conditional rendering for error states
  - Error message components for user feedback

## Getting Started

### Prerequisites

- Node.js 14.x or higher
- npm 6.x or higher

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/whichmovie.git
cd whichmovie
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Build for production
```bash
npm run build
```

## API

This project integrates with two external APIs:

### OMDB API

The [OMDB API](http://www.omdbapi.com/) provides the movie, TV show, and game data. The application uses this API for:
- Searching for media by title
- Filtering by type (movie, series, game) and year
- Retrieving detailed information about specific titles

An API key is required to use this service, which should be configured in the `api.ts` file.

### Anthropic Claude API

The application uses the [Anthropic Claude API](https://www.anthropic.com/) for AI-powered media recommendations:
- Natural language processing of user descriptions
- Generation of relevant media recommendations
- Integration via the `@anthropic-ai/sdk` package

An API key is required for Claude and should be configured in the `SearchAI.tsx` service.

## Technologies Used

- **Frontend Framework**: [React](https://reactjs.org/) with [TypeScript](https://www.typescriptlang.org/) - From the spec requirments
- **Data Fetching**: [React Query](https://tanstack.com/query/latest) for efficient API requests and caching - Very efficient and better than using fetch directly with useEffect
- **AI Integration**: [Anthropic Claude SDK](https://github.com/anthropics/anthropic-sdk-typescript) for AI recommendations - The AI is very good at what it does, but it is not perfect and sometimes the recommendations are not what the user is looking for.
- **Styling**: Pure CSS with CSS Variables for theming
- **Type Safety**: Comprehensive TypeScript type system
- **State Management**: React Context API with custom hooks
- **Error Handling**: React Error Boundaries with custom fallback UIs
- **Performance Optimization**:
  - Debounced search input
  - Virtualized lists for large result sets
  - Memoized components using React.memo
  - Optimized re-renders with useMemo and useCallback

## Best Practices

This project follows React and TypeScript best practices:

### Code Organization
- **Component Composition**: Breaking down complex components into smaller, reusable pieces
- **Custom Hooks**: Extracting reusable logic into hooks like `useDebounce` and `useMovieSearch`
- **Type Segregation**: Separating types by domain and functionality

### Performance Optimization
- **Debounced Inputs**: Reducing API calls with debounced search inputs
```typescript
// useDebounce hook implementation
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  
  return debouncedValue;
}
```

### Error Handling
- **Error Boundaries**: Preventing entire app crashes with React Error Boundaries
- **Typed Error Handling**: Using TypeScript to ensure comprehensive error handling

### Responsive Design
- **Mobile-First Approach**: Designing for mobile and scaling up to larger screens
- **CSS Variables**: Using CSS custom properties for consistent styling
```css
:root {
  --primary-color: #3498db;
  --secondary-color: #2ecc71;
  --text-color: #333;
  --background-color: #f8f9fa;
  /* Additional theme variables */
}

[data-theme='dark'] {
  --primary-color: #2980b9;
  --secondary-color: #27ae60;
  --text-color: #f8f9fa;
  --background-color: #222;
}
```

### State Management
- **Context API**: Efficiently sharing state across components
- **Local Storage**: Persisting user preferences across sessions

## Potential Improvements
- Touch up on the visual design of the app to make it more attractive and modern
- Allow a user to browse for movies, series and games by genre, actor, director, etc.
- Use Remix for routing and server-side rendering