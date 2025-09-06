import { Injectable } from "@angular/core";
import { IIpService } from "../../domain/services/iip.service";
import { catchError, map, Observable, of, retry, timeout } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({ providedIn: 'root' })
export class IpService implements IIpService {
  private ipServices = [
    { url: 'https://api.ipify.org?format=json', keyPath: 'ip' },
    { url: 'https://ip.seeip.org/json', keyPath: 'ip' },
    { url: 'https://api.myip.com', keyPath: 'ip' },
    { url: 'https://ipinfo.io/json', keyPath: 'ip' }
  ];

  constructor(private http: HttpClient) {}

  public GetClientIP = () : Observable<string> =>
    this.TryNextIpService(0);

  private TryNextIpService = (index: number) : Observable<string> => {
    if (index >= this.ipServices.length)
      return of('unknown');

    const service = this.ipServices[index];
    
    return this.http.get<any>(service.url).pipe(
      timeout(3000),
      retry(1),
      map(response => {
        let parts = service.keyPath.split('.');
        let value = response;
        
        for (let part of parts) {
          if (value && value[part] !== undefined)
            value = value[part];
          else
            throw new Error(`Propiedad ${service.keyPath} no encontrada en la respuesta`);
        }

        if (typeof value === 'string' && this.isValidIp(value))
          return value;
        else
          throw new Error('El valor obtenido no es una IP válida');
      }),
      catchError(error => {
        console.warn(`Error al obtener IP desde ${service.url}:`, error);
        return this.TryNextIpService(index + 1);
      })
    );
  }

  private isValidIp = (ip: string) : boolean => {
    const ipv4Regex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    const ipv6Regex = /^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$|^::$|^::1$|^([0-9a-fA-F]{1,4}::?){1,7}([0-9a-fA-F]{1,4})$/;
    return ipv4Regex.test(ip) || ipv6Regex.test(ip);
  }
}