interface PaginationProps {
  page: number;
  lastPage: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

const Pagination = ({ page, lastPage, setPage }: PaginationProps) => {
  const scrollTop = () => {
    scrollTo({
      behavior: 'smooth',
      top: 0,
    });
  };

  const handleNextPage = () => {
    setPage(prev => prev + 1);
    scrollTop();
  };

  const handlePrevPage = () => {
    setPage(prev => prev - 1);
    scrollTop();
  };

  const pageNumbers = [];
  const range = 1;

  for (let i = 1; i <= lastPage; i++) {
    if (i === 1) {
      pageNumbers.push(i);
    } else if (i === lastPage) {
      pageNumbers.push(i);
    } else if (i >= page - range && i <= page + range) {
      pageNumbers.push(i);
    }
  }

  return (
    <div className="flex items-center justify-center gap-2 p-3">
      {page > 1 && (
        <button
          onClick={handlePrevPage}
          className="flex items-center px-2 py-2 text-sm font-semibold text-slate-100 transition-all transform rounded-md hover:text-rose-300 hover:scale-110 cursor-pointer"
        >
          {'<'}
          <span className="sr-only">Previous</span>
        </button>
      )}

      <div className="flex items-center justify-center gap-1">
        {pageNumbers.map((num, index) => (
          <button
            key={index}
            onClick={() => {
              setPage(num);
              scrollTop();
            }}
            className={`px-2 py-1 font-bold text-rose-300 rounded-md sm:px-3 sm:py-2 hover:text-rose-100 transition-all transform hover:scale-120 cursor-pointer ${
              num === page ? 'font-bold text-rose-100 bg-rose-700' : ''
            }`}
          >
            {num}
          </button>
        ))}
      </div>

      {page < lastPage && (
        <button
          onClick={handleNextPage}
          className="flex items-center px-2 py-2 text-sm font-semibold text-white transition-all transform rounded-md sm:px-3 sm:py-2 hover:text-yellow-500 hover:scale-110 cursor-pointer"
        >
          {'>'}
          <span className="sr-only">Next</span>
        </button>
      )}
    </div>
  );
};

export default Pagination;
