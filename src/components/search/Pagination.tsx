import { PaginationProps } from '../../types/component.types';

/**
 * Pagination component for navigating through pages of results
 */
const Pagination = ({ currentPage, totalPages, totalItems, paginate }: PaginationProps) => {
    if (totalPages <= 1) {
        return null;
    }

    // Generate page numbers with ellipsis for large number of pages
    const renderPageNumbers = () => {
        const MAX_VISIBLE_PAGES = 5;
        const pageNumbers: number[] = [];
        
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(i);
        }
        
        if (totalPages <= MAX_VISIBLE_PAGES) {
            return pageNumbers.map(number => (
                <button 
                    key={number}
                    onClick={() => paginate(number)}
                    className={`page-number ${currentPage === number ? 'active' : ''}`}
                >
                    {number}
                </button>
            ));
        }
        
        let pagesToShow: (number)[] = [];
        
        // Always show first page
        pagesToShow.push(1);
        
        // Calculate range of pages to show around current page
        let startPage = Math.max(2, currentPage - 1);
        let endPage = Math.min(totalPages - 1, currentPage + 1);
        
        // Add ellipsis before if needed
        if (startPage > 2) {
            pagesToShow.push(-1); // Use -1 to represent ellipsis
        }
        
        // Add middle pages
        for (let i = startPage; i <= endPage; i++) {
            pagesToShow.push(i);
        }
        
        // Add ellipsis after if needed
        if (endPage < totalPages - 1) {
            pagesToShow.push(-2); // Use -2 to represent second ellipsis
        }
        
        // Always show last page
        if (totalPages > 1) {
            pagesToShow.push(totalPages);
        }
        
        return pagesToShow.map(number => {
            if (number === -1 || number === -2) {
                return <span key={number} className="page-ellipsis">...</span>;
            }
            
            return (
                <button 
                    key={number}
                    onClick={() => paginate(number)}
                    className={`page-number ${currentPage === number ? 'active' : ''}`}
                >
                    {number}
                </button>
            );
        });
    };

    return (
        <div className="pagination-container">
            <div className="pagination-controls">
                <button 
                    className="page-navigation"
                    onClick={() => paginate(Math.max(currentPage - 1, 1))}
                    disabled={currentPage === 1}
                >
                    &laquo; Prev
                </button>
                
                <div className="page-numbers">
                    {renderPageNumbers()}
                </div>
                
                <button 
                    className="page-navigation"
                    onClick={() => paginate(Math.min(currentPage + 1, totalPages))}
                    disabled={currentPage === totalPages}
                >
                    Next &raquo;
                </button>
            </div>
            
            <div className="results-count">
                Page {currentPage} of {totalPages} ({totalItems} results)
            </div>
        </div>
    );
};

export default Pagination; 