export class RouteStep {
  constructor(
    public locationIndex: number,
    public locationLoad: number,
    public accumulated: number,
  ) { }

  public static adapt(item: any): RouteStep {
    return new RouteStep(
      item.locationIndex,
      item.locationLoad,
      item.accumulated
    );
  }
}
