import {CourseCategory} from "./course-category.model";

export type Course = {
  id: string;
  title: string;
  longDescription: string;
  seqNo: number;
  iconUrl: string;
  price: number;
  uploadedImageUrl: string;
  courseListIcon: string;
  category: CourseCategory;
  lessonsCount: number;
}


export function sortCoursesBySeqNo(c1: Course, c2: Course) {
  return c1.seqNo - c2.seqNo;
}
export type stations1= { 
  id: string ;
   name: string ;
   brand: string;
   street: string;
  place: string;
   lat: number;
   lng: number;
   dist: number;
   diesel: number;
  e5 :number;
  e10:number;
   isOpen :boolean;
   houseNumber: string;
   postCode: number;
  }
  export type Tank =
  {
  ok:boolean;
  license:string;
  data:string;
  status:string;
  stations :stations1[];
  }
  export type TankRoot = {
    ok: boolean
    license: string
    data: string
    status: string
    stations: TankStation[]
  }
  
  export type TankStation ={
    id: string
    name: string
    brand: string
    street: string
    houseNumber: string
    postCode: number
    place: string
    openingTimes: any[]
    overrides: any[]
    wholeDay: boolean
    isOpen: boolean
    e5: number
    e10: number
    diesel: number
    lat: number
    lng: number
    state: any
  }

