import {Component, OnInit} from '@angular/core';
import {Person} from '../person';
import {PersonService} from '../person.service';


@Component({
  selector: 'app-persons',
  templateUrl: './persons.component.html',
  styleUrls: ['./persons.component.less']
})
export class PersonsComponent implements OnInit {

  selectedPerson: Person;
  listPersons: Person[];

  constructor(private personService: PersonService) { }

  ngOnInit() {
    this.getPersons();
  }

  onSelect(person: Person): void {
    this.selectedPerson = person;
  }

  getPersons(): void {
    this.personService.getPersons().subscribe(persons => this.listPersons = persons);
  }

  add(firstname: string, lastname: string, gender: string, birthday: string): void {
    firstname = firstname.trim();
    lastname = lastname.trim();
    gender = gender.trim();
    birthday = birthday.trim();

    if (!firstname || !lastname || !gender || !birthday) { return; }
    this.personService.addPerson({ firstname, lastname, gender, birthday } as Person)
      .subscribe(person => {
        this.listPersons.push(person);
      });
  }

  delete(person: Person): void {
    this.listPersons = this.listPersons.filter(p => p !== person);
    this.personService.deletePerson(person).subscribe();
  }
}
