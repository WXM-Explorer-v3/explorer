import type { BountyCell, FeatureCollection } from "../types/bounties"

const createCellsCollection = (cells: BountyCell[]): FeatureCollection => {
    console.log(cells)
    return {
      type: 'FeatureCollection',
      features: cells.map((cell: BountyCell) => ({
        type: 'Feature',
        properties: {
          id: cell.id,
          amount: cell.amount,
          center: cell.center
        },
        geometry: {
          type: 'Polygon',
          coordinates: [cell.polygon.map((coordinates) => [coordinates.lon, coordinates.lat])]
        }
      }))
    }
  }
  const createHeatmapCollection = (cells: BountyCell[]): FeatureCollection => {
    return {
      type: 'FeatureCollection',
      features: cells.map((cell: BountyCell) => ({
        type: 'Feature',
        properties: {
            id: cell.id,
            amount: cell.amount,
            center: cell.center
        },
        geometry: {
          type: 'Point',
          coordinates: [cell.center.lon, cell.center.lat]
        }
      }))
    }
  }
  export default {
    createCellsCollection,
    createHeatmapCollection
  }