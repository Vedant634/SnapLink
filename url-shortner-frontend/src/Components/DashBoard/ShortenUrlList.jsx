import React, { useState } from 'react';
import ShortenItem from './ShortenItem';

const ShortenUrlList = ({ data }) => {
  const [page, setPage] = useState(1);
  const itemsPerPage = 5; // change as per your design

  const totalPages = Math.ceil(data.length / itemsPerPage);

  // Slice data for current page
  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const currentItems = data.slice(start, end);

  return (
    <div className="flex flex-col gap-4">
      {/* Render only paginated data */}
      {currentItems.map((item) => (
        <ShortenItem key={item.id} {...item} />
      ))}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-3 mt-4">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
            className={`px-3 py-1 rounded-lg border ${
              page === 1
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-white hover:bg-gray-100'
            }`}
          >
            Prev
          </button>

          <span className="font-medium text-gray-700">
            Page {page} of {totalPages}
          </span>

          <button
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            disabled={page === totalPages}
            className={`px-3 py-1 rounded-lg border ${
              page === totalPages
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-white hover:bg-gray-100'
            }`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default ShortenUrlList;
