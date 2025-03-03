// Components exports
export { default as Layout } from './components/layout/Layout';
export { default as Header } from './components/layout/Header';

export { default as SearchForm } from './components/search/StandardSearchForm';
export { default as SearchResults } from './components/search/StandardSearchResults';
export { default as MovieCard } from './components/search/MovieCard';
export { default as MovieGrid } from './components/search/MovieGrid';
export { default as Pagination } from './components/search/Pagination';

export { default as ThemeToggle } from './components/ui/ThemeToggle';
export { default as LoadingMessage } from './components/ui/LoadingMessage';
export { default as ErrorMessage } from './components/ui/ErrorMessage';

// Hooks exports
export { default as useTheme } from './hooks/useTheme';
export { default as useSearch } from './hooks/useSearch';
export { default as useDebounce } from './hooks/useDebounce';

// API services
export { default as api } from './services/api';
export * from './services/api';

// Types
export * from './types/api.types'; 
export * from './types/component.types';
export * from './types/context.types';