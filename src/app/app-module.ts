import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Navbar } from './shared/components/navbar/navbar';
import { Sidebar } from './shared/components/sidebar/sidebar';
import { Footer } from './shared/components/footer/footer';
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

@NgModule({
  declarations: [
    App,
    Navbar,
    Sidebar,
    Footer,
    Login,
    PatientRegister,
    ProviderRegister,
    PatientDashboard,
    PatientAccess,
    PatientRecords,
    PatientBilling,
    PatientAuditLog,
    ProviderDashboard,
    ProviderAccess,
    ProviderRecord,
    ProviderBilling,
    Referrals
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners()
  ],
  bootstrap: [App]
})
export class AppModule { }
