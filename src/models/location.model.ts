import { RactiveModel } from "./BaseModel";

export class LocationModel extends RactiveModel {
  private _lat: number;
  private _lng: number;

  constructor(lat: number, lng: number) {
    super();
    this._lat = lat;
    this._lng = lng;
  }

  set lat(lat: number) {
    if (this._lat === lat) return;
    this._lat = lat;
    super.notify();
  }

  get lat(): number {
    return this._lat;
  }

  set lng(lng: number) {
    if (this._lng === lng) return;
    this._lng = lng;
    super.notify();
  }

  get lng(): number {
    return this._lng;
  }
}