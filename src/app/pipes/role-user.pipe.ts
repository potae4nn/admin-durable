import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'roleUser'
})
export class RoleUserPipe implements PipeTransform {

  transform(role: string): any {
    let roleText;
    switch (role) {
      case "1":
        roleText = "admin"
        break;
      case "0":
        roleText = "user"
        break;
      default:
        break;
    }
    return roleText;
  }

}
