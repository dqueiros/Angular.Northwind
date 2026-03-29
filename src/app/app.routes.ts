import { Routes } from '@angular/router';

import { HomeComponent } from './features/home/home.component';
import { IndexComponent } from './features/categories/pages/index/index.component';
import { CategoryListComponent } from './features/categories/pages/list/category-list.component';
import { CategoryFormComponent } from './features/categories/pages/form/category-form.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  {
    path: 'categories',
    component: IndexComponent,
    children: [
      { path: '', component: CategoryListComponent },
      { path: 'view/:id', component: CategoryFormComponent },
      { path: ':id', component: CategoryFormComponent }
    ]
  }
];
