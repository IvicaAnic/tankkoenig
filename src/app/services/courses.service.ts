import {inject, Injectable} from "@angular/core";
import { HttpClient, HttpContext } from "@angular/common/http";
import {environment} from "../../environments/environment";
import {firstValueFrom, Observable} from "rxjs";
import {Course,TankRoot,Tank, } from "../models/course.model";
import {GetCoursesResponse, GetTankResponse} from "../models/get-courses.response";
import {SkipLoading} from "../loading/skip-loading.component";
import {  Root } from "../models/user.model";



@Injectable({
  providedIn: "root"
})
export class CoursesService {

  http = inject(HttpClient);
response:any;
  env = environment;
  myroot:any =[];
  myroot1:any ;
  async loadAllCourses():Promise<Course[]> {
    const courses$ =
      this.http.get<GetCoursesResponse>(`${this.env.apiRoot}/courses`);
    const response = await firstValueFrom(courses$);
    return response.courses;
  }

  async getTankerKoenigPrice(lat:string,lng:string):Promise<TankRoot> {
    let t1="https://creativecommons.tankerkoenig.de/json/list.php?lat="+lng +"&lng=" +lat +"8&rad=1.5&sort=dist&type=all&apikey=98d9fddc-64dd-7ac9-0889-17bac58698d3"
  console.log("AAAAAAAAAAAAAAAA " +t1);
    // const courses$ =
     // this.http.get<TankRoot>(`https://creativecommons.tankerkoenig.de/json/list.php?lat=52.521&lng=13.438&rad=1.5&sort=dist&type=all&apikey=98d9fddc-64dd-7ac9-0889-17bac58698d3`);
      const courses1$ =
      this.http.get<TankRoot>(t1);
      this.response = await firstValueFrom(courses1$);   

    return this.response;
  }

  async getLatLng(param:string):Promise<Root> {
    let tt="https://nominatim.openstreetmap.org/search?q="
    tt=tt+param +"&format=geocodejson";  
  
    const courses$ =
      this.http.get<Root>(tt);
    const response = await firstValueFrom(courses$);   
    console.log("link 44444444444444 " + courses$);
    return response;
  }
/*
  async loadAllTank1():Promise<Tank> {
    const courses$ =
      this.http.get<GetTankResponse>(`https://creativecommons.tankerkoenig.de/json/list.php?lat=52.521&lng=13.438&rad=1.5&sort=dist&type=all&apikey=98d9fddc-64dd-7ac9-0889-17bac58698d3`);
    const response = await firstValueFrom(courses$);
    console.log(response)
    return response;
  }*/

  async getCourseById(courseId:string): Promise<Course> {
    const course$ =
        this.http.get<Course>(
          `${this.env.apiRoot}/courses/${courseId}`);
    return firstValueFrom(course$)
  }

  async createCourse(course: Partial<Course>) : Promise<Course> {
    const course$ =
      this.http.post<Course>(`${this.env.apiRoot}/courses`, course)
    return firstValueFrom(course$);
  }

  async saveCourse(courseId:string,
                   changes: Partial<Course>) : Promise<Course> {
    const course$ =
      this.http.put<Course>(`${this.env.apiRoot}/courses/${courseId}`,
        changes)
    return firstValueFrom(course$);
  }

  async deleteCourse(courseId:string) {
    const delete$ =
      this.http.delete(`${this.env.apiRoot}/courses/${courseId}`);
    return firstValueFrom(delete$);
  }


}
