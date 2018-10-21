import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

  alert = {
    type: 'success',
    message: null,
    visible: false,
    show: function () {
      this.visible = true;
      setTimeout(() => {
        this.visible = false;
      }, 3000);
    }
  };

  constructor() { }

  ngOnInit() {
  }

  showMessage(alert) {
    this.alert.type = alert.type;
    this.alert.message = alert.message;
    this.alert.show();
  }
}
