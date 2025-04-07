import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { SchoolService } from '../../../services/school.service';
import { StudentService } from '../../../services/student.service';
import { StudentInputDTO } from '../../../dtos/inputs/student-input.dto';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { SchoolOutputDTO } from '../../../dtos/outputs/school-output.dto';
import { BehaviorSubject, map, startWith } from 'rxjs';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-students-add-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgxMaskDirective, NgxMatSelectSearchModule, MatSelectModule],
  providers: [provideNgxMask()],
  templateUrl: './students-add-edit.component.html',
  styleUrl: './students-add-edit.component.css'
})
export class StudentsAddEditComponent {
  submitted = false;
  idStudent: number =0;
  title: string = '';

    //Escola
    schoolOutputDTO: SchoolOutputDTO[] = [];
    public schoolFilterCtrl: FormControl = new FormControl();
    filteredSchools: BehaviorSubject<SchoolOutputDTO[]> = new BehaviorSubject<SchoolOutputDTO[]>([]);
  
  
  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private schoolService: SchoolService,
    private studentService: StudentService,
    @Inject(MAT_DIALOG_DATA) public data: { studentInputDTO: StudentInputDTO }
  ) {}
    
  
  protected myForm = this.fb.group({
    ICodAluno: [0],
    name: ['', Validators.required],
    date: ['', Validators.required],
    cpf: ['', Validators.required],
    address: ['', Validators.required],
    phone: ['', Validators.required],
    school: [0, Validators.required],
  });
  
  ngOnInit(): void {
    this.loadSchool();
    this.idStudent = this.data?.studentInputDTO?.ICodAluno || 0;
    this.title = this.idStudent > 0 ? 'Editar Aluno' : 'Adicionar Novo Aluno';

    if (this.idStudent > 0) {
      this.myForm.patchValue({
        ICodAluno: this.data.studentInputDTO.ICodAluno,
        name: this.data.studentInputDTO.SNome,
        date: this.data.studentInputDTO.DNascimento,
        cpf: this.data.studentInputDTO.SCPF,
        address: this.data.studentInputDTO.SEndereco,
        phone: this.data.studentInputDTO.SCelular,
        school: this.data.studentInputDTO.ICodEscola,
      });
    }
  }
    
  //Escola

  initializeSchoolFilter(): void {
    this.schoolFilterCtrl.valueChanges
      .pipe(
        startWith(''),
        map(value => this.filterSchool(value))
      )
      .subscribe(filteredCountry => this.filteredSchools.next(filteredCountry));
  }

  loadSchool(): void {
    this.schoolService.GetAll().subscribe((response: SchoolOutputDTO[]) => {
      this.schoolOutputDTO = response;
      this.filteredSchools.next(this.schoolOutputDTO);
    });
  }

  filterSchool(value: string): SchoolOutputDTO[] {
    const filterValue = value.toLowerCase();
    return this.schoolOutputDTO.filter(school =>
      this.removeAccents(school.SDescricao.toLowerCase()).includes(filterValue)
    );
  }
  
  
  closeModal(){
    this.dialog.closeAll();
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.myForm?.valid) {
      const studentInputDTO = this.createStudentInputDTO();
      if(studentInputDTO.ICodAluno > 0){
        this.studentService.Update(studentInputDTO).subscribe({
          next: () =>{
            this.closeModal();
          }
        })
      }
      else{
        this.studentService.Add(studentInputDTO).subscribe({
          next: () =>{
            this.closeModal();
          }
        })
      }
    }
  }

  createStudentInputDTO(): StudentInputDTO {
    const studentInputDTO: StudentInputDTO = {
      ICodAluno: this.myForm.value.ICodAluno || 0,
      SNome: this.myForm.value.name || '',
      DNascimento: this.myForm.value.date || '',
      SCPF: this.myForm.value.cpf || '',
      SEndereco: this.myForm.value.address || '',
      SCelular: this.myForm.value.phone || '',
      ICodEscola: this.myForm.value.school || 0,
    };

    return studentInputDTO;
  }


  private removeAccents(value: string): string {
    return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }
}
