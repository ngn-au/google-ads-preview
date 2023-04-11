import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Image {
  Domain: string;
  First_Name: string;
  Last_Name: string;
  Agency_Name: string;
  Suburb: string;
  Mobile: string;
  Search_Term: string;
  Button_A: string;
  Button_B: string;
} 

@Injectable({
  providedIn: 'root'
})

export class DashboardService {
  private _appPages$: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  private _Image$: BehaviorSubject<any> = new BehaviorSubject<Image>({
    Domain: '',
    First_Name: '',
    Last_Name: '',
    Agency_Name: '',
    Suburb: '',
    Mobile: '',
    Search_Term: 'real estate agents',
    Button_A: 'real estate agents',
    Button_B: 'real estate agents'
  });

  public get Image$(): BehaviorSubject<any> {
    return this._Image$;
  }
  public set Image$(value: BehaviorSubject<any>) {
    this._Image$ = value;
  }

  public get appPages$(): BehaviorSubject<any> {
    return this._appPages$;
  }
  public set appPages$(value: BehaviorSubject<any>) {
    this._appPages$ = value;
  }

  constructor() { }
}
