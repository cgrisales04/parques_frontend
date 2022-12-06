import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { Parques, ResponseGetHttp } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ParkService {
  private baseUrl: string = environment.baseUrl;
  private _park!: Parques;
  private _municipios!: any;

  get park() {
    return [...this._park];
  }

  get municipios() {
    return [...this._municipios];
  }

  constructor(private http: HttpClient) { }

  getPark(): Observable<any> {
    return this.http.get(`${this.baseUrl}/parques`)
      .pipe(
        map((resp: any) => {
          this._park = resp.data;
          return resp;
        }),
        catchError(err => of({}))
      )
  }

  getMunicipios(): Observable<any> {
    return this.http.get(`${this.baseUrl}/municipios`)
      .pipe(
        map((resp: any) => {
          this._municipios = resp.data;
          return resp;
        }),
        catchError(err => of({}))
      )
  }

  deletePark(park_id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/parques/${park_id}`)
      .pipe(
        map((resp: any) => {
          return resp;
        }),
        catchError(err => of({}))
      )
  }

  selectPark(park_id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/parques/${park_id}`)
      .pipe(
        map((resp: any) => {
          return resp;
        }),
        catchError(err => of({}))
      )
  }

  insertPark(nombre_parques: string, direccion_parques: string,
    telefono_parques: string, codigo_municipios: string) {

    return this.http.post<any>(`${this.baseUrl}/parques`, {
      nombre_parques,
      direccion_parques,
      telefono_parques,
      codigo_municipios
    })
      .pipe(
        tap(resp => {
          if (resp.status) {
            return resp;
          }
        }),
        map(resp => resp),
        catchError(err => of(err.error))
      )
  }

  updatePark(codigo_parques: string, nombre_parques: string, direccion_parques: string,
    telefono_parques: string, codigo_municipios: string) {

    return this.http.put<any>(`${this.baseUrl}/parques/${codigo_parques}?nombre_parques=${nombre_parques}&direccion_parques=${direccion_parques}&telefono_parques=${telefono_parques}&codigo_municipios=${codigo_municipios}`, {})
      .pipe(
        tap(resp => {
          if (resp.status) {
            return resp;
          }
        }),
        map(resp => resp),
        catchError(err => of(err.error))
      )
  }

}
