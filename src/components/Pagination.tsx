import React from 'react';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  currentPage,
  onPageChange,
}) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div style={{ marginTop: '20px', textAlign: 'center' }}>
      {pages.map(page => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          disabled={page === currentPage}
          style={{
            margin: '5px',
            padding: '10px',
            backgroundColor: page === currentPage ? 'grey' : 'white',
            cursor: page === currentPage ? 'not-allowed' : 'pointer',
          }}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
