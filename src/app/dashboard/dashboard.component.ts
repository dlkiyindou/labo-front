import { Component, OnInit } from '@angular/core';
import {Person} from '../person';
import {PersonService} from '../person.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less']
})
export class DashboardComponent implements OnInit {

  listPersons: Person[];

  constructor(private personService: PersonService) {}

  ngOnInit() {
    this.getPersons();
  }


  getPersons(): void {
    this.personService.getPersons().subscribe(persons => this.listPersons = persons.slice(0, 5));
  }
}
