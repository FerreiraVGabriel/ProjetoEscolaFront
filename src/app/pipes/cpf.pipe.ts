import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'cpf',
    standalone: true
 })
export class CpfPipe implements PipeTransform {
  transform(value: string | number): string {
    const cpf = value?.toString().padStart(11, '0');
    return cpf?.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  }
}
