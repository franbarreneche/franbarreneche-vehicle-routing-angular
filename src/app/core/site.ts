export class Site {
  public static TYPE_COLLECTION = "COLLECTION";
  public static TYPE_DEPOT = "DEPOT";

  constructor(
    public lat: number,
    public lng: number,
    public demand: number = 0,
    public isDepot: boolean = false
  ) { }

}
