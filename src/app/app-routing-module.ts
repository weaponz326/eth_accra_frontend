import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { AuthGuard } from './core/guards/auth.guard';
import { Login } from './features/auth/login/login';
import { PatientRegister } from './features/auth/patient-register/patient-register';
import { ProviderRegister } from './features/auth/provider-register/provider-register';
import { PatientDashboard } from './features/patient/patient-dashboard/patient-dashboard';
import { PatientAccess } from './features/patient/patient-access/patient-access';
import { PatientRecords } from './features/patient/patient-records/patient-records';
import { PatientBilling } from './features/patient/patient-billing/patient-billing';
import { PatientAuditLog } from './features/patient/patient-audit-log/patient-audit-log';
import { ProviderDashboard } from './features/provider/provider-dashboard/provider-dashboard';
import { ProviderAccess } from './features/provider/provider-access/provider-access';
import { ProviderRecord } from './features/provider/provider-record/provider-record';
import { ProviderBilling } from './features/provider/provider-billing/provider-billing';
import { Referrals } from './features/provider/referrals/referrals';

const routes: Routes = [
  { path: '', component: Login },
  { path: 'auth/patient-register', component: PatientRegister },
  { path: 'auth/provider-register', component: ProviderRegister },
  {
    path: 'patient',
    // canActivate: [AuthGuard],
    children: [
      { path: 'dashboard', component: PatientDashboard },
      { path: 'access', component: PatientAccess },
      { path: 'records', component: PatientRecords },
      { path: 'billing', component: PatientBilling },
      { path: 'audit', component: PatientAuditLog }
    ]
  },
  {
    path: 'provider',
    // canActivate: [AuthGuard],
    children: [
      { path: 'dashboard', component: ProviderDashboard },
      { path: 'access', component: ProviderAccess },
      { path: 'records', component: ProviderRecord },
      { path: 'billing', component: ProviderBilling },
      { path: 'referrals', component: Referrals }
    ]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}