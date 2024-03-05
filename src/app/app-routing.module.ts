import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { AddDurableComponent } from './components/add-durable/add-durable.component';
import { EditDurableComponent } from './components/edit-durable/edit-durable.component';
import { ReportDurableComponent } from './components/report-durable/report-durable.component';
import { TableReportComponent } from './components/table-report/table-report.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignoutComponent } from './components/signout/signout.component';
import { PrintDurableComponent } from './components/print-durable/print-durable.component';
import { FormEditComponent } from './components/form-edit/form-edit.component';
import { FormEditDurableComponent } from './components/form-edit-durable/form-edit-durable.component';

import { AuthGuardService as AuthGuard } from './services/auth-guard.service';
import { RejectComponent } from './components/reject/reject.component';


const routes: Routes = [
  { path: '', redirectTo: '/deshboard', pathMatch: 'full' },
  { path: 'deshboard', canActivate: [AuthGuard], component: DashboardComponent },
  { path: 'addUser',canActivate: [AuthGuard], component: AddUserComponent },
  { path: 'editUser', canActivate: [AuthGuard],component: EditUserComponent },
  { path: 'addDurable',canActivate: [AuthGuard], component: AddDurableComponent },
  { path: 'editDurable',canActivate: [AuthGuard], component: EditDurableComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'signout', component: SignoutComponent },
  { path: 'printDurable',canActivate: [AuthGuard], component: PrintDurableComponent },
  { path: 'formEdit/:id',canActivate: [AuthGuard], component: FormEditComponent },
  { path: 'formEditDurable/:id',canActivate: [AuthGuard], component: FormEditDurableComponent },
  { path: 'reportDurable',canActivate: [AuthGuard], component: ReportDurableComponent },
  { path: 'rejectDurable',canActivate: [AuthGuard], component: RejectComponent },
  { path: 'reportTable',canActivate: [AuthGuard], component: TableReportComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
