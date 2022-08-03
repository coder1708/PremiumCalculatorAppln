import { CurrencyPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

enum RatingValue {
  Professional = 1.0,
  WhiteCollar = 1.25,
  LightManual = 1.50,
  HeavyManual = 1.75
}

enum RatingString {
  Professional = 'Professional',
  WhiteCollar = 'White Collar',
  LightManual = 'Light Manual',
  HeavyManual = 'Heavy Manual'
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'Premium Calculator Application';


  constructor() {
  }

  OccupationList: Array<any> = [
    { occupation: "Cleaner", rating: 'Light Manual' },
    { occupation: "Doctor", rating: 'Professional' },
    { occupation: "Author", rating: 'White Collar' },
    { occupation: "Farmer", rating: 'Heavy Manual' },
    { occupation: "Mechanic", rating: 'Heavy Manual' },
    { occupation: "Florist", rating: 'Light Manual' }
  ];

  form = new FormGroup({
    name: new FormControl('', Validators.required),
    age: new FormControl('', Validators.required),
    dob: new FormControl('', Validators.required),
    occupation: new FormControl('', Validators.required),
    deathsuminsured: new FormControl('', Validators.required)
  });

  get name(): any {
    return this.form.get('name');
  }

  get age(): any {
    return this.form.get('age');
  }

  get dob(): any {
    return this.form.get('dob');
  }

  get occupation(): any {
    return this.form.get('occupation');
  }

  get deathsuminsured(): any {
    return this.form.get('deathsuminsured');
  }

  ageValidate() {
    if (this.form.controls['age'].value == '' || this.form.controls['age'].value == null) {
      this.hidePremiumAmount = false;
      this.form.controls['occupation'].setValue("");
    }
  }

  sumInsuredValidate() {
    // this.form.controls['deathsuminsured'].setValue(this.currencyPipe.transform(this.form.controls['deathsuminsured'].value, 'USD'));
    if (this.form.controls['deathsuminsured'].value == '' || this.form.controls['deathsuminsured'].value == null) {
      this.hidePremiumAmount = false;
      this.form.controls['occupation'].setValue("");
    }
  }

  occupationChange: any;
  factorValue: any;
  premiumAmount: any;
  hidePremiumAmount: boolean = false;
  onOccupationChange(event: any) {
    if (this.form.invalid) {
      this.hidePremiumAmount = false;
      this.form.controls['occupation'].setValue("");
      return;
    }
    if (this.form.valid) {
      this.occupationChange = event.target.value;
      switch (this.occupationChange) {
        case RatingString.LightManual:
          this.factorValue = RatingValue.LightManual;
          this.premiumAmount = (this.form.controls['deathsuminsured'].value * this.factorValue * this.form.controls['age'].value) / 1000 * 12;
          this.hidePremiumAmount = true;
          break;
        case RatingString.Professional:
          this.factorValue = RatingValue.Professional;
          this.premiumAmount = (this.form.controls['deathsuminsured'].value * this.factorValue * this.form.controls['age'].value) / 1000 * 12;
          this.hidePremiumAmount = true;
          break;
        case RatingString.WhiteCollar:
          this.factorValue = RatingValue.WhiteCollar;
          this.premiumAmount = (this.form.controls['deathsuminsured'].value * this.factorValue * this.form.controls['age'].value) / 1000 * 12;
          this.hidePremiumAmount = true;
          break;
        case RatingString.HeavyManual:
          this.factorValue = RatingValue.HeavyManual;
          this.premiumAmount = (this.form.controls['deathsuminsured'].value * this.factorValue * this.form.controls['age'].value) / 1000 * 12;
          this.hidePremiumAmount = true;
          break;
        default:
          this.hidePremiumAmount = false;
          break;
      }
    }
  }
}
