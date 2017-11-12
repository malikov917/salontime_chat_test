import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import {AngularFireModule} from 'angularfire2';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { UserChatComponent } from './user-chat/user-chat.component';
import { AdminChatComponent } from './admin-chat/admin-chat.component';

export const firebaseConfig = {
  apiKey: 'AIzaSyAAkhvOFmJHo1bI5DRUs5rTcfFsY8HqilM',
  authDomain: 'andi-salon-test.firebaseapp.com',
  databaseURL: 'https://andi-salon-test.firebaseio.com',
  projectId: 'andi-salon-test',
  storageBucket: 'andi-salon-test.appspot.com',
  messagingSenderId: '18677587625'
};

@NgModule({
  declarations: [
    AppComponent,
    UserChatComponent,
    AdminChatComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
