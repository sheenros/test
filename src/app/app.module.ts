import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";

import {ReactiveFormsModule, FormsModule} from "@angular/forms";
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IconsProviderModule } from './icons-provider.module';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTableModule } from 'ng-zorro-antd/table';
import {NzDividerModule} from "ng-zorro-antd/divider";
import {NzSpaceModule} from "ng-zorro-antd/space";
import {NzInputModule} from "ng-zorro-antd/input";
import {NzSelectModule} from "ng-zorro-antd/select";
import {DogComponent} from "./dog/dog.component";
import {DogFormComponent} from "./dog-form/dog-form.component";
import {RaceComponent} from "./race/race.component";
import {RaceFormComponent} from "./race-form/race-form.component";
import {NzModalModule} from "ng-zorro-antd/modal";
import {NzFormModule} from "ng-zorro-antd/form";


import { NzDropDownModule } from 'ng-zorro-antd/dropdown';

import { NzGridModule } from 'ng-zorro-antd/grid';

import { NzNotificationModule } from 'ng-zorro-antd/notification';


import { NZ_ICONS } from 'ng-zorro-antd/icon';
import * as AllIcons from '@ant-design/icons-angular/icons';
import { IconDefinition } from '@ant-design/icons-angular';


registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    DogComponent,
    DogFormComponent,
    RaceComponent,
    RaceFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    IconsProviderModule,
    NzLayoutModule,
    NzMenuModule,
    NzButtonModule,
    NzTableModule,
    NzDividerModule,
    NzSpaceModule,
    NzInputModule,
    NzSelectModule,
    NzModalModule,
    NzFormModule,
    NzDropDownModule,
    NzGridModule,
    NzNotificationModule









  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent]
})
export class AppModule { }
