import { MapModel } from "../../models/MapModel"
import { MarkerModel } from "../../models/MarkerModel"
import { PolylineModel } from "../../models/Poliyline"

export abstract class Entity {
  abstract mount(): void
  abstract unmount(): void
}

export abstract class MarkerEntity extends Entity {
  public model: MarkerModel

  constructor(model: MarkerModel) {
    super()
    this.model = model
  }
}

export abstract class PolylineEntity extends Entity {
  public model: PolylineModel

  constructor(model: PolylineModel) {
    super()
    this.model = model
  }
}

export abstract class AbsMapEntity extends Entity {
  public model: MapModel

  constructor(model: MapModel) {
    super()
    this.model = model
  }
}
