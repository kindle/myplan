import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'signin',
    loadChildren: () => import('./signin/signin.module').then( m => m.SigninPageModule)
  },
  {
    path: 'target',
    loadChildren: () => import('./target/target.module').then( m => m.TargetPageModule)
  },
  {
    path: 'group',
    loadChildren: () => import('./group/group.module').then( m => m.GroupPageModule)
  },
  {
    path: 'target-viewer',
    loadChildren: () => import('./target-viewer/target-viewer.module').then( m => m.TargetViewerPageModule)
  },
  {
    path: 'share',
    loadChildren: () => import('./share/share.module').then( m => m.SharePageModule)
  },
  {
    path: 'group-select',
    loadChildren: () => import('./group-select/group-select.module').then( m => m.GroupSelectPageModule)
  },
  {
    path: 'tutorial',
    loadChildren: () => import('./tutorial/tutorial.module').then( m => m.TutorialPageModule)
  },
  {
    path: 'group-viewer',
    loadChildren: () => import('./group-viewer/group-viewer.module').then( m => m.GroupViewerPageModule)
  },
  {
    path: 'image-adjust',
    loadChildren: () => import('./image-adjust/image-adjust.module').then( m => m.ImageAdjustPageModule)
  },
  {
    path: 'history-today',
    loadChildren: () => import('./history-today/history-today.module').then( m => m.HistoryTodayPageModule)
  },
  {
    path: 'note',
    loadChildren: () => import('./note/note.module').then( m => m.NotePageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
