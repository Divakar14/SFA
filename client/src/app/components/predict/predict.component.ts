import { Component, OnInit} from '@angular/core';
import { FlaskapiService } from 'src/app/flaskapi.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-predict',
  templateUrl: './predict.component.html',
  styleUrls: ['./predict.component.css'],
  providers: [FlaskapiService],
})

export class PredictComponent implements OnInit {
  public predictDatasetSubscription: Subscription = new Subscription;
  predictForm: FormGroup;
  submitted: boolean = false;
  formData: any;
  public file: any;

  constructor(
    private flaskApiService: FlaskapiService,
    private router: Router,
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.predictForm = this.formBuilder.group({
      file: ['', Validators.required],
      title: ['', [Validators.required, Validators.maxLength(25)]],
      predictColumn: ['', Validators.required],
      periodicity: ['', Validators.required],
      numericalValue: ['', [Validators.required, Validators.min(1)]],
    });
  }
  
  ngOnDestroy() {
    if (this.predictDatasetSubscription) {
      this.predictDatasetSubscription.unsubscribe();
    }
  }
  getFile(event: any) {
    this.file = event.target.files[0];
  }

  submitData() {
    this.submitted = true;
    if (this.predictForm.valid) {
      this.formData = {
        title: this.predictForm.controls['title'].value,
        predictColumn: this.predictForm.controls['predictColumn'].value,
        periodicity: this.predictForm.controls['periodicity'].value,
        numericalValue: this.predictForm.controls['numericalValue'].value,
      };
      this.predictDatasetSubscription = this.flaskApiService
        .postData(this.formData, this.file, localStorage.getItem('email'))
        .subscribe((response) => {
          localStorage.setItem('show', 'true');
          this.router.navigate(['/prediction-result']);
          this.submitted = false;
        });
    }
  }
}
