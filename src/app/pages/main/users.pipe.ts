import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'users',
  standalone: true
})
export class UsersPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
