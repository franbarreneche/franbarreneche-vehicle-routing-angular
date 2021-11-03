export class Vehicle {
  constructor(
    public capacity: number,
    public start: number,
    public end: number,
    public id: number = Math.floor(Math.random() * 50000),
  ) { }
}
