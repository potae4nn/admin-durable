import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { HttpClientModule } from '@angular/common/http';
import { DataTablesModule } from "angular-datatables";
import { NgxPrintModule } from 'ngx-print';
import { ExcelService } from './services/excel.service';
import { JwtHelperService, JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';
import { AuthGuardService } from './services/auth-guard.service';
import { AngularPaginatorModule } from 'angular-paginator';
// import { Chart } from 'chart.js';
// import { chartModule } from 'ng2-charts';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { AddDurableComponent } from './components/add-durable/add-durable.component';
import { EditDurableComponent } from './components/edit-durable/edit-durable.component';
import { ReportDurableComponent } from './components/report-durable/report-durable.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignoutComponent } from './components/signout/signout.component';
import { ReportDurablePipe } from './pipes/report-durable.pipe';
import { PrintDurableComponent } from './components/print-durable/print-durable.component';
import { TableSortPipe } from './pipes/table-sort.pipe';
import { SortDirective } from './directive/sort.directive';
import { YearSelectPipe } from './pipes/year-select.pipe';
import { PaginationsPipe } from './pipes/paginations.pipe';
import { FormEditComponent } from './components/form-edit/form-edit.component';
import { ProfilePipe } from './pipes/profile.pipe';
import { FormEditDurableComponent } from './components/form-edit-durable/form-edit-durable.component';
import { RoleUserPipe } from './pipes/role-user.pipe';
import { CalpaginationsPipe } from './pipes/calpaginations.pipe';
import { TableReportComponent } from './components/table-report/table-report.component';
// import { FilterPipe } from './pipes/filter.pipe';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './components/navbar/navbar.component';

import { MatSliderModule } from '@angular/material/slider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { FooterComponent } from './components/footer/footer.component';
import { RejectComponent } from './components/reject/reject.component';
import { ConvertYearPipe } from './pipes/convert-year.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DashboardComponent,
    AddUserComponent,
    EditUserComponent,
    AddDurableComponent,
    EditDurableComponent,
    ReportDurableComponent,
    SigninComponent,
    SignoutComponent,
    ReportDurablePipe,
    PrintDurableComponent,
    TableSortPipe,
    SortDirective,
    YearSelectPipe,
    PaginationsPipe,
    FormEditComponent,
    ProfilePipe,
    FormEditDurableComponent,
    RoleUserPipe,
    CalpaginationsPipe,
    TableReportComponent,
    NavbarComponent,
    FooterComponent,
    RejectComponent,
    ConvertYearPipe,
    // FilterPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    DataTablesModule,
    NgxPrintModule,
    ReactiveFormsModule,
    AngularPaginatorModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatNativeDateModule,
    MatButtonModule,
    MatCardModule,
    MatExpansionModule,
    MatGridListModule,
    MatInputModule,
    MatTableModule,
    MatDividerModule,
    MatDialogModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSelectModule
  ],
  providers: [
    CookieService,
    ExcelService,
    AuthGuardService,
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

