interface PaginationProps {
    totalBooks: number;
    booksPerPages: number;
    currentPage: number;
    paginate: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ totalBooks, booksPerPages, currentPage, paginate }) => {
    const wholePages = Math.ceil(totalBooks / booksPerPages);

    return (
        <div className="flex justify-center">
            <div className="isolate inline-flex -space-x-px rounded-md shadow-xs m-auto">
                <button
                    className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                    onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
                    이전
                </button>
                {Array.from({ length: wholePages }, (_, i) => (
                    <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0" key={i + 1} onClick={() => paginate(i + 1)}> {i + 1} </span>
                ))}
                <button
                    className="elative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                    onClick={() => paginate(currentPage + 1)} disabled={currentPage === wholePages}>다음</button>
            </div>
        </div>
    )
}

export default Pagination;