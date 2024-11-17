import { MarkerModel } from "./MarkerModel"
import { PolylineModel } from "./Poliyline"

type DictType = {
  [key: string]: any
}
export class Repository<T extends DictType, K extends keyof T> {
  private _items: Map<K, T>
  private _key: K

  private eventListeners: Map<string, Function[]> = new Map()

  constructor(key: K) {
    this._key = key
    this._items = new Map()
  }

  add(item: T): void {
    this._items.set(item[this._key], item)
    this.emit("add", item)
  }

  remove(item: T): void {
    this._items.delete(item[this._key])
    this.emit("remove", item)
  }

  clear(): void {
    this._items.clear()
  }

  get items(): T[] {
    return Array.from(this._items.values())
  }

  get length(): number {
    return this._items.size
  }

  get(key: K): T | undefined {
    return this._items.get(key)
  }

  on(event: string, listener: (item: T) => void): void {
    if (!this.eventListeners.has(event)) {
      this.eventListeners.set(event, [])
    }

    this.eventListeners.get(event)?.push(listener)
  }

  off(event: string, listener: (item: T) => void): void {
    const listeners = this.eventListeners.get(event)
    if (!listeners) return

    const index = listeners.indexOf(listener)
    if (index > -1) {
      listeners.splice(index, 1)
    }
  }

  emit(event: string, ...args: any[]): void {
    const listeners = this.eventListeners.get(event)
    if (!listeners) return

    listeners.forEach((listener) => {
      listener(...args)
    })
  }
}

type InitFunction = (model: MapModel) => void

export class MapModel {
  public lat: number
  public lng: number
  public zoom: number

  public markers = new Repository<MarkerModel, "id">("id")
  public lines = new Repository<PolylineModel, "id">("id")

  constructor(
    lat: number,
    lng: number,
    zoom: number,
    initFn: InitFunction = () => {}
  ) {
    this.lat = lat
    this.lng = lng
    this.zoom = zoom

    if (initFn) {
      initFn(this)
    }
  }
}
