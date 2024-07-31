export type User = {
  id: string;
  email: string;
  pictureUrl: string;
}

export type Root1= {
  ok: boolean
  license: string
  data: string
  status: string
  station: Station1
}

export type Station1= {
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
