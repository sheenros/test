import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Race} from "../model/race";
import {RaceService} from "../service/race.service";
import {NzNotificationService} from "ng-zorro-antd/notification";

@Component({
  selector: 'app-race-form',
  templateUrl: './race-form.component.html',
  styleUrls: ['./race-form.component.scss']
})
export class RaceFormComponent implements OnInit {

  @Input() visible = false;
  @Output() visibilityEvent = new EventEmitter<boolean>();
  @Output() submitEvent = new EventEmitter<boolean>();

  validateForm!: FormGroup;
  isConfirmModalLoading = false;
  race?: Race;
  formName: string = 'Add new race';
  confirmBtnText: string = 'Save';
  allowEdit: boolean = true
  showId: boolean = false;



  constructor(private fb: FormBuilder, private raceService: RaceService,  private notification: NzNotificationService) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      id: { value: 0, disabled: true },
      race: [null, [Validators.required]],
      description: [null, [Validators.required]]
    });
  }

  showModal(): void {
    this.visible = true;
  }

  handleSubmit(): void {
    if (!this.validateForm.valid) {
      this.validateForm.get('race')?.markAsDirty()
      this.validateForm.get('race')?.updateValueAndValidity();

      this.validateForm.get('description')?.markAsDirty();
      this.validateForm.get('description')?.updateValueAndValidity();
      return;
    }

    this.isConfirmModalLoading = true;
    //TODO: send request
    console.log('next');

    this.addHouse();
  }

  handleCancel(): void {
    this.updateVisibility(false);

    setTimeout(() => {
      this.validateForm.get('name')?.enable();
      this.validateForm.get('description')?.enable();

      this.validateForm.get('name')?.setValue('');
      this.validateForm.get('description')?.setValue('');

      this.formName = 'Add new race';
      this.confirmBtnText = 'Save';

      this.showId = false;
      this.allowEdit = true;
      this.isConfirmModalLoading = false;
    }, 100);
  }

  updateVisibility(value: boolean, submited: boolean = false): void {
    this.visible = value;
    if (submited) {
      this.submitEvent.emit(true);
    } else {
      this.visibilityEvent.emit(value);
    }
  }

  addHouse(): void {
    if (this.confirmBtnText === 'Save') {

      this.raceService.addRace({
        race: this.validateForm.value.race,
        description: this.validateForm.value.description
      })
        .subscribe(race => {
          console.log('succes');
          this.notify('', 'Race have been saved');
          this.updateVisibility(false, true);
        });
    } else if (this.confirmBtnText === 'Update') {
      var race = {
        id: this.validateForm.getRawValue().id,
        race: parseInt(this.validateForm.value.race),
        description: this.validateForm.value.description
      }


      this.raceService.updateRace(race)
        .subscribe(race => {
          this.notify('', 'Race have been updated');
          this.updateVisibility(false, true);
        });
    }
  }

  public updateRace(race: Race): void {
    this.setUpForm(race, true);
    this.confirmBtnText = "Update"
    this.formName = "Update race";
  }

  public viewRace(race: Race): void {
    this.setUpForm(race, false);
    this.formName = "View race";
  }

  private setUpForm(race: Race, enabled: boolean): void {
    this.validateForm.get('id')?.setValue(race.id);
    this.validateForm.get('race')?.setValue(race.race);
    this.validateForm.get('description')?.setValue(race.description);

    this.showId = true;

    if (enabled) {
      this.validateForm.get('race')?.enable();
      this.validateForm.get('description')?.enable();
    } else {
      this.validateForm.get('race')?.disable();
      this.validateForm.get('description')?.disable();
    }
    this.allowEdit = enabled;

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
