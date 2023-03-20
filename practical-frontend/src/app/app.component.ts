import { Component } from '@angular/core';
import { User } from './_models/user';
import { AccountService } from './_services/account.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'practical-frontend';
  user: User;

  constructor(private accountService: AccountService) {
    this.accountService.user.subscribe((x: any) => (this.user = x));
    console.log(this.user);
  }

  logout() {
    this.accountService.logout();
  }
}
