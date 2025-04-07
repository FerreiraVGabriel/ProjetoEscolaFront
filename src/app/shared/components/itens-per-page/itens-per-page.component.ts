import { Component, EventEmitter, Input, OnChanges, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-itens-per-page',
  standalone: true,
  imports: [],
  templateUrl: './itens-per-page.component.html',
  styleUrl: './itens-per-page.component.css'
})
export class ItensPerPageComponent implements OnChanges {
  @Input() maxItems: number=10;
  @Output() itemsPerPageChange = new EventEmitter<number>();

  @ViewChild('itensPorPaginaSelect') itensPorPaginaSelect: any; 


  itemOptions: number[] = [];

  ngOnChanges(): void {
    this.updateItensPerPageOptions();
  }

  updateItensPerPageOptions() {
    this.itemOptions = [];
  
    if (this.maxItems >= 5) {
      const max = Math.ceil(this.maxItems / 5) * 5;
      for (let i = 5; i <= max; i += 5) {
        this.itemOptions.push(i);
      }
    }else{
      this.itemOptions.push(5);
    }
  }
  
  
  
  
  
  
  
  
  onItemsPerPageChange() {
    const selectedValue = this.itensPorPaginaSelect.nativeElement.value;
    this.itemsPerPageChange.emit(parseInt(selectedValue));
  }

}
