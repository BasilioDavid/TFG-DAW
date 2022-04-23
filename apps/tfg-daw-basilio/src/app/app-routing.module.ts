import { NgModule } from '@angular/core';
import { RouterModule, Routes, UrlSegment } from '@angular/router';
import { AppComponent } from './app.component';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/login/login.module').then((module) => module.LoginModule),
  },
  {
    path: 'main',
    // children: [
    //   {
    //     outlet: 'left',
    //     matcher: (url) => {
    //       if (url.length === 1 && url[0].path.match(/^@[\w]+$/gm)) {
    //         return {
    //           consumed: url,
    //           posParams: {
    //             username: new UrlSegment(url[0].path.substr(1), {}),
    //           },
    //         };
    //       }
    //
    //       return null;
    //     },
    //     redirectTo: '(right:explorer//left:explorer)',
    //   },
    // ],
    loadChildren: () =>
      import('./pages/main/main.module').then((module) => module.MainModule),
  },
  //TODO: check if I want to redirect to main
  {
    path: '**',
    redirectTo: '/main',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
