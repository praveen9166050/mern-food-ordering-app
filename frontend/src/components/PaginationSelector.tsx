import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "./ui/pagination";

type Props = {
  page: number,
  pages: number,
  onPageChange: (page: number) => void
}

function PaginationSelector({page, pages, onPageChange}: Props) {
  const pageNumbers = [];
  for (let i = 1; i <= pages; i++) {
    pageNumbers.push(i);
  }
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious 
            href="#" 
            onClick={() => onPageChange(page - 1)} 
            aria-disabled={page === 1} 
            className={page === 1 ? "pointer-events-none opacity-50" : undefined} 
          />
        </PaginationItem>
        {pageNumbers.map((number) => (
          <PaginationItem>
            <PaginationLink 
              href="#" 
              isActive={page === number}
              onClick={() => onPageChange(number)}
            >
              {number}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext 
            href="#" 
            onClick={() => onPageChange(page + 1)} 
            aria-disabled={page === pages} 
            className={page === pages ? "pointer-events-none opacity-50" : undefined} 
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

export default PaginationSelector;