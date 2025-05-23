import { Component, Inject, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { EventsService, HamEvent } from '../events.service';
import { QSO, QSOsService } from '../qsos.service';
import { PdfService } from '../pdf.service';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { UploadComponent } from '../upload/upload.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgIf, NgFor } from '@angular/common';
declare let gtag: Function;
@Component({
    selector: 'app-adminqsos',
    templateUrl: './adminqsos.component.html',
    standalone: true,
    imports: [NgIf, UploadComponent, RouterLink, ReactiveFormsModule, NgFor, FormsModule, NgxPaginationModule, TranslateModule]
})
export class AdminQSOsComponent {

  public balance = '';


  searchForm!: FormGroup;
  public QSOs: any[] = [];
  page: number = 1;
  count: number = 0;
  tableSize: number = 10;
  public eventId: string = '';
  public eventSecret: string = '';
  public event: HamEvent | undefined;
  public originalQSO: QSO | undefined;
  public searchInput = '';
  public loaded = false;
  public blob: Blob | undefined;
  public isLive: boolean = false;
  @ViewChild(UploadComponent) upload!: UploadComponent;


  constructor(private formBuilder: FormBuilder, private router: Router, private routes: ActivatedRoute, private eventsService: EventsService, private qsosService: QSOsService, private pdfService: PdfService, private translate: TranslateService) {

    this.searchForm = this.formBuilder.group({
      search: "",
    });
  }

  ngOnInit() {
    this.routes.paramMap.subscribe(params => {
      this.eventId = params.get('id')!;
      this.eventSecret = params.get('secret')!;
      this.eventsService.getEvent(this.eventId, this.eventSecret).subscribe(
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
          this.isLive = response != null && (<Array<any>>response).length > 0;
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
  editQSO(qso: any) {
    this.originalQSO = Object.assign({}, qso);
    qso.editable = true;
  }
  saveQSO(qso: any) {
    if (this.originalQSO) {
      this.qsosService.update(this.originalQSO, qso, this.eventId, this.eventSecret).subscribe(
        (response) => {
          this.loadData();
          console.log(response);
        },
        (error) => {
          console.log(error);
        });
      }
  }
  edit() {
    this.router.navigate([this.eventId, this.eventSecret,'edit']);
  }
  top() {
    this.router.navigate([this.eventId, 'top']);
  }
  live() {
    this.router.navigate([this.eventId, 'live']);
  }
  deleteall() {
    if (confirm(this.translate.instant('Are you sure?'))) {
      this.qsosService.deleteAll(this.eventId, this.eventSecret).subscribe(
        (response) => {
          this.loadData();
          console.log(response);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
  delete(qso: QSO) {
    this.qsosService.delete(qso, this.eventId, this.eventSecret).subscribe(
      (response) => {
        this.loadData();
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  exportall() {
    this.qsosService.exportAll(this.eventId, this.eventSecret).subscribe((data: any) => {

      this.blob = new Blob([data], { type: 'text/xml' });

      let downloadURL = window.URL.createObjectURL(data);
      let link = document.createElement('a');
      link.href = downloadURL;
      link.download = "log.adif";
      link.click();

    });
  }
  genPdf() {
    return this.pdfService.getPdf(this.eventId, this.searchInput).subscribe((data: any) => {
      gtag('event', "GetDiplomaFromAdmin", {
        'event_category': "diploma",
        'event_label': "admin",
        'value': this.searchInput
      });
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
        this.upload.message = '';
        this.upload.progress = 0;
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
  uploadFinished(event: any) {
    this.loadData();
  }
  qualifiesForDiploma() {
    return this.QSOs.length > 0 && this.searchInput.length > 0 && this.loaded;
  }
}




