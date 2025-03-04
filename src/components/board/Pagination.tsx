interface PaginationProps {
    totalBooks: number;
    booksPerPages: number;
    currentPage: number;
    paginate: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ totalBooks, booksPerPages, currentPage, paginate }) => {
    const wholePages = Math.ceil(totalBooks / booksPerPages);

    return (
        <div>
            <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>이전</button>
            {Array.from({ length: wholePages }, (_, i) => (
                <span key={i + 1} onClick={() => paginate(i + 1)}> {i + 1} </span>
            ))}
            <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === wholePages}>다음</button>
        </div>
    )
}

export default Pagination;