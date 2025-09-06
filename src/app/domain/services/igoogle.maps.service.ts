import { GetActualLocation } from "../models/location/get-actual/get.actual.location.response";

export interface IGoogleMapsService {
    GetCurrentLocation() : Promise<GetActualLocation>;
}