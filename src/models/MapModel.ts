import * as L from "leaflet";
import { MarkerModel } from "./MarkerModel";

export class MapModel {
  public lat: number;
  public lng: number;
  public zoom: number;
  public markers: MarkerModel[];

  constructor(lat: number, lng: number, zoom: number, markers: MarkerModel[]) {
    this.lat = lat;
    this.lng = lng;
    this.zoom = zoom;
    this.markers = markers;
  }
}

