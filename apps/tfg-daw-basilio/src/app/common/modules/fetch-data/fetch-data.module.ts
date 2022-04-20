import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FetchDataService } from './fetch-data.service';

@NgModule({
  exports: [HttpClientModule],
  providers: [FetchDataService],
})
export class FetchDataModule {}
