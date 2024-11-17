import * as L from "leaflet"
import { MapModel } from "../../models/MapModel"
import { MarkerModel } from "../../models/MarkerModel"
import { MarkerEntity, AbsMapEntity, PolylineEntity } from "../abstract"
import { PolylineModel } from "../../models/Poliyline"

export class MapEntity_Leaflet extends AbsMapEntity {
  map: L.Map
  model: MapModel

  constructor(mapRef: L.Map, model: MapModel) {
    super(model)
    this.model = model
    this.map = mapRef

    this.map.on("move", () => {
      const center = this.map.getCenter()
      this.model.lat = center.lat
      this.model.lng = center.lng
      this.model.zoom = this.map.getZoom()
    })
  }

  static fromMapModel(mapModel: MapModel, mapRef: L.Map): AbsMapEntity {
    const model = new MapEntity_Leaflet(mapRef, mapModel)
    model.mount()
    return model
  }

  updateView(): void {
    const model = this.model
    this.map.setView([model.lat, model.lng], model.zoom)
  }

  private mountMarkers(): void {
    this.model.markers.items.forEach((marker) => {
      MarkerEntity_Leaflet.fromMarkerModel(marker, this)
    })

    this.model.markers.on("add", (marker) => {
      MarkerEntity_Leaflet.fromMarkerModel(marker, this)
    })
  }

  private mountLines(): void {
    this.model.lines.items.forEach((line) => {
      PolylineEntity_Leaflet.fromMarkerModel(line, this)
    })

    this.model.lines.on("add", (line) => {
      PolylineEntity_Leaflet.fromMarkerModel(line, this)
    })
  }

  mount() {
    this.mountMarkers()
    this.mountLines()
    this.updateView()
  }

  unmount() {
    this.map.remove()
  }
}

export class MarkerEntity_Leaflet extends MarkerEntity {
  private markerRef: L.Marker
  private mapImpl: MapEntity_Leaflet

  private constructor(
    model: MarkerModel,
    mapRef: MapEntity_Leaflet,
    markerRef: L.Marker
  ) {
    super(model)
    this.mapImpl = mapRef
    this.markerRef = markerRef
  }

  static fromMarkerModel(
    model: MarkerModel,
    map: MapEntity_Leaflet
  ): MarkerEntity_Leaflet {
    const markerRef = L.marker([model.lat, model.lng], {
      draggable: true,
    })
    const marker = new MarkerEntity_Leaflet(model, map, markerRef)
    marker.mount()
    return marker
  }

  mount(): void {
    this.markerRef.addTo(this.mapImpl.map)

    this.model.addEffect(() => this.updateView())

    this.markerRef.on("move", () => {
      const position = this.markerRef.getLatLng()
      this.model.lat = position.lat
      this.model.lng = position.lng
    })
  }

  unmount(): void {
    this.mapImpl.map.removeLayer(this.markerRef)
  }

  updateView(): void {
    this.markerRef.setLatLng([this.model.lat, this.model.lng])
  }
}

export class PolylineEntity_Leaflet extends PolylineEntity {
  private polylineRef: L.Polyline
  private mapImpl: MapEntity_Leaflet

  private constructor(
    model: PolylineModel,
    mapRef: MapEntity_Leaflet,
    markerRef: L.Polyline
  ) {
    super(model)
    this.mapImpl = mapRef
    this.polylineRef = markerRef
  }

  static fromMarkerModel(
    model: PolylineModel,
    map: MapEntity_Leaflet
  ): PolylineEntity_Leaflet {
    const polylineRef = L.polyline(
      model.locationPoints.map((location) => [location.lat, location.lng])
    )
    const marker = new PolylineEntity_Leaflet(model, map, polylineRef)
    marker.mount()
    return marker
  }

  mount(): void {
    this.polylineRef.addTo(this.mapImpl.map)

    this.model.addEffect(() => this.updateView())

    this.updateView()
  }

  unmount(): void {
    this.mapImpl.map.removeLayer(this.polylineRef)
  }

  updateView(): void {
    this.polylineRef.setLatLngs(
      this.model.locationPoints.map((location) => [location.lat, location.lng])
    )
  }
}
