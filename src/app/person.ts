export class Person {
  id: number;
  firstname: string;
  lastname: string;
  gender: string;
  birthday: string;
  father?: Person;
  mother?: Person;
  children?: Person[];

}
