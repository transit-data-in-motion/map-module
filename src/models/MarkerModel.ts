import { RactiveModel } from "./BaseModel";
import { LocationModel } from "./location.model";

export class MarkerModel extends RactiveModel {
  public id: number;
  private location: LocationModel;

  constructor(id: number, location: LocationModel) {
    super();
    this.id = id;
    this.location = location
    this.location.addEffect(() => {
      super.notify();
    });
  }

  static fromLatLng(id: number, lat: number, lng: number): MarkerModel {
    return new MarkerModel(id, new LocationModel(lat, lng));
  }

  set lat(lat: number) {
    this.location.lat = lat;
  }

  get lat(): number {
    return this.location.lat;
  }

  set lng(lng: number) {
    this.location.lng = lng;
  }

  get lng(): number {
    return this.location.lng;
  }
}
