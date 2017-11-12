import {Component, Input, OnInit} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import * as firebase from 'firebase';
import {Subject} from 'rxjs/Subject';
import {Email, Post} from '../app.component';

@Component({
  selector: 'app-admin-chat',
  templateUrl: './admin-chat.component.html',
  styleUrls: ['./admin-chat.component.css']
})
export class AdminChatComponent implements OnInit {
  adminPostsCol: AngularFirestoreCollection<Post>;
  adminPosts: Observable<Post[]>;
  emailFilter$: Subject<string | null>;
  content: string;
  contentCustomer: string;
  email: string;
  @Input() emailList: Email[];

  constructor(private afs: AngularFirestore) {
  }

  ngOnInit() {
    this.emailFilter$ = new Subject();

    this.emailFilter$.subscribe(email => {
      this.email = email;
      this.adminPostsCol = this.afs.collection('posts', ref => {
        let query: firebase.firestore.CollectionReference | firebase.firestore.Query = ref;
        query = query.where('email', '==', email).orderBy('timeStamp');
        return query;
      });
      this.adminPosts = this.adminPostsCol.valueChanges()
    })
  }

  addPostBySeller() {
    this.afs.collection('posts').add({
      'email': this.email,
      'content': this.content,
      'person': 'seller',
      'timeStamp': Date.now()
    });
    this.content = undefined;
  }

  addPostByCustomer() {
    this.afs.collection('posts').add({
      'email': this.email,
      'content': this.contentCustomer,
      'person': 'customer',
      'timeStamp': Date.now()
    });
    this.contentCustomer = undefined;
  }

}
