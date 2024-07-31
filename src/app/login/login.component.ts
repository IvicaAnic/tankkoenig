import {Component, effect, inject, Injector, OnInit, signal} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {AuthService} from "../services/auth.service";
import {MessagesService} from "../messages/messages.service";
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";
import {CoursesService} from "../services/courses.service";
import { TankRoot, Tank,TankStation, stations1, } from '../models/course.model';
import { HttpClient, HttpContext } from "@angular/common/http";
import { catchError, firstValueFrom, from, map, Observable } from 'rxjs';
import {CommonModule, NgForOf} from '@angular/common';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { Root1 } from '../models/user.model';
@Component({
  selector: 'login',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent  implements OnInit{
  #courses = signal<TankRoot[]>([]) ;
  fb = inject(FormBuilder);
  coursesService = inject(CoursesService);
  messageService = inject(MessagesService);
  http = inject(HttpClient);
  response: any;
  response1: any;
  station:any;
  ngOnInit() {
   // this.onToSignalExample();
    this.loadCourses();
  }

  courses:any;
  myRoot: any = [];
  myRoot1: any = [];
 
 
 
  form = this.fb.group({
    email: [''],
    password: ['']
  });

  messagesService = inject(MessagesService);

  authService = inject(AuthService);

  router = inject(Router);
  async loadCourses() {
    try {
    
      this.response1= await this.coursesService.getTankerKoenigPrice() as TankRoot;
this.myRoot=this.response1.stations;
this.myRoot1=[];
      for(let i =0;i < this.myRoot.length;i++)
      {
        console.log("QQQQQQQQQQQQQ " +  this.myRoot[i].id)
        console.log("QQQQQQQQQQQQQ " +  this.myRoot[i].name)
        let tt="https://creativecommons.tankerkoenig.de/json/detail.php?id=" + this.myRoot[i].id + "&apikey=98d9fddc-64dd-7ac9-0889-17bac58698d3"
        this.response= await this.getTankerKoenigPriceWithUrl(tt) ;
       this.station=this.response.station;
       this.myRoot1.push(this.station);
       //const JSobj = JSON.stringify(this.station);
    //console.log("QQQQQQQQQQQQQAAAAAAAA " + tt)
      //   console.log("QQQQQQQQQQQQQAAAAAAAA  AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" + JSobj)

      }
   
     //console.log("QQQQQQQQQQQQQ " +  z.data)
    
    const JSobj = JSON.stringify(this.response1);
    console.log("QQQQQQQQQQQQQ " +  JSobj)
const parsedobject: TankRoot =
JSON.parse(JSobj);
    console.log( "WWWWWWWWWWWWWWW " + JSobj )




    }
    catch(err) {
      this.messageService.showMessage(
        `Error loading courses!`,
        "error"
      );
      console.error(err);
    }
  }

  async getTankerKoenigPriceWithUrl(url:string):Promise<Root1> {
    const courses$ =
      this.http.get<Root1>(url);
    this.response = await firstValueFrom(courses$);   
    const JSobj = JSON.stringify(this.response);
console.log("GGGGGGGGGGGGGGGGGGGGGGGGGGGGGG " + JSobj)
    return this.response;
  }

  async onLogin() {
    try {
      const {email, password} = this.form.value;
      if (!email || !password) {
        this.messagesService.showMessage(
          "Enter an email and password.",
          "error"
        )
        return;
      }
      await this.authService.login(email, password);
      await this.router.navigate(['/home']);
    }
    catch(err) {
      console.error(err);
      this.messagesService.showMessage(
        "Login failed, please try again",
        "error"
      )
    }
  }



  injector = inject(Injector);

  onToSignalExample() {
    try {
      const courses$:Observable<TankRoot> = from(this.coursesService.getTankerKoenigPrice())
        .pipe(
          catchError(err => {
            console.log(`Error caught in catchError`, err)
            throw err;
          })
        );
    this.myRoot=courses$.pipe(map((root:TankRoot)=>root.stations as TankStation[]));
console.log( "TTTTTTTTTTT " + courses$);
    for(let i = 0;i <this.myRoot.length-1;i++)
    {
      console.log("GGGGGGGGGGGGGGGGGGGGGGG " + this.myRoot.id);
    }
      console.log("BBBBBBBBB " + courses$);

       this.courses  = toSignal(courses$, {
        injector: this.injector,
        rejectErrors: true
      })
      effect(() => {
        console.log(`Courses: `, this.courses())
      }, {
        injector: this.injector
      })
      

      this.courses()
/*
      setInterval(() => {
        console.log(`Reading courses signal: `, courses())
      }, 1000)*/

    }
    catch (err) {
      console.log(`Error in catch block: `, err)
    }

  }
}
