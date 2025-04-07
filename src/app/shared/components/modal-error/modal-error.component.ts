import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-error',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  templateUrl: './modal-error.component.html',
  styleUrl: './modal-error.component.css'
})
export class ModalErrorComponent {
  constructor(
    public dialogRef: MatDialogRef<ModalErrorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { titulo: string; mensagem: string }
  ) {}

  fechar(confirmado: boolean) {
    this.dialogRef.close(confirmado);
  }
}
