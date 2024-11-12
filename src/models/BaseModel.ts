
export class RactiveModel {
  public id: number;
  private effects: CallableFunction[] = [];

  constructor(id: number) {
    this.id = id;
  }

  addEffect(effect: CallableFunction): void {
    this.effects.push(effect);
  }

  removeEffect(effect: CallableFunction): void {
    this.effects = this.effects.filter((e) => e !== effect);
  }

  notify(): void {
    this.effects.forEach((effect) => effect());
  }
}