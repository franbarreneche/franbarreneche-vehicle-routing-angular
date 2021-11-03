import { RouteStep } from "./route-step";

export class Route {
  constructor(
    public title: string,
    public route: string,
    public distanceOfTheRoute: number,
    public loadOfTheRoute: number,
    public path: RouteStep[],
  ) { }

  public static adapt(item: any): Route {
    return new Route(
      item.title,
      item.route,
      item.distanceOfTheRoute,
      item.loadOfTheRoute,
      item.path.map(RouteStep.adapt),
    );
  }
}
