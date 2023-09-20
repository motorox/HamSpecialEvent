import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QSOsService {

  constructor(private http: HttpClient, @Inject('BASE_URL') public baseUrl: string) { }
  getAllQSOs(eventId: string, callsign: string, page: number, size: number): Observable<any> {
    return this.http.get(this.baseUrl + 'hamevent/QSOs/' + encodeURIComponent(eventId)+"?page="+page+"&size="+size+"&callsign="+encodeURIComponent(callsign));
  }
  delete(qso: QSO, eventId: string,secret:string): Observable<any> {
    return this.http.delete(this.baseUrl + 'hamevent/QSOs/' + encodeURIComponent(eventId) + "/" + encodeURIComponent(secret) + "?"
      + "callsign1="+encodeURIComponent(qso.callsign1) + "&"
      + "callsign2=" + encodeURIComponent(qso.callsign2) + "&"
      + "mode=" + encodeURIComponent(qso.mode) + "&"
      + "band=" + encodeURIComponent(qso.band) + "&"
      + "timestamp=" + encodeURIComponent(qso.timestamp));
  }
}
export interface QSO {
  callsign1: string;
  callsign2: string;
  rst1: string;
  rst2: string;
  mode: string;
  band: string;
  timestamp: string;
}
export interface PageResult<T> {
  count: number;
  data: T[];
}