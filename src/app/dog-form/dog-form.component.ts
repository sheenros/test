import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Dog} from "../model/dog";
import {Race} from "../model/race";
import {NzNotificationService} from "ng-zorro-antd/notification";
import {DogService} from "../service/dog.service";
import {RaceService} from "../service/race.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-dog-form',
  templateUrl: './dog-form.component.html',
  styleUrls: ['./dog-form.component.scss']
})
export class DogFormComponent implements OnInit {
  @Input() visible = false;
  @Output() visibilityEvent = new EventEmitter<boolean>();
  @Output() submitEvent = new EventEmitter<boolean>();
  colorList= ["white", "black", "brown", "red", "gold", "bicolor", "grey", "tricolor", "merle"]
  validateForm!: FormGroup;
  dog?: Dog;
  raceList: Race[] = [];
  dogList:Dog[]=[];
  fullDogList:Dog[]=[];

  formName: string = 'Add new dog';
  confirmBtnText: string = 'Save';
  allowEdit: boolean = true
  showId: boolean = false;
  isConfirmModalLoading = false;

  constructor(private fb: FormBuilder,
              private dogService: DogService,
              private raceService: RaceService,
              private notification: NzNotificationService) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      id: { value: 0, disabled: true },
      name: [null, [Validators.required]],
      age: [null, [Validators.required]],
      color: [null, [Validators.required]],
      raceId: { value: -1, disabled: true },
      race: [null, [Validators.required]],

    });
    this.raceService.getAllRace()
      .subscribe(race => this.raceList = race);


  }
  showModal(): void {
    this.visible = true;
  }

  handleCancel(): void {
    this.updateVisibility(false);
    this.resetForm();

    setTimeout(() => {

      this.showId = false;
      this.allowEdit = true;
      this.isConfirmModalLoading = false;
    }, 100);
  }
  handleSubmit(): void {
    if (!this.validateForm.valid) {
      this.validateForm.get('name')?.markAsDirty()
      this.validateForm.get('age')?.markAsDirty();
      this.validateForm.get('color')?.markAsDirty();
      this.validateForm.get('race')?.markAsDirty();
      this.validateForm.updateValueAndValidity();
      return;
    }
    this.isConfirmModalLoading = true;
    this.addDog();
  }
  updateVisibility(value: boolean, submited: boolean = false): void {
    this.visible = value;
    if (submited) {
      this.submitEvent.emit(true);
    } else {
      this.visibilityEvent.emit(value);
    }
  }
  addDog(): void {
    var dog: { [k: string]: any } = {
      name: this.validateForm.value.name,
      age: this.validateForm.value.age,
      color: this.validateForm.value.color,
      race: { id: this.validateForm.getRawValue().race?.id }
    };

    var response: Observable<any>;


    if (this.confirmBtnText === 'Save') {
      console.log(dog)
      response = this.dogService.addDog(dog);
    } else {
      console.log(dog)
      dog['id'] = this.validateForm.getRawValue().id;
      response = this.dogService.updateDog(dog);
    }

    response.subscribe(race => {
      this.notify('', `Dog have been ${this.confirmBtnText === "Save" ? "saved" : "updated"}`);
      this.updateVisibility(false, true);
      this.resetForm();
    });
  }

  public updateDog(dog: Dog): void {
    this.setUpForm(dog, true);
    this.confirmBtnText = "Update"
    this.formName = "Update dog";
  }

  public viewDog(dog: Dog): void {
    this.setUpForm(dog, false);
    this.formName = "View dog";
  }

  private resetForm(): void {
    this.validateForm.reset();

    this.validateForm.get('name')?.enable();
    this.validateForm.get('age')?.enable();
    this.validateForm.get('color')?.enable();
    this.validateForm.get('race')?.enable();


    this.formName = 'Add new dog';
    this.confirmBtnText = 'Save';
  }
  raceChanged(): void {
    this.validateForm.get('raceId')?.setValue(this.validateForm.getRawValue().race?.id);
    console.log(this.validateForm.getRawValue());
  }

  private setUpForm(dog: Dog, enabled: boolean): void {
    var race = this.raceList.find(race => race.id === dog.race.id);




    if (!enabled) {
      this.validateForm.get('name')?.disable();
      this.validateForm.get('age')?.disable();
      this.validateForm.get('color')?.disable();
      this.validateForm.get('race')?.disable();

    }

    this.validateForm.get('id')?.setValue(dog.id);
    this.validateForm.get('name')?.setValue(dog.name);
    this.validateForm.get('age')?.setValue(dog.age);
    this.validateForm.get('color')?.setValue(dog.color);
    this.validateForm.get('raceId')?.setValue(race?.id);
    this.validateForm.get('race')?.setValue(race);




    this.showId = true;
    this.visible = true;
    this.allowEdit = enabled;
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

