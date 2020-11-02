import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'  
import { ReactiveFormsModule} from '@angular/forms' 
import { RegisterRoutingModule } from './register-routing.module';
import { RegisterComponent } from './register.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClientModule, HTTP_INTERCEPTORS,HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

@NgModule({
  declarations: [RegisterComponent],
  imports: [
    CommonModule,
    RegisterRoutingModule,
    ReactiveFormsModule, 
    FormsModule, 
    TranslateModule.forChild({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
  })
  ]
})
export class RegisterModule { }
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}