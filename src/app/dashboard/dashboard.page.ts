import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DashboardService, Image } from '../services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  public dashboard!: string;
  public Image?: Image;
  public UploadedImage?: string;
  public appPages?: Array<any>;
  constructor(private dashboardService: DashboardService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.dashboard = this.activatedRoute.snapshot.paramMap.get('page') as string;
    this.dashboardService.appPages$.subscribe(res=>{
      this.appPages = res;
    }).unsubscribe();

    this.dashboardService.Image$.subscribe(res=>{
      this.Image = res;
    })

    this.dashboardService.UploadedImage$.subscribe(res=>{
      this.UploadedImage = res;
    })
  }

  //     setInterval(() => console.log(this.appPages), 1000)

}
