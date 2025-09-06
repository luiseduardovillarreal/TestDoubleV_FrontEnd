import { Inject, Injectable, PLATFORM_ID } from "@angular/core";
import { IGoogleMapsService } from "../../domain/services/igoogle.maps.service";
import { GetActualLocation } from "../../domain/models/location/get-actual/get.actual.location.response";
import { isPlatformBrowser } from "@angular/common";

@Injectable({ providedIn: 'root' })
export class GoogleMapsService implements IGoogleMapsService {
    private actualLocation: GetActualLocation = {
        locationActual: {
            latitude: 0,
            longitude: 0
        }
    };

    constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

    public GetCurrentLocation(): Promise<GetActualLocation> {
        if (isPlatformBrowser(this.platformId) && navigator?.geolocation) {
            return new Promise((resolve) => {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        this.actualLocation.locationActual.latitude = position.coords.latitude;
                        this.actualLocation.locationActual.longitude = position.coords.longitude;
                        resolve(this.actualLocation);
                    },
                    (error) => {
                        resolve(this.actualLocation);
                    },
                    {
                        enableHighAccuracy: true,
                        timeout: 5000,
                        maximumAge: 0
                    }
                );
            });
        }
        return Promise.resolve(this.actualLocation);
    }
}