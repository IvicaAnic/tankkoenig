import {inject, Injectable} from "@angular/core";
import { HttpClient, HttpContext } from "@angular/common/http";
import {environment} from "../../environments/environment";
import {firstValueFrom, Observable} from "rxjs";
import {Course,TankRoot,Tank, } from "../models/course.model";
import {GetCoursesResponse, GetTankResponse} from "../models/get-courses.response";
import {SkipLoading} from "../loading/skip-loading.component";
import { Root5 } from "../models/user.model";


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

  async getTankerKoenigPrice():Promise<TankRoot> {
    const courses$ =
      this.http.get<TankRoot>(`https://creativecommons.tankerkoenig.de/json/list.php?lat=52.521&lng=13.438&rad=1.5&sort=dist&type=all&apikey=98d9fddc-64dd-7ac9-0889-17bac58698d3`);
    this.response = await firstValueFrom(courses$);   

    return this.response;
  }

  async getLatLng(param:string):Promise<Root5> {
    let tt="https://geocode.maps.co/search?city="
    tt=tt+param +"&api_key=66a9fb3faf77a476838447qokee288c"    
    const courses$ =
      this.http.get<Root5>(tt);
    this.response = await firstValueFrom(courses$);   

    return this.response;
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
