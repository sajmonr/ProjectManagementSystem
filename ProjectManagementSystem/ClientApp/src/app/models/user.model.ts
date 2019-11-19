export class User{
  id: number;
  firstName: string;
  lastName: string;

  constructor(user?: User){
    this.id = -1;

    if(user) {
      this.id = user.id;
      this.firstName = user.firstName;
      this.lastName = user.lastName;
    }
  }

  getFullName(): string{
    return this.firstName + ' ' + this.lastName;
  }
}
