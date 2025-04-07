import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { SchoolService } from '../../../services/school.service';
import { SchoolInputDTO } from '../../../dtos/inputs/school-input.dto';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-schools-add-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './schools-add-edit.component.html',
  styleUrl: './schools-add-edit.component.css'
})
export class SchoolsAddEditComponent implements OnInit {
  submitted = false;
  idSchool: number =0;
  title: string = '';


  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private schoolService: SchoolService,
    @Inject(MAT_DIALOG_DATA) public data: { schoolInputDTO: SchoolInputDTO }
  ) {}
  

  protected myForm = this.fb.group({
    ICodEscola: [0],
    description: ['', Validators.required],
  });

  ngOnInit(): void {
    this.idSchool = this.data?.schoolInputDTO?.ICodEscola || 0;
    this.title = this.idSchool > 0 ? 'Editar Escola' : 'Adicionar Nova Escola';

    if (this.idSchool > 0) {
      this.myForm.patchValue({
        ICodEscola: this.data.schoolInputDTO.ICodEscola,
        description: this.data.schoolInputDTO.SDescricao
      });
    }
  }
  



  closeModal(){
    this.dialog.closeAll();
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.myForm?.valid) {
      const schoolInputDTO = this.createSchoolInputDTO();
      if(schoolInputDTO.ICodEscola > 0){
        this.schoolService.Update(schoolInputDTO).subscribe({
          next: () =>{
            this.closeModal();
          }
        })
      }
      else{
        this.schoolService.Add(schoolInputDTO).subscribe({
          next: () =>{
            this.closeModal();
          }
        })
      }
    }
  }

  createSchoolInputDTO(): SchoolInputDTO {
    const schoolInputDTO: SchoolInputDTO = {
      ICodEscola: this.myForm.value.ICodEscola || 0,
      SDescricao: this.myForm.value.description || ''
    };

    return schoolInputDTO;
  }
}
