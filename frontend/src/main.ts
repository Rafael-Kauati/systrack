import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
bootstrapApplication(AppComponent, {
  providers: [provideHttpClient(), provideCharts(withDefaultRegisterables())]
})
.catch(err => console.error(err));
