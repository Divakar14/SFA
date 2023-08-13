import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './components/account/account.component';
import { PredictComponent } from './components/predict/predict.component';
import { PredictionResultComponent } from './components/prediction-result/prediction-result.component';
import { AuthGuard } from './authguard.service';
import { LoggedInAuthGuard } from './loggedInAuthGuard.service';
import { PredictionResultAuthGuard } from './predictionResultAuthGuard.service';
const routes: Routes = [
  { path: '', 
    component: AccountComponent 
  },
  {
    path: 'predict',
    component: PredictComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'prediction-result',
    component: PredictionResultComponent,
    canActivate: [PredictionResultAuthGuard],
  },
  {
    path: 'account',
    component: AccountComponent,
    canActivate: [LoggedInAuthGuard],
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
