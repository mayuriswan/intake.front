import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { CoreCommonModule } from '@core/common.module';
import { DashboardComponent } from './dashboard.component';
import { MedicalIntakeService } from 'app/services/medical-intake.service';
import { MedicalIntake } from 'app/interfaces/medical-intake';

const routes = [
  {
    path: '**',
    component: DashboardComponent,
    data: {animation: 'dashboard' },    
  },  
];

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgbModule,
    PerfectScrollbarModule,
    CoreCommonModule,
  ],
  providers: [],
  exports: []
})
export class DashboardModule {
 
}
