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
import {  Root,Root1, RootLL } from '../models/user.model';
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
interface LngLat {
  lng:string;
  lat:string;
  
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
  str1:any;
  str2:any;
 
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
  myRootLL: any = [];
 
 
 
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
   this.myRoot1=[];
    try {
       let ttt:any;
       const tt1=await this.getLngLat();
       const myresp:any=[];
       
       for(let k=0;k<tt1.length;k++) {
        console.log("WWWWWWWWWWWWWWWWWW " + tt1[k].lat,tt1[k].lng + "  "+ tt1.length);
      this.response1= await this.coursesService.getTankerKoenigPrice(tt1[k].lat,tt1[k].lng) as TankRoot;
      console.log("HHHHHHHHHHHHHHHHH " + this.response1.data);
      //this.myRoot1 =this.response1.stations;
     this.myRoot1.push(...this.response1.stations);
      //this.response1=null;
       }
       this.str1=JSON.stringify(this.myRoot1);
       console.log("ÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄ " + JSON.stringify(this.str1));

   
    
    
 




    }
    catch(err) {
      this.messageService.showMessage(
        `Error loading Tankenkoenig-Api!`,
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
    this.loadbenzinPreise();
  
  }

  get City() {
   
    return this.form.controls['city'].value;
  }
 

  injector = inject(Injector);

 async getLngLat():Promise<LngLat[]>
  {
     let mylnglat:LngLat={
       lng: '',
       lat: ''
     };
     let myarr: LngLat[] = [];
     if(!this.City)    
     this.lnglatresponse =await this.coursesService.getLatLng1("stuttgart-ost") as RootLL;
    else
    this.lnglatresponse =await this.coursesService.getLatLng1(this.City) as RootLL;
    this.myRootLL=this.lnglatresponse.features;
    this.str2=JSON.stringify(this.myRootLL);
   console.log("JJJJJJJJJJJJJJJJJJJJJJ " + this.str2);
let tt1:any[];
    for(let i =0;i < this.myRootLL.length;i++)
      {
          let ttr= tt1=this.myRootLL[i].geometry;
         
          tt1=ttr.coordinates;
          let mylnglat:LngLat={
            lng: '',
            lat: ''
          };;
          for(let m=0;m<tt1.length;m++)
          {
            if(m== 0)
            mylnglat.lat=tt1[m];
            if(m== 1) {
              mylnglat.lng=tt1[m];
            myarr.push(mylnglat);
            }
           

          }


      }
    /*
     this.myRootlatlng =this.lnglatresponse.features;
     const verifyResult = JSON.stringify(this.lnglatresponse);
    
     let index =verifyResult.indexOf("coordinates");
    if(index > -1) {
    
     const t1=verifyResult.substring(index +14)
     let index2 =t1.indexOf("]");
     if(index2 > -1) {
     const t3=t1.substring(0,index2);
     let index1 =index +11;
     
     let index3 =t3.indexOf(",");
     if(index3 > -1)
     {
       const t4=t3.substring(0,index3);
       const t5 =t3.substring(index3+1);
       mylnglat.lat=t4;
       mylnglat.lng=t5;
      
       console.log("lat " + t4)
       console.log("long " + t5)
     }
     }
    }*/
     
    


     return myarr;



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
