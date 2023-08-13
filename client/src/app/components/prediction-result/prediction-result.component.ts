import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FlaskapiService } from 'src/app/flaskapi.service';
import { VisualizationComponent } from '../visualization/visualization.component';

@Component({
  selector: 'app-prediction-result',
  templateUrl: './prediction-result.component.html',
  styleUrls: ['./prediction-result.component.css'],
  providers: [FlaskapiService],
})

export class PredictionResultComponent implements OnInit {
  predicted_date: any = [];
  predicted_column: any = [];
  title: string;
  mae: Number;
  mape: Number;
  mse: Number;
  rmse: Number;
  predictedColumnName: any;
  columnName: any;
  periodicity: any;
  numericalValue: any;
  public getCurrentPredictionSubscription: Subscription;
  constructor(
    private router: Router,
    private flaskApiService: FlaskapiService,
  ) {}

  ngOnInit(): void {
    this.getPrediction();
  }

  ngOnDestroy() {
    if (this.getCurrentPredictionSubscription) {
      this.getCurrentPredictionSubscription.unsubscribe();
    }
  }

  getPrediction() {
    this.getCurrentPredictionSubscription = this.flaskApiService
      .getCurrentPrediction(localStorage.getItem('email'))
      .subscribe((response) => {
        this.title = response['data'].title;
        this.predicted_date = response['data'].predictedDate;
        this.predicted_column = response['data'].predictedColumn;
        this.predictedColumnName = response['data'].predictedColumnName;
        this.columnName = response['data'].columnName;
        this.mape = response['data'].mape.toFixed(3);
        this.mae = response['data'].mae.toFixed(3);
        this.rmse = response['data'].rmse.toFixed(3);
        this.mse = response['data'].mse.toFixed(3);
        this.numericalValue = response['data'].numericalValue;

        if (response['data'].periodicity == 'Yearly') {
          if (response['data'].numericalValue > 1) {
            this.periodicity = 'years';
          } else {
            this.periodicity = 'year';
          }
        } else if (response['data'].periodicity == 'Monthly') {
          if (response['data'].numericalValue > 1) {
            this.periodicity = 'months';
          } else {
            this.periodicity = 'month';
          }
        } else if (response['data'].periodicity == 'Weekly') {
          if (response['data'].numericalValue > 1) {
            this.periodicity = 'weeks';
          } else {
            this.periodicity = 'week';
          }
        } else {
          if (response['data'].numericalValue > 1) {
            this.periodicity = 'days';
          } else {
            this.periodicity = 'day';
          }
        }
        var visualizationObj = new VisualizationComponent();
        visualizationObj.linePlot(
          this.predictedColumnName,
          this.predicted_column,
          this.predicted_date,
          this.columnName
        );
        visualizationObj.barPlot(
          this.predictedColumnName,
          this.predicted_column,
          this.predicted_date,
          this.columnName
        );
      });
  }
}