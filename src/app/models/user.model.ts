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

export type Root = Root2[]

export interface Root2 {
  type: string
  properties: Properties
  geometry: Geometry
}

export interface Properties {
  geocoding: Geocoding
}

export interface Geocoding {
  place_id: number
  osm_type: string
  osm_id: number
  osm_key: string
  osm_value: string
  type: string
  label: string
  name: string
}

export interface Geometry {
  type: string
  coordinates: number[]
}

  