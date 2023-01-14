import { Injectable } from '@angular/core';
import { AlertController, Platform, ToastController } from '@ionic/angular';
import { Animation, StatusBar, Style } from '@capacitor/status-bar';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';
import { Capacitor } from '@capacitor/core';

@Injectable({
  providedIn: 'root'
})
export class UiService {

  isIos = false;
  isAndroid = false;
  
  constructor(
    private toastController: ToastController,
    private alertController: AlertController,
    private platform: Platform,
    private socialSharing: SocialSharing,
  ) { 
    if(this.platform.is('ios')){
      this.isIos =true;
    }
    if(this.platform.is('android')){
      this.isAndroid =true;
    }
  }

  setStatusBar(style: Style,animation: Animation,color: string) {
    if(Capacitor.isNativePlatform()) {
      //Style.Dark white text
      //Style.Light black text
      StatusBar.setStyle({ style: style });
      StatusBar.setBackgroundColor({color:color});

      if(this.platform.is('ios')){
        //Animation.Fade|Animation.Slide|Animation.None
        StatusBar.show({animation: animation});
      }
      
      if(this.platform.is('android')){
        //android only
        //StatusBar.setOverlaysWebView({ overlay: true });
      }
    }
  }


  async toast(position: 'top' | 'middle' | 'bottom',msg:string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 1500,
      position: position,
      cssClass: 'custom-toast',
    });

    await toast.present();
  }

  async confirm(header, message, action){
    const alert = await this.alertController.create({
        header: header,//this.reddah.instant("Confirm.Title")
        message: message,
        buttons: [
        {
            text: "取消",
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => {}
        }, 
        {
            text: "确定",
            handler: () => {
                action();
            }
        }]
    });

    await alert.present().then(()=>{
    
    });;
  }

  share(base64ImageData){
    this.socialSharing.share(null, "share", base64ImageData, null);
  }

  saveShareImage(dataUrl){
    if (this.platform.is('mobile')) {
        let date = new Date(),
        time = date.getTime(),
        fileName = time + ".png";


        Filesystem.writeFile({
          path: fileName,
          data: dataUrl,
          directory: Directory.Documents,
        });
        
    } else {
        // Fallback for Desktop
        var data = dataUrl.split(',')[1];
        let blob = this.b64toBlob(data, 'image.webp');

        var a = window.document.createElement('a');
        a.href = window.URL.createObjectURL(blob);
        a.download = 'canvasimage.webp';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }
  }

  private b64toBlob(b64Data, contentType) 
  {
    contentType = contentType || '';
    var sliceSize = 512;
    var byteCharacters = atob(b64Data);
    var byteArrays = [];

    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      var slice = byteCharacters.slice(offset, offset + sliceSize);

      var byteNumbers = new Array(slice.length);
      for (var i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      var byteArray = new Uint8Array(byteNumbers);

      byteArrays.push(byteArray);
    }

    var blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }
}