import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// PrimeNG stuff
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DropdownModule } from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RatingModule } from 'primeng/rating';
import { ToolbarModule } from 'primeng/toolbar';
import { ConfirmationService } from 'primeng/api';
import { PanelModule } from 'primeng/panel';
import { ToastModule } from 'primeng/toast';
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { QSOsComponent } from './qsos/qsos.component';
import { EventsComponent } from './events/events.component';
import { EventTopComponent } from './eventtop/eventtop.component';

import { AdminQSOsComponent } from './adminqsos/adminqsos.component';
import { AdminEventComponent } from './adminevent/adminevent.component';
import { UploadComponent } from './upload/upload.component';
import { SanitizedHtmlPipe } from './sanitized-html.pipe';
import { DashboardComponent } from './dashboard/dashboard.component';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    QSOsComponent,
    EventsComponent,
    EventTopComponent,
    DashboardComponent,
    AdminQSOsComponent,
    AdminEventComponent,
    UploadComponent,
    SanitizedHtmlPipe
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    BrowserAnimationsModule,
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    NgxPaginationModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      
      { path: 'Home', component: HomeComponent, pathMatch: 'full' },
      { path: '', component: EventsComponent, pathMatch: 'full' },
      { path: 'Events', component: EventsComponent, pathMatch: 'full' },
      { path: ':id/top', component: EventTopComponent, pathMatch: 'full' },
      { path: ':id/live', component: DashboardComponent, pathMatch: 'full' },
      { path: ':id/:secret/edit', component: AdminEventComponent, pathMatch: 'full' },
      { path: ':id/:secret', component: AdminQSOsComponent, pathMatch: 'full' },

      { path: ':id', component: QSOsComponent, pathMatch: 'full' },
    ]),
    InputTextModule,
    DialogModule,
    ToolbarModule,
    ConfirmDialogModule,
    RatingModule,
    InputNumberModule,
    InputTextareaModule,
    RadioButtonModule,
    DropdownModule,
    ButtonModule,
    PanelModule,
    TableModule,
    ToastModule,
    MenubarModule,
    MenuModule

  ],
  providers: [],
  exports: [SanitizedHtmlPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
