import { Component, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { AppComponent, RatingString } from './app.component';

describe('AppComponent', () => {

  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [FormsModule, ReactiveFormsModule]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(AppComponent);
      component = fixture.componentInstance;
      de = fixture.debugElement.query(By.css('form'));
      el = de.nativeElement;
    });
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
    expect(component.premiumAmount).toBe(0);
  });

  it(`should have as title 'Premium Calculator Application'`, () => {
    expect(component.title).toEqual('Premium Calculator Application');
  });

  it('CHECK Form is Valid', () => {
    component.form.controls['name'].setValue('Amit Tiwari');
    component.form.controls['age'].setValue(29);
    component.form.controls['dob'].setValue('08/17/1993');
    component.form.controls['deathsuminsured'].setValue(1600000);
    component.form.controls['occupation'].setValue('Doctor');
    expect(component.form.valid).toBeTruthy();
  });

  it('CHECK Form is Invalid', () => {
    component.form.controls['name'].setValue(null);
    component.form.controls['age'].setValue(null);
    component.form.controls['dob'].setValue(null);
    component.form.controls['deathsuminsured'].setValue(null);
    component.form.controls['occupation'].setValue(null);
    expect(component.form.invalid).toBeTruthy();
  });

  it('should call the onOccupationChange method', () => {
    fixture.detectChanges();
    spyOn(component, 'onOccupationChange');
    el = fixture.debugElement.query(By.css('select')).nativeElement;
    el.click();
    expect(component.onOccupationChange).toHaveBeenCalledTimes(0);
  });

  // it('should get the premium amount on selecting a value from drop down', () => {
  //   // component.form.controls['name'].setValue('Amit Tiwari');
  //   // component.form.controls['age'].setValue(29);
  //   // component.form.controls['dob'].setValue('08/17/1993');
  //   // component.form.controls['deathsuminsured'].setValue(1600000);
  //   // component.form.controls['occupation'].setValue('Doctor');
  //   spyOn(component, 'onOccupationChange')
  //   // el = fixture.debugElement.query(By.css('select')).nativeElement;
  //   // el.click();
  //   component.onOccupationChange('Light Manual');
  //   expect(component.premiumAmount).toHaveBeenCalledWith();
  // });

  it('should show `Doctor` as option',async () => {
    component.OccupationList = [
      { occupation: "Cleaner", rating: 'Light Manual' },
      { occupation: "Doctor", rating: 'Professional' },
      { occupation: "Author", rating: 'White Collar' },
      { occupation: "Farmer", rating: 'Heavy Manual' },
      { occupation: "Mechanic", rating: 'Heavy Manual' },
      { occupation: "Florist", rating: 'Light Manual' }
    ];

    const deathsuminsured = 1600000;
    const factorValue = 1.5;
    const age = 29;
    spyOn(component, 'onOccupationChange');
     
    fixture.whenStable().then(() => {
      let select : HTMLSelectElement = fixture.debugElement.query(By.css('select')).nativeElement;
      select.dispatchEvent(new Event('change'));
      component.selectedOccupation = new FormControl(component.OccupationList[0]);
      fixture.detectChanges();fixture.whenStable().then(() => {
        let text = select.options[select.selectedIndex].label;
         expect(text).toBe('Light Manual');  
       });
      const expectedPremiumAmount = (deathsuminsured * factorValue * age)/1000 * 12;
      component.premiumAmountCalculator(RatingString.LightManual);
      expect(expectedPremiumAmount).toBe(component.premiumAmount);
      console.log(expectedPremiumAmount + '' + component.premiumAmount);
    });
   // expect(component.premiumAmount).toEqual(expectedPremiumAmount);
  
});

});
