import { Component } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import { Vibration } from '@ionic-native/vibration/ngx';
import { NativeAudio } from '@ionic-native/native-audio/ngx';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  escanea: string = 'nada';
  constructor(private camera: Camera, private qrScanner: QRScanner, private vibration: Vibration, private nativeAudio: NativeAudio) {
  }
  fart() {

    this.nativeAudio.preloadSimple('uniqueId1', './assets/fart.mp3');

    this.nativeAudio.play('uniqueId1');

    // can optionally pass a callback to be called when the file is done playing
    this.nativeAudio.play('uniqueId1', () => console.log('uniqueId1 is done playing'));



    this.nativeAudio.stop('uniqueId1');

    this.nativeAudio.unload('uniqueId1');
  }
  private vibrar() {
    console.log('entro')
    // Vibrate the device for a second
    // Duration is ignored on iOS.
    this.vibration.vibrate(1000);

    // Vibrate 2 seconds
    // Pause for 1 second
    // Vibrate for 2 seconds
    // Patterns work on Android and Windows only
    this.vibration.vibrate([2000, 1000, 2000]);

    // Stop any current vibrations immediately
    // Works on Android and Windows only
    this.vibration.vibrate(0);
  }
  private cam() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      let base64Image = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      // Handle error
    });
  }
  private qr() {
    this.qrScanner.prepare()
      .then((status: QRScannerStatus) => {
        if (status.authorized) {
          // camera permission was granted


          // start scanning
          let scanSub = this.qrScanner.scan().subscribe((text: string) => {
            console.log('Scanned something', text);
            this.escanea = text;
            this.qrScanner.hide(); // hide camera preview
            scanSub.unsubscribe(); // stop scanning
          });

        } else if (status.denied) {
          this.escanea = 'denied';
          // camera permission was permanently denied
          // you must use QRScanner.openSettings() method to guide the user to the settings page
          // then they can grant the permission from there
        } else {
          this.escanea = 'no permamnnete';
          // permission was denied, but not permanently. You can ask for permission again at a later time.
        }
      })
      .catch((e: any) => this.escanea = e);

  }
}
