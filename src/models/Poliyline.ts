import { RactiveModel } from "./BaseModel";
import { LocationModel } from "./location.model";

export class PolylineModel extends RactiveModel {
  public id: number;
  private _locationPoints: LocationModel[];

  constructor(id: number, locations: LocationModel[]) {
    super();
    this.id = id;
    this._locationPoints = locations;
    this._locationPoints.forEach((location) => {
      location.addEffect(() => {
        super.notify();
      });
    });
  }

  static fromLatLngArray(
    id: number,
    locations: [number, number][]
  ): PolylineModel {
    return new PolylineModel(
      id,
      locations.map(([lat, lng]) => new LocationModel(lat, lng))
    );
  }

  get locationPoints(): LocationModel[] {
    return this._locationPoints;
  }

}
