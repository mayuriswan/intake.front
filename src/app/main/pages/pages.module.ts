import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { CoreCommonModule } from '@core/common.module';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';



import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { ThankYouComponent } from './thankYou/thank-you/thank-you.component';

@NgModule({
  declarations: [
    ThankYouComponent
  ],
  imports: [
    CommonModule,
    CoreCommonModule,
    ContentHeaderModule,
    NgbModule,
    FormsModule,
    MiscellaneousModule,
  ],

  providers: []
})
export class PagesModule {}
