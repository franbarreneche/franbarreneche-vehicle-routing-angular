import { Route } from "./route";

export class RoutingSolution {

  constructor(
    public status: Result,
    public totalLoadOfAllRoutes: number,
    public totalDistanceOfAllRotutes: number,
    public droppedNodes: number[],
    public routes: Route[],
    public unusedVehicles?: number[],
  ) { }

  public static adapt(item: any): RoutingSolution {
    return new RoutingSolution(
      item.status,
      item.totalLoadOfAllRoutes,
      item.totalDistanceOfAllRotutes,
      item.droppedNodes,
      item.routes.map(Route.adapt),
      item.unusedVehicles
    );
  }
}

export enum Result {
  SUCCESS = "SUCCESS",
  TIMEOUT = "TIMEOUT",
  FAIL = "FAIL",
}
