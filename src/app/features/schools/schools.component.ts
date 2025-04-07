import { Component } from '@angular/core';
import { SchoolOutputDTO } from '../../dtos/outputs/school-output.dto';
import { SearchParams } from '../../model/search-params.model';
import { CommonModule } from '@angular/common';
import { PaginatorComponent } from '../../shared/components/paginator/paginator.component';
import { ItensPerPageComponent } from '../../shared/components/itens-per-page/itens-per-page.component';
import { MatDialog } from '@angular/material/dialog';
import { SchoolsAddEditComponent } from './schools-add-edit/schools-add-edit.component';
import { SchoolService } from '../../services/school.service';
import { FilteredDataParams } from '../../model/filtered-data-params.model';
import { ModalErrorComponent } from '../../shared/components/modal-error/modal-error.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { CpfPipe } from '../../pipes/cpf.pipe';
import { TelephonePipe } from '../../pipes/telephone.pipe';

@Component({
  selector: 'app-schools',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, PaginatorComponent, ItensPerPageComponent, MatIconModule, MatExpansionModule, CpfPipe, TelephonePipe],
  templateUrl: './schools.component.html',
  styleUrl: './schools.component.css'
})
export class SchoolsComponent {
  schools: SchoolOutputDTO[]=[]; 
  searchParams: SearchParams = new SearchParams(1, 5, 0, "");
  searchControl = new FormControl('');
  
  constructor(private schoolService: SchoolService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadSchools();
    this.subscribeToRefreshRequired();
    this.search();
  }

  search(): void {
    this.searchControl.valueChanges.pipe(
      debounceTime(2000)
    ).subscribe(value => {
      this.searchParams.SearchTerm = value ?? '';
      this.searchParams.CurrentPageNumber = 1; 
      this.loadSchools();
    });
  }

  loadSchools(): void {
    this.schoolService.GetPagintion(this.searchParams).subscribe((response: FilteredDataParams<SchoolOutputDTO> ) => {
      this.schools = response.Items;
      this.searchParams.TotalItensCount = response.TotalCount;
    });
  }

  subscribeToRefreshRequired(): void {
    this.schoolService.refreshrequired.subscribe(() => {
      this.loadSchools();
    })
  }

  onPageChange(newPage: number){
    this.searchParams.CurrentPageNumber = newPage;
    this.loadSchools();
  }

  onItemsPerPageChange(selectedValue: number) {
    this.searchParams.ItensPerPageNumber = selectedValue;
    this.searchParams.CurrentPageNumber = 1;
    this.loadSchools();
  }

  openModalSchool(schoolInputDTO?: any) {
    if(schoolInputDTO){
      this.dialog.open(SchoolsAddEditComponent, {
        width: '1200px',
        data:{ schoolInputDTO }
      });
    }
    else{
      this.dialog.open(SchoolsAddEditComponent, {
        width: '1200px',
        data: {}  
      });
    }
  
  }

  deleteSchool(schoolInputDTO?: any) {
    const dialogRef = this.dialog.open(ModalErrorComponent, {
      width: '400px',
      data: {
        titulo: 'Confirmar exclusão',
        mensagem: `Deseja realmente excluir a escola "${schoolInputDTO.SDescricao}"?`
      }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.schoolService.Delete(schoolInputDTO.ICodEscola).subscribe({
          next: () =>{
            
          }
        })
      } 
    });
  }
  

}
