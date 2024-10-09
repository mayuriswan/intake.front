import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';


import 'hammerjs';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { CoreModule } from '@core/core.module';
import { CoreCommonModule } from '@core/common.module';
import { CoreSidebarModule, CoreThemeCustomizerModule } from '@core/components';

import { coreConfig } from 'app/app-config';
import { fakeBackendProvider } from 'app/auth/helpers'; // used to create fake backend
import { JwtInterceptor, ErrorInterceptor } from 'app/auth/helpers';
import { AppComponent } from 'app/app.component';
import { LayoutModule } from 'app/layout/layout.module';
import { UserInputComponent } from './user-input/user-input.component';
import { DashboardComponent } from './main/dashboard/dashboard.component';
import { ThankYouComponent } from './main/pages/thankYou/thank-you/thank-you.component';
import { LoginComponent } from './login/login.component';
import { PortalComponent } from './portal/portal.component';
import { SearchIntakesComponent } from './search-intakes/search-intakes.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { AuthGuard } from './auth.guard';
import { IntakeDetailComponent } from './portal/intake-detail/intake-detail.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/user-input',
    pathMatch: 'full' },  // Default route to show layout
  { path: 'login', component: LoginComponent },  // Login route

  {
    path: 'portal',
    component: PortalComponent, 
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'search-intakes', pathMatch: 'full' },  // Default child route
      { path: 'search-intakes', component: SearchIntakesComponent },  // Search Intake Forms - accessible to both roles
      { path: 'user-management', component: UserManagementComponent }  // User Management - Admins only
    ]
  },
  { path: 'portal/intake-detail/:referenceNumber', component: IntakeDetailComponent, canActivate: [AuthGuard] },
  {
    path: 'pages',
    loadChildren: () => import('./main/pages/pages.module').then(m => m.PagesModule)
  },
  { path: 'dashboard/:referenceNumber', component: DashboardComponent },

  {
    path: 'user-input',
    component: UserInputComponent
  },
  { path: 'thank-you', component: ThankYouComponent }
  ,
  {
    path: '',
    redirectTo: '/user-input',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./main/dashboard/dashboard.module').then(m => m.DashboardModule)
  },  
  {
    path: '**',
    redirectTo: '/pages/miscellaneous/error' //Error 404 - Page not found
  }
];

@NgModule({
  declarations: [
    AppComponent,
    UserInputComponent,
    LoginComponent,
    PortalComponent,
    SearchIntakesComponent,
    UserManagementComponent,
    IntakeDetailComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,    
    RouterModule.forRoot(appRoutes, {
      scrollPositionRestoration: 'enabled', // Add options right here
      relativeLinkResolution: 'legacy'
    }),
    NgbModule,
    CoreModule.forRoot(coreConfig),
    CoreCommonModule,
    CoreSidebarModule,
    CoreThemeCustomizerModule,
    LayoutModule,
  ],

  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

    // ! IMPORTANT: Provider used to create fake backend, comment while using real API
    fakeBackendProvider
  ],
  entryComponents: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
