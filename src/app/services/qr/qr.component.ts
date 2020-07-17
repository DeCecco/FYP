import { Component, OnInit } from '@angular/core';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import { Vibration } from '@ionic-native/vibration/ngx';

@Component({
  selector: 'app-qr',
  templateUrl: './qr.component.html',
  styleUrls: ['./qr.component.scss'],
})
export class QrComponent implements OnInit {

  escanea: string = 'nada';
  constructor(private qrScanner: QRScanner, private vibration: Vibration) { }

  ngOnInit() {
    this.qr();
    this.vibrar();
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
