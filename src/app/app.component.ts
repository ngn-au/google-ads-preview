import { Component, Output, ViewChild } from '@angular/core';
import { DashboardService, Image} from './services/dashboard.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import * as htmlToImage from 'html-to-image';
import { IonModal, LoadingController, AlertController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})

export class AppComponent {
  delay = (delay: number) => new Promise(resolve => setTimeout(resolve, delay));
  Image$?: BehaviorSubject<Image> = new BehaviorSubject(<Image>{});
  UploadedImage: any;
  ionicForm!: FormGroup;
  imgSrc?: string;
  files: File[] = [];
  @ViewChild(IonModal) modal?: IonModal;

  public appPages: Array<any> = [
    { title: 'Mock-up Generator ', url: '/dashboard/mock-up-generator', icon: 'image' },
  ];

  public labels = [];
  public img_url?: String;
  constructor(
    private alertCtrl: AlertController,
    private http: HttpClient,
    private loadingCtrl: LoadingController,
    private dashboardService: DashboardService,
    private formBuilder: FormBuilder,
    ) {

    this.dashboardService.appPages$.next(this.appPages);
    this.ionicForm = this.formBuilder.group({
      Domain: ['', [Validators.required, Validators.minLength(2)]],
      First_Name: ['', [Validators.required, Validators.minLength(2)]],
      Last_Name: ['', [Validators.required, Validators.minLength(2)]],
      Agency_Name: ['', [Validators.required, Validators.minLength(2)]],
      Suburb: ['', [Validators.required, Validators.minLength(2)]],
      Mobile: ['', [Validators.required, Validators.minLength(2)]],
      Search_Term: ['real estate agents', [Validators.required, Validators.minLength(2)]],
      Button_A: ['', [Validators.minLength(2)]],
      Button_B: ['', [Validators.minLength(2)]],
   })
  }

  name?: string;

  cancel() {
    this.modal?.dismiss(null, 'cancel');
  }

  async confirm() {
    await this.modal?.dismiss(this.name, 'confirm');
  }

  async onWillDismiss(event: Event) {
    const ev = event as any;
    if (ev.detail.role === 'confirm') {

      const loading = await this.loadingCtrl.create({message: 'Posting to Telegram Chat'});
      await loading.present();
      var node = document.getElementById('mobile-preview-frame') as HTMLCanvasElement;
      try {
      this.http.post(location.protocol + '//'+window.location.host+'/api/telegram', { Image: this.ionicForm.value, imgSrc: this.imgSrc, protocol: location.protocol, host: window.location.host }).subscribe((res: any) => {
        this.img_url = res.img_url;
        console.log(this.img_url);
      });
    } catch (err) {
      console.log(err);
      const alert = await this.alertCtrl.create({message: JSON.stringify(err)});
      await alert.present();
    }
      await this.delay(1000);
      await loading.dismiss();
    }
  }

  async submitForm() {
    const loading = await this.loadingCtrl.create();
    await loading.present();
    this.dashboardService.Image$.next(<Image>this.ionicForm.value);
    this.Image$?.next(<Image>this.ionicForm.value);
    console.log(this.Image$?.value)
    await this.delay(200);
    var node = document.getElementById('mobile-preview-frame') as HTMLCanvasElement;
    await htmlToImage.toPng(node, { quality: 1})
    .then( async (dataUrl: any) => {
      this.imgSrc = dataUrl;
      await this.modal?.present();
      loading.dismiss();    
    }).catch(function (error) {
      console.error('oops, something went wrong!', error);
    });;
  }

  async postToChat() {
    
  }

  onRemove(f: any) {

  }

  onSelect(event: any) {
    console.log(event);
    this.files.push(...event.addedFiles);
    const reader = new FileReader();
    reader.onload = () => {
      this.dashboardService.UploadedImage$.next(reader.result as string);
    }
    reader.readAsDataURL(this.files[0])
  }

}