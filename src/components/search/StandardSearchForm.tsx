import { SearchFormProps } from '../../types/component.types';

/**
 * SearchForm component for handling user input and search initiation
 */
const SearchForm = ({ 
    onSearch, 
    onInputChange, 
    inputValue, 
    isDebouncing,
    filters,
    onFilterChange 
}: SearchFormProps) => {
    // Generate years for the dropdown (current year to 1900)
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: currentYear - 1899 }, (_, i) => currentYear - i);
    
    return (
        <form onSubmit={onSearch} className="search-form">
            <div className="search-input-row">
                <div className="search-input-container">
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => onInputChange(e.target.value)}
                        placeholder="Enter media title..."
                        className="search-input"
                    />
                    {isDebouncing && inputValue.length >= 3 && (
                        <span className="searching-indicator">Searching...</span>
                    )}
                </div>
                
                <div className="filter-container">
                    <select 
                        className="filter-select"
                        value={filters.type}
                        onChange={(e) => onFilterChange('type', e.target.value)}
                        aria-label="Filter by media type"
                    >
                        <option value="all">All Types</option>
                        <option value="movie">Movies</option>
                        <option value="series">Series</option>
                        <option value="episode">Episodes</option>
                        <option value="game">Games</option>
                    </select>
                    
                    <select 
                        className="filter-select"
                        value={filters.year}
                        onChange={(e) => onFilterChange('year', e.target.value)}
                        aria-label="Filter by year"
                    >
                        <option value="">Any Year</option>
                        {years.map(year => (
                            <option key={year} value={year}>{year}</option>
                        ))}
                    </select>
                </div>
            </div>
            
            {inputValue.length > 0 && inputValue.length < 3 && (
                <div className="min-chars-notice">Enter at least 3 characters to search</div>
            )}
            
            <button 
                type="submit" 
                className="search-button"
                disabled={inputValue.length < 3}
            >
                Search
            </button>
            
            {(filters.type !== 'all' || filters.year !== '') && (
                <div className="active-filters">
                    <span>Active filters:</span>
                    {filters.type !== 'all' && (
                        <span className="filter-tag">
                            Type: {filters.type}
                            <button 
                                onClick={(e) => {
                                    e.preventDefault();
                                    onFilterChange('type', 'all');
                                }}
                                className="clear-filter"
                            >
                                ×
                            </button>
                        </span>
                    )}
                    {filters.year !== '' && (
                        <span className="filter-tag">
                            Year: {filters.year}
                            <button 
                                onClick={(e) => {
                                    e.preventDefault();
                                    onFilterChange('year', '');
                                }}
                                className="clear-filter"
                            >
                                ×
                            </button>
                        </span>
                    )}
                </div>
            )}
        </form>
    );
};

export default SearchForm; 