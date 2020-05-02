import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { ReCaptchaV3Service, OnExecuteData } from 'ng-recaptcha';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  title = 'a-recaptcha-v3';
  token: string;
  data: any;

  constructor(private recaptchaV3Service: ReCaptchaV3Service, private http: HttpClient) {}

  public ngOnInit() {
    this.subscription.add(
      this.recaptchaV3Service.onExecute.subscribe((data: OnExecuteData) => {
        this.handleRecaptchaExecute(data.action, data.token);
      })
    );
  }

  public ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  public executeAction(): void {
    this.subscription.add(this.recaptchaV3Service.execute('testAction').subscribe(token => this.handleToken(token)));
  }

  handleToken(token: string) {
    this.token = token;
    this.http
      .post(`/api/recaptchav3`, {
        token,
      })
      .subscribe(data => {
        this.data = data;
      });
  }

  handleRecaptchaExecute(action, token) {
    console.log('---', action, token);
  }
}
