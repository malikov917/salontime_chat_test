import {Component, Input, OnInit} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Email, Post} from '../app.component';

@Component({
  selector: 'app-user-chat',
  templateUrl: './user-chat.component.html',
  styleUrls: ['./user-chat.component.css']
})
export class UserChatComponent implements OnInit {
  postsCol: AngularFirestoreCollection<Post>;
  posts: Observable<Post[]>;
  content: string;
  form: FormGroup;
  @Input() emailList: Email[];

  constructor(private afs: AngularFirestore) {
    this.form = new FormGroup({
      email: new FormControl('', Validators.email)
    })
  }

  ngOnInit() {
    this.postsCol = this.afs.collection('posts');
    this.posts = this.postsCol.valueChanges();
    this.posts.subscribe(data => console.log(data));
  }

  addPost() {
    if (!this.emailList.find(email => email.email === this.form.value['email'])) {
      this.afs.collection('emails').add({
        'email': this.form.value['email']
      });
    }
    this.afs.collection('posts').add({
      'email': this.form.value['email'],
      'content': this.content,
      'person': 'customer',
      'timeStamp': Date.now()
    });
  }

}
