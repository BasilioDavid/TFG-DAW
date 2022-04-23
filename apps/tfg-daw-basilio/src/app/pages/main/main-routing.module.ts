import { NgModule } from '@angular/core';
import { RouterModule, Routes, UrlSegment } from '@angular/router';
import { MainComponent } from './main.component';

const routes: Routes = [
  {
    matcher: (url) => {
      if (url.length === 1 && url[0].path.match(/^@[\w]+$/gm)) {
        return {
          consumed: url,
          posParams: {
            username: new UrlSegment(url[0].path.substr(1), {}),
          },
        };
      }

      return null;
    },
    redirectTo: '(right:explorer//left:explorer)',
  },
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'explorer',
        outlet: 'left',
        loadChildren: () =>
          import('./modules/file-explorer/file-explorer.module').then(
            (m) => m.FileExplorerModule
          ),
      },
      {
        path: 'explorer',
        outlet: 'right',
        loadChildren: () =>
          import('./modules/file-explorer/file-explorer.module').then(
            (m) => m.FileExplorerModule
          ),
      },
      {
        path: 'editor',
        outlet: 'left',
        loadChildren: () =>
          import('./modules/editor/editor.module').then((m) => m.EditorModule),
      },
      {
        path: 'editor',
        outlet: 'right',
        loadChildren: () =>
          import('./modules/editor/editor.module').then((m) => m.EditorModule),
      },
    ],
  },
  // {
  //   path: '**',
  //   redirectTo: '**/(right:explorer//left:explorer)',
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
