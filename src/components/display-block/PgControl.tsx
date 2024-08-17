interface PgControlProps {
    currentPage: number;
    totalPages: number;
    onNextPage: () => void;
    onPrevPage: () => void;
}

export default function PgControl({ currentPage, totalPages, onNextPage, onPrevPage }: PgControlProps) {
    return (
        <div className="flex justify-center mt-4 space-x-2">
            <button
                onClick={onPrevPage}
                disabled={currentPage === 1}
                className={`px-3 py-1 border ${currentPage === 1 ? 'bg-gray-300' : 'bg-white'}`}
            >
                Previous
            </button>
            <span className="px-3 py-1 border bg-white">
                Page {currentPage} of {totalPages}
            </span>
            <button
                onClick={onNextPage}
                disabled={currentPage === totalPages}
                className={`px-3 py-1 border ${currentPage === totalPages ? 'bg-gray-300' : 'bg-white'}`}
            >
                Next
            </button>
        </div>
    );
}
