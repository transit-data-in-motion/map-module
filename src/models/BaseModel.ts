
export class RactiveModel {
  private effects: CallableFunction[] = [];

  constructor() {}

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