import {Component, OnInit, ViewChild} from '@angular/core';
import {ColumnItem} from "../columnitem";

import { NzNotificationService } from 'ng-zorro-antd/notification';
import {Race} from "../model/race";
import { RaceFormComponent } from '../race-form/race-form.component';
import {RaceService} from "../service/race.service";
@Component({
  selector: 'app-race',
  templateUrl: './race.component.html',
  styleUrls: ['./race.component.scss']
})
export class RaceComponent implements OnInit {

  races: Race[] = [];
  visible = false;
  isConfirmModalLoading = false;

  @ViewChild(RaceFormComponent, {static : true}) child : RaceFormComponent | undefined;

  columnsList: ColumnItem<Race>[] = [
    {
      name: 'Id',
      sortOrder: 'ascend',
      sortDirections: ['ascend', 'descend', null],
      sortFn: (a: Race, b: Race) => Number(a.id) - Number(b.id),
      filterMultiple: false,
      listOfFilter: [],
      filterFn: null,

    },
    {
      name: 'Race',
      sortOrder: null,
      sortDirections: ['ascend', 'descend', null],
      sortFn: (a: Race, b: Race) => a.race.localeCompare(b.race),
      filterMultiple: true,
      listOfFilter: [],
      filterFn: null
    },
    {
      name: 'Description',
      sortOrder: null,
      sortDirections: ['ascend', 'descend', null],
      sortFn: (a: Race, b: Race) => a.description.localeCompare(b.description),
      filterMultiple: true,
      listOfFilter: [],
      filterFn: null
    },
    {
      name: 'Actions',
      sortOrder: null,
      sortDirections: [null],
      sortFn: null,
      filterMultiple: true,
      listOfFilter: [],
      filterFn: null,

    }
  ];


  constructor(private raceService: RaceService, private notification: NzNotificationService) { }

  ngOnInit(): void {
    this.getAllRaces();
  }

  /**
   * CRUD
   */
  getAllRaces(): void {
    this.raceService.getAllRace()
      .subscribe(races => this.races = races);
  }

  deleteById(id: bigint): void {
    this.raceService.deleteRace(id)
      .subscribe(() => {
        this.notify('', `Deleted race with id ${id}`)
        this.races = this.races.filter(element => element.id != id);
      });
  }

  show(race: Race): void {
    this.child?.viewRace(race);
  }

  update(race: Race): void {
    this.child?.updateRace(race);
  }

  /**
   * Modal View
   */
  updateVisibility(visibility: boolean) {
    this.visible = visibility;
  }

  submit(submited: boolean) {
    if (submited) {
      this.getAllRaces();
      this.visible = false;
    }
  }

  showModal(): void {
    this.visible = true;
  }



  /**
   * Notifications
   */
  notify(title: string, content: string): void {
    this.notification
      .blank( title, content)
      .onClick.subscribe(() => {
      console.log('notification clicked!');
    });
  }

}
