import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import {PersonService} from '../person.service';
import {Person} from '../person';

@Component({
  selector: 'app-person-detail',
  templateUrl: './person-detail.component.html',
  styleUrls: ['./person-detail.component.less']
})
export class PersonDetailComponent implements OnInit {
  @Input() person: Person;
  constructor(
    private route: ActivatedRoute,
    private personService: PersonService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getPerson();
  }

  getPerson(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.personService.getPerson(id)
      .subscribe(person => this.person = person);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.personService.updatePerson(this.person)
      .subscribe(() => this.goBack());
  }

}
