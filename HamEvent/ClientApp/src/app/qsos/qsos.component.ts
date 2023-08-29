import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EventsService } from '../events.service';
import { QSOsService } from '../qsos.service';
import { PdfService } from '../pdf.service';

@Component({
  selector: 'app-qsos',
  templateUrl: './qsos.component.html'
})
export class QSOsComponent {
  searchForm!: FormGroup;
  public QSOs: QSO[] = [];
  page: number = 1;
  count: number = 0;
  tableSize: number = 10;

  public eventId: string = '';
  public event: HamEvent | undefined;
  public searchInput = '';
  public loaded = false;

  public blob: Blob | undefined;


  constructor(private formBuilder: FormBuilder, private routes: ActivatedRoute, private eventsService: EventsService, private qsosService: QSOsService, private pdfService: PdfService) {

    this.searchForm = this.formBuilder.group({
      search: "",
    });
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
      this.loadData();
    });
  }

  submitForm() {
    this.searchInput = encodeURIComponent(this.searchForm.get('search')?.value);
    this.loaded = false;
    this.page = 0;
    this.loadData();
    
  }

  genPdf() {

    return this.pdfService.getPdf(this.eventId, this.searchInput).subscribe((data: any) => {

      this.blob = new Blob([data], { type: 'application/pdf' });

      let downloadURL = window.URL.createObjectURL(data);
      let link = document.createElement('a');
      link.href = downloadURL;
      link.download = "diploma.pdf";
      link.click();

    });
   
  }


  loadData() {
    this.qsosService.getAllQSOs(this.eventId, this.searchInput, this.page, this.tableSize).subscribe(
      (response) => {
        this.QSOs = response.data;
        this.count = response.count;
        this.loaded = true;
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.loadData();
  }

  qualifiesForDiploma() {
    return this.QSOs.length > 0 && this.searchInput.length > 0 && this.loaded;
  }

}

interface PageResult<T>
{
  count: number;
  data: T[];
}

interface QSO {
  callsign1: string;
  callsign2: string;
  rst1: string;
  rst2: string;
  mode: string;
  band: string;
  timestamp: Date;
}
interface HamEvent {
  id: string;
  name: string;
}
