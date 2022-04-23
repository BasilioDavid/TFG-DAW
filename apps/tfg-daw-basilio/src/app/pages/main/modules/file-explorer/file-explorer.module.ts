import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileExplorerComponent } from './file-explorer.component';
import { FileExplorerRoutingModule } from './file-explorer-routing.module';

@NgModule({
  declarations: [FileExplorerComponent],
  imports: [CommonModule, FileExplorerRoutingModule],
})
export class FileExplorerModule {}
