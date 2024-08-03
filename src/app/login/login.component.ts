import {Component, effect, inject, Injector, OnInit, signal} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {AuthService} from "../services/auth.service";
import {MessagesService} from "../messages/messages.service";
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {CoursesService} from "../services/courses.service";
import { TankRoot, Tank,TankStation, stations1, } from '../models/course.model';
import { HttpClient, HttpContext } from "@angular/common/http";
import { catchError, firstValueFrom, from, map, Observable } from 'rxjs';
import {CommonModule, NgForOf} from '@angular/common';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import {  Root,Root1 } from '../models/user.model';
import { LocationService } from '../services/location-service.service';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { Conditional } from '@angular/compiler';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from "@angular/material/form-field";
interface Cities {
  name:string;
  plz:string;
  strasse:string;
}

@Component({
  selector: 'login',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    CommonModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent  implements OnInit{
  
  #courses = signal<TankRoot[]>([]) ;
  fb = inject(FormBuilder);
  myForm = inject(FormBuilder);
  coursesService = inject(CoursesService);
  messageService = inject(MessagesService);
  http = inject(HttpClient);
  response: any;
  response1: any;
  lnglatresponse:any;
  station:any;
  myarr: Cities[] = [];
  ar1:any;
  
 
  ngOnInit() {
    
    this.addcities();
    this.ar1=this.myarr[0];
    console.log("QQQQQQQQQ " +this.ar1);
     
    this.loadbenzinPreise();
    
  }

  courses:any;
  myRoot: any = [];
  myRoot1: any = [];
 
  myRootlatlng: any = [];
 
 
  form = this.fb.group({
    city: [''],
   
    cyties: FormControl
  });
  form1 = this.myForm.group({
   
    cyties: FormControl
  });

  messagesService = inject(MessagesService);

  authService = inject(AuthService);
  locationService = inject(LocationService);

  router = inject(Router);
  async loadbenzinPreise() {
   let lat="1";
   let lng="1";
    try {
       let ttt:any;
      this.lnglatresponse =await this.coursesService.getLatLng("stuttgart") as Root;
     
      this.myRootlatlng =this.lnglatresponse.features;
      const verifyResult = JSON.stringify(this.lnglatresponse);
     
      let index =verifyResult.indexOf("coordinates");
     if(index > -1) {
     
      const t1=verifyResult.substring(index +14)
      let index2 =t1.indexOf("]");
      if(index2 > -1) {
      const t3=t1.substring(0,index2);
      let index1 =index +11;

      console.log("999999999999999999  " +  t3);
      let index3 =t3.indexOf(",");
      if(index3 > -1)
      {
        const t4=t3.substring(0,index3);
        const t5 =t3.substring(index3+1);
        lat=t4;
        lng=t5;
        console.log("lat " + t4)
        console.log("long " + t5)
      }
      }
     }
      
     console.log("999999999999999999  LLLLLLLLLLLL")

      this.response1= await this.coursesService.getTankerKoenigPrice(lat,lng) as TankRoot;
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

  selected(change: MatSelectChange) {
    console.log("1111111111111  " + change.value.name );
    this.form.controls['city'].setValue(change.value.name);
  
  }

  get City() {
   
    return this.form.controls['city'].value;
  }
 

  injector = inject(Injector);

  onToSignalExample() {
    try {
  /*    const courses$:Observable<TankRoot> = from(this.coursesService.getTankerKoenigPrice())
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
      

      this.courses()*/
/*
      setInterval(() => {
        console.log(`Reading courses signal: `, courses())
      }, 1000)*/

    }
    catch (err) {
      console.log(`Error in catch block: `, err)
    }

  }

  addcities(){

    this.myarr.push(
      {
        name: "Waiblingen",
        plz: "71332",
        strasse: "Lange Straße 30"
        },
        {
          name: "Winnenden",
          plz: "71364",
          strasse: "Max-Eyth-Strasse 7"
          },
          {
            name: "Weinstadt",
            plz: "71384",
            strasse: "Lützestrasse 97"
            },
            {
              name: "Stuttgart",
              plz: "71378",
              strasse: "Mühlhäuserstrasse 271"
              },
              {
                name: "Kornwestheim",
                plz: "70806",
                strasse: "Alexanderstrasse 18"
                }


    );
  }
/*
   mycities: Cities[] = [
    {
    name: "Waiblingen",
    plz: "71332",
    strasse: "Lange Straße 30"
    },
    {
      name: "Winnenden",
      plz: "71364",
      strasse: "Max-Eyth-Strasse 7"
      },
      {
        name: "Weinstadt",
        plz: "71384",
        strasse: "Lützestrasse 97"
        },
        {
          name: "Stuttgart",
          plz: "71378",
          strasse: "Mühlhäuserstrasse 271"
          },
          {
            name: "Kornwestheim",
            plz: "70806",
            strasse: "Alexanderstrasse 18"
            }
];*/
}
