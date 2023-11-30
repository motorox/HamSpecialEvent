import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationStart, Params, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { filter, map } from 'rxjs';
import { EventsService, HamEvent } from '../events.service';
import { QSOsService } from '../qsos.service';
import { MenuItem, MessageService, PrimeIcons } from 'primeng/api';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  providers: [MessageService]
})
export class NavMenuComponent {
  isExpanded = false;
  items: MenuItem[] | undefined;
  langItems: MenuItem[] | undefined;

  siteLanguage = 'English';
  public eventId: string = '';
  public event: HamEvent | undefined;
  public isLive: boolean = false;

  constructor(private messageService: MessageService, private translate: TranslateService, private routes: ActivatedRoute, private eventsService: EventsService, private qsosService: QSOsService, private router: Router) { }

  changeSiteLanguage(localeCode: string): void {
    const languageList = [
      { code: 'en', label: 'English' },
      { code: 'ro', label: 'Română' },
    ];
    const selectedLanguage = languageList.find((language) => language.code === localeCode)?.label.toString();
    if (selectedLanguage) {
      this.siteLanguage = selectedLanguage;
      this.translate.use(localeCode);
    }
    const currentLanguage = this.translate.currentLang;
    console.log('currentLanguage:', currentLanguage);
    this.setMenuItems();
  }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  private rootRoute(route: ActivatedRoute): ActivatedRoute {
    while (route.firstChild) {
      route = route.firstChild;
    }
    return route;
  }

  update() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Data Updated' });
  }

  delete() {
    this.messageService.add({ severity: 'warn', summary: 'Delete', detail: 'Data Deleted' });
  }

  ngOnInit() {
    this.setMenuItems();
    this.router.events.pipe(
      // identify navigation end
      filter((event) => event instanceof NavigationEnd),
      // now query the activated route
      map(() => this.rootRoute(this.routes)),
      filter((route: ActivatedRoute) => route.outlet === 'primary'),
    ).subscribe((route: ActivatedRoute) => {
      var id = route.snapshot.paramMap.get('id')
      if (id != null) {
        this.eventId = id;
        this.eventsService.getEvent(this.eventId).subscribe(
          (response) => {
            this.event = response;
            console.log(response);
          },
          (error) => {
            console.log(error);
          }
        );
        this.qsosService.getLive(this.eventId).subscribe(
          (response) => {
            this.isLive = response != null && (<Array<any>>response).length>0;
            console.log(response);
          },
          (error) => {
            console.log(error);
          }
        );
      } else {
        this.eventId = '';
        this.isLive = false;
        this.event = undefined;
      }
      this.eventId = 'dfsdfsdfsdfsdfsdfsdf';
      this.isLive = true;


    });
  }

  private setMenuItems() {
    console.log("IN SET MENU ITEMS !!!");
        this.langItems = [
            {
                label: 'English',
                icon: 'pi pi-fw flag-gb flag',
                routerLinkActiveOptions: { exact: true },
                command: () => { this.changeSiteLanguage('en'); }
            },
            {
                label: 'Română',
                icon: 'pi pi-fw flag-ro flag',
                routerLinkActiveOptions: { exact: true },
                command: () => { this.changeSiteLanguage('ro'); }
            }
        ];

        this.items = [
          {
            icon: PrimeIcons.GLOBE,
              routerLink: '/'
          },
          {
            label: this.translate.instant('Home'),
            icon: PrimeIcons.HOME,
            routerLinkActiveOptions: { 'exact': 'true' },
            routerLinkActive: "active",
            routerLink: ['/Home']
          },
          {
            label: this.translate.instant('HamEvents', { name: 'John' }),
            icon: PrimeIcons.MEGAPHONE,
            routerLinkActiveOptions: { 'exact': 'true' },
            routerLinkActive: "active",
            routerLink: ['/Events']
          },
            {
                label: 'Navigate',
                items: [
                  {
                      label: 'Angular',
                      icon: 'pi pi-external-link',
                      routerLink: ['/pagename'], queryParams: { 'recent': 'true' }
                  },
                  {
                    label: 'Update',
                    icon: PrimeIcons.REFRESH,
                    command: () => {
                      this.update();
                    }
                  },
                  {
                    label: 'Delete',
                    icon: PrimeIcons.TIMES,
                    command: () => {
                      this.delete();
                    }
                  }
                ]
            }
        ];
    }
}
/*
  < li class="nav-item" * ngIf="event" >
              <a class="nav-link" > {{ event.name }}</a>

  < li class="nav-item" * ngIf="event" >
                  <a[routerLink]="[eventId]" class="nav-link" routerLinkActive = "active"
                  [routerLinkActiveOptions] = "{exact:true}" > {{ 'QSOs' | translate }}</a>

  < li class="nav-item" * ngIf="event && event.hasTop" >
                      <a[routerLink]="[eventId,'top']" class="nav-link" routerLinkActive = "active"
                      [routerLinkActiveOptions] = "{exact:true}" > {{ 'Event Top' | translate }}</a>

  < li class="nav-item" * ngIf="event && isLive" >
                          <a[routerLink]="[eventId,'live']" class="nav-link" routerLinkActive = "active"
                          [routerLinkActiveOptions] = "{exact:true}" > {{ 'Live' | translate }}</a>
*/
