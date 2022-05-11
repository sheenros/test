import {Component, OnInit, ViewChild} from '@angular/core';
import {Dog} from "../model/dog";
import {DogFormComponent} from "../dog-form/dog-form.component";
import {ColumnItem} from "../columnitem";
import {DogService} from "../service/dog.service";
import {NzNotificationService} from "ng-zorro-antd/notification";

@Component({
  selector: 'app-dog',
  templateUrl: './dog.component.html',
  styleUrls: ['./dog.component.scss']
})
export class DogComponent implements OnInit {
  dog:Dog[]=[];
  visible = false;
  isConfirmModalLoading = false;
  @ViewChild(DogFormComponent, { static: true }) child: DogFormComponent | undefined;

  searchValue: string="";

  listOfColumns: ColumnItem<Dog>[] = [
    {
      name: 'Id',
      sortOrder: 'descend',
      sortFn: (a: Dog, b: Dog) => Number(a.id) - Number(b.id),
      sortDirections: ['descend', null],
      listOfFilter: [],
      filterFn: null,
      filterMultiple: true
    },
    {
      name: 'Name',
      sortOrder: null,
      sortFn: (a: Dog, b: Dog) => a.name.localeCompare(b.name),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      listOfFilter: [],
      filterFn: null

    },
    {
      name: 'Age',
      sortOrder: 'descend',
      sortFn: (a: Dog, b: Dog) => a.age - b.age,
      sortDirections: ['descend', null],
      listOfFilter: [],
      filterFn: null,
      filterMultiple: true
    },
    {
      name: 'Color',
      sortOrder: null,
      sortFn: (a: Dog, b: Dog) => a.color.localeCompare(b.color),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      listOfFilter: [],
      filterFn: null


    },
    {
      name: 'Race',
      sortOrder: null,
      sortFn: (a: Dog, b: Dog) => a.color.localeCompare(b.color),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      listOfFilter: [],
      filterFn: null

    },
    {
      name: 'Description',
      sortOrder: null,
      sortFn: (a: Dog, b: Dog) => a.color.localeCompare(b.color),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      listOfFilter: [],
      filterFn: null

    },
    {
      name: 'Actions',
      sortOrder: null,
      sortFn:null,
      sortDirections: [null],
      filterMultiple: false,
      listOfFilter: [],
      filterFn: null,


    }
  ];
  constructor(private dogService: DogService,private notification: NzNotificationService) { }

  ngOnInit(): void {
    this.getAllDog();
  }
  getAllDog(): void {
    this.dogService.getAllDog()
      .subscribe(dog => this.dog = dog);
  }
  show(dog: Dog): void {
    this.child?.viewDog(dog);
  }
 deleteById(id: bigint): void {
    this.dogService.deleteDog(id)
      .subscribe(() => {
        this.notify('', `Deleted dog with id ${id}`);

        this.dog = this.dog.filter(element => element.id != id);
      })
  }


  update(dog: Dog): void {
    this.child?.updateDog(dog);
  }

  search(): void {
    console.log(this.searchValue);
    this.searchValue = '';
  }

  /**
   * Modal View
   */
  updateVisibility(visibility: boolean) {
    this.visible = visibility;
  }

  submit(submited: boolean) {
    if (submited) {
      this.getAllDog();
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
      .blank(title, content)
      .onClick.subscribe(() => {
      console.log('notification clicked!');
    });
  }

}
