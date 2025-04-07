import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PaginatorComponent } from '../../shared/components/paginator/paginator.component';
import { ItensPerPageComponent } from '../../shared/components/itens-per-page/itens-per-page.component';
import { StudentOutputDTO } from '../../dtos/outputs/student-output.dto';
import { SearchParams } from '../../model/search-params.model';
import { StudentService } from '../../services/student.service';
import { MatDialog } from '@angular/material/dialog';
import { FilteredDataParams } from '../../model/filtered-data-params.model';
import { StudentsAddEditComponent } from './students-add-edit/students-add-edit.component';
import { ModalErrorComponent } from '../../shared/components/modal-error/modal-error.component';
import { CpfPipe } from '../../pipes/cpf.pipe';
import { TelephonePipe } from '../../pipes/telephone.pipe';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, PaginatorComponent, ItensPerPageComponent, CpfPipe, TelephonePipe],
  templateUrl: './students.component.html',
  styleUrl: './students.component.css'
})
export class StudentsComponent {
    students: StudentOutputDTO[]=[]; 
    searchParams: SearchParams = new SearchParams(1, 5, 0, "");
    searchControl = new FormControl('');
    
    constructor(private studentService: StudentService, private dialog: MatDialog) {}
  
    ngOnInit(): void {
      this.loadStudents();
      this.subscribeToRefreshRequired();
      this.search();
    }

    search(): void {
      this.searchControl.valueChanges.pipe(
        debounceTime(2000)
      ).subscribe(value => {
        this.searchParams.SearchTerm = value ?? '';
        this.searchParams.CurrentPageNumber = 1; 
        this.loadStudents();
      });
    }
  
    loadStudents(): void {
      this.studentService.GetPagintion(this.searchParams).subscribe((response: FilteredDataParams<StudentOutputDTO> ) => {
        this.students = response.Items;
        this.searchParams.TotalItensCount = response.TotalCount;
      });
    }
  
    subscribeToRefreshRequired(): void {
      this.studentService.refreshrequired.subscribe(() => {
        this.loadStudents();
      })
    }
  
    onPageChange(newPage: number){
      this.searchParams.CurrentPageNumber = newPage;
      this.loadStudents();
    }
  
    onItemsPerPageChange(selectedValue: number) {
      this.searchParams.ItensPerPageNumber = selectedValue;
      this.searchParams.CurrentPageNumber = 1;
      this.searchParams.SearchTerm
      this.loadStudents();
    }
  
    openModalStudent(studentInputDTO?: any) {
      if(studentInputDTO){
        this.dialog.open(StudentsAddEditComponent, {
          width: '1200px',
          data:{ studentInputDTO }
        });
      }
      else{
        this.dialog.open(StudentsAddEditComponent, {
          width: '1200px',
          data: {}  
        });
      }
    
    }
  
    deleteStudent(studentInputDTO?: any) {
      const dialogRef = this.dialog.open(ModalErrorComponent, {
        width: '400px',
        data: {
          titulo: 'Confirmar exclusão',
          mensagem: `Deseja realmente excluir o aluno "${studentInputDTO.SNome}"?`
        }
      });
    
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.studentService.Delete(studentInputDTO.ICodAluno).subscribe({
            next: () =>{
              
            }
          })
        } 
      });
    }
}
