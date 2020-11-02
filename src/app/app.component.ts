import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ThemeService } from './_services/theme.service';
import {TranslateService} from '@ngx-translate/core';
import { Router } from '@angular/router';
import { AuthenticationService} from './_services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  darkTheme =  new FormControl(false);
  constructor(
    private themeService: ThemeService,
    private translate: TranslateService,
    private authenticationService: AuthenticationService,
    private router: Router,
) {
  translate.setDefaultLang('en');
}

ngOnInit() {
}
themeSelection(color){
  if (color === 'dark'){
    this.themeService.toggleDark();
  } else{
    this.themeService.toggleLight();
  }
  }

toggleLanguage(lang){
    this.translate.use(lang);
}

logout(){
  this.authenticationService.logout();
  this.router.navigate(['/login-page']);
}
}
