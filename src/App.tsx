import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import SearchResults from './components/search/StandardSearchResults'
import SearchForm from './components/search/StandardSearchForm'
import MovieSearch from './components/search/AskAI'
import LikedMovies from './components/search/LikedMovies'
import Header from './components/layout/Header'
import Layout from './components/layout/Layout'
import { useState } from 'react'
import { LikedMoviesProvider } from './context/LikedMoviesContext'
import { ThemeProvider, useThemeContext } from './context/ThemeContext'
import GlobalErrorHandler from './components/error/GlobalErrorHandler'
import useSearch from './hooks/useSearch'

/**
 * AppContent component - contains the main application UI
 * Separated from App to allow use of the useThemeContext hook
 */
function AppContent() {
  // Initialize QueryClient for React Query
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 1,
        refetchOnWindowFocus: false,
      },
    },
  })
  
  // Track which search mode is active
  const [activeTab, setActiveTab] = useState<'standard' | 'ai' | 'liked'>('standard');
  
  // Get theme from context
  const { theme, toggleTheme } = useThemeContext();
  
  // Use custom hooks for search functionality
  const { 
    inputValue, 
    searchTerm, 
    filters,
    isDebouncing, 
    fetchAllPages, 
    handleInputChange,
    handleFilterChange, 
    handleSearch,
    setFetchAllPages
  } = useSearch({ debounceDelay: 500, minSearchLength: 3 })

  return (
    <QueryClientProvider client={queryClient}>
      <LikedMoviesProvider>
        <Layout>
          <Header title="Which media?" theme={theme} toggleTheme={toggleTheme}>
            <div className="search-tabs">
              <button 
                className={`search-tab ${activeTab === 'standard' ? 'active' : ''}`}
                onClick={() => setActiveTab('standard')}
              >
                Standard Search
              </button>
              <button 
                className={`search-tab ${activeTab === 'ai' ? 'active' : ''}`}
                onClick={() => setActiveTab('ai')}
              >
                Ask AI
              </button>
              <button 
                className={`search-tab ${activeTab === 'liked' ? 'active' : ''}`}
                onClick={() => setActiveTab('liked')}
              >
                Liked Media
              </button>
            </div>
            
            {activeTab === 'standard' && (
              <SearchForm 
                onSearch={handleSearch}
                onInputChange={handleInputChange}
                filters={filters}
                onFilterChange={handleFilterChange}
                inputValue={inputValue}
                isDebouncing={isDebouncing}
              />
            )}
          </Header>
          
          {activeTab === 'standard' && (
            <div className="search-results">
              <SearchResults 
                title={searchTerm}
                fetchAllPages={fetchAllPages}
                filters={filters}
                setFetchAllPages={setFetchAllPages}
              />
            </div>
          )}
          
          {activeTab === 'ai' && (
            <MovieSearch />
          )}
          
          {activeTab === 'liked' && (
            <div className="search-results">
              <LikedMovies />
            </div>
          )}
        </Layout>
      </LikedMoviesProvider>
    </QueryClientProvider>
  )
}

/**
 * Main App component
 * Wraps the entire application with necessary providers
 */
function App() {
  return (
    <GlobalErrorHandler>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </GlobalErrorHandler>
  )
}

export default App
