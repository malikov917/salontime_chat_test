import {Component, OnInit} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import {Observable} from 'rxjs/Observable';

export interface Post {
  content: string;
  person: string;
  email: string;
  timeStamp: any;
}

export interface Email {
  email: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  emailsCol: AngularFirestoreCollection<Email>;
  emails: Observable<Email[]>;
  emailList: Email[];

  constructor(private afs: AngularFirestore) {
    this.emailsCol = this.afs.collection('emails');
    this.emails = this.emailsCol.valueChanges();
    this.emails.subscribe(data => this.emailList = data);
  }

  ngOnInit(): void {
  }
}
