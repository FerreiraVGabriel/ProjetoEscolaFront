import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';

@Component({
  selector: 'app-paginator',
  standalone: true,
  imports: [],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.css'
})
export class PaginatorComponent implements OnChanges {
  @Input() totalItems: number = 0; 
  @Input() currentPage: number = 1; 
  @Input() itemsPerPage: number = 5; 
  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();

  pages: number[] = []; 

  constructor() { }
  ngOnChanges(): void {
    this.updatePaginator();
  }

  updatePaginator(){
    this.pages = [];
    if (this.totalItems > this.itemsPerPage) {
      const totalPages = Math.ceil(this.totalItems / this.itemsPerPage);

      for (let i = 1; i <= totalPages; i++) {
        this.pages.push(i);
      }
    }
  }


  changePage(newPage: number) {
    if (newPage >= 1 && newPage <= this.pages.length) {
       this.currentPage = newPage;
      this.pageChange.emit(newPage); 
    }
  }



}
