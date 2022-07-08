import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'password'
})
export class PasswordPipe implements PipeTransform {

  transform(value: string): string {
    return `${value.slice(0,3)} . . . 🐼`;
  }

}
