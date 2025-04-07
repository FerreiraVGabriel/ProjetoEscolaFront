import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'telephone',
    standalone: true
 })
export class TelephonePipe implements PipeTransform {
  transform(value: string | number): string {
    const tel = value?.toString().padStart(11, '0');
    return tel?.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  }
}
