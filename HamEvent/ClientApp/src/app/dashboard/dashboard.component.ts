import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventsService, HamEvent } from '../events.service';
import { Operator, QSO, QSOsService } from '../qsos.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent {
  public eventId: string = '';
  public event: HamEvent | undefined;
  public isLive: boolean = false;
  public Operators: Operator[] = [];
  public QSOs: QSO[] = [];

  constructor(private routes: ActivatedRoute, private eventsService: EventsService, private qsosService: QSOsService) {

  }

  ngOnInit() {
    this.routes.paramMap.subscribe(params => {
      this.eventId = params.get('id')!;
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
          this.Operators = response;
          this.Operators.forEach((operator) => {
            this.QSOs=this.QSOs.concat(operator.lastQSOs);
          });
          this.QSOs.sort((n1, n2) => new Date(n1.timestamp) > new Date(n2.timestamp)?1:-1);
          console.log(response);
        },
        (error) => {
          console.log(error);
        }
      );
    });
  }
}
