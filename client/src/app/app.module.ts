import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AccountComponent } from './components/account/account.component';
import { AuthGuard } from './authguard.service';
import { LoggedInAuthGuard } from './loggedInAuthGuard.service';
import { PredictionResultAuthGuard } from './predictionResultAuthGuard.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PredictComponent } from './components/predict/predict.component';
import { PredictionResultComponent } from './components/prediction-result/prediction-result.component';
import { VisualizationComponent } from './components/visualization/visualization.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    PredictionResultComponent,
    AccountComponent,
    PredictComponent,
    PredictionResultComponent,
    VisualizationComponent,
    FooterComponent,
    HeaderComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
  ],
  providers: [AuthGuard, LoggedInAuthGuard, PredictionResultAuthGuard],
  bootstrap: [AppComponent],
  entryComponents: [],
})
export class AppModule {}
