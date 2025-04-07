export class SearchParams {
    CurrentPageNumber: number;
    ItensPerPageNumber: number;
    TotalItensCount: number;
    SearchTerm: string;
  
    constructor(currentPageNumber: number, itensPerPageNumber: number, totalItensCount: number, SearchTerm: string) {
      this.CurrentPageNumber = currentPageNumber;
      this.ItensPerPageNumber = itensPerPageNumber;
      this.TotalItensCount = totalItensCount;
      this.SearchTerm = SearchTerm;
    }
  }