export interface Point {
    lat: number
    lon: number
  }

export interface BountyCell {
    id: number
    center: Point
    amount: string
    polygon: Point[]
}

interface Properties {
  id: number
  amount: string
  center: Point
}

interface Geometry {
  type: 'Polygon' | 'Point'
  coordinates: number[][][] | number[]
}

interface Feature {
  type: 'Feature'
  properties: Properties
  geometry: Geometry
}

export interface FeatureCollection {
  type: string
  features: Feature[]
}

export interface Collections {
  cellsCollection: FeatureCollection
  heatmapCollection: FeatureCollection
}