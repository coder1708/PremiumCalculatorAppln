import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';

describe('AppComponent', () => {

  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [FormsModule, ReactiveFormsModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Premium Calculator Application'`, () => {
    fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Premium Calculator Application');
  });

  it('should render title', () => {
    fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Premium Calculator Application app is running!');
  });

  it('TEST a Form Group Element Count', () => {
    const formElement = fixture.debugElement.nativeElement.querySelector('#form');
    const inputElements = formElement.querySelectorAll('input');
    expect(inputElements.length).toEqual(4);
  })

  it('CHECK Form is Valid when Validations are fulfilled', () => {
    const formNameElement: HTMLInputElement = fixture.debugElement.nativeElement.
      querySelector('#form').querySelectorAll('input')[0];
    const formAgeElement: HTMLInputElement = fixture.debugElement.nativeElement.
      querySelector('#form').querySelectorAll('input')[1];
    const formDOBElement: HTMLInputElement = fixture.debugElement.nativeElement.
      querySelector('#form').querySelectorAll('input')[2];
    const formDeathSumAssElement: HTMLInputElement = fixture.debugElement.nativeElement.
      querySelector('#form').querySelectorAll('input')[3];
    const formSelectOccuptn: HTMLElement = fixture.debugElement.nativeElement.
      querySelector('#form').querySelectorAll('select');

    formNameElement.value = "Amit Tiwari";
    formAgeElement.valueAsNumber = 29;
    formDOBElement.valueAsDate = new Date('08/17/1993');
    formDeathSumAssElement.valueAsNumber = 1600000;
    formSelectOccuptn.ariaValueText = "Cleaner";
    formNameElement.dispatchEvent(new Event('input'));
    formAgeElement.dispatchEvent(new Event('input'));
    formDOBElement.dispatchEvent(new Event('input'));
    formDeathSumAssElement.dispatchEvent(new Event('input'));
    formSelectOccuptn.dispatchEvent(new Event('select'));
    const isFormValid = component.form.valid;
    fixture.whenStable().then(() => {
      expect(isFormValid).toBeTruthy();
    })
  })

  it('should execute the component method on change', () => {
    spyOn(component, 'onOccupationChange');
    component.OccupationList = [{ occupation: "Cleaner", rating: 'Light Manual' },
    { occupation: "Doctor", rating: 'Professional' },
    { occupation: "Author", rating: 'White Collar' },
    { occupation: "Farmer", rating: 'Heavy Manual' },
    { occupation: "Mechanic", rating: 'Heavy Manual' },
    { occupation: "Florist", rating: 'Light Manual' }];

    component.occupationChange = component.OccupationList[1];
    fixture.detectChanges();
    let select: HTMLSelectElement = fixture.debugElement.nativeElement.
      querySelector('#form').querySelectorAll('select');
    fixture.whenStable().then(() => {
      select.dispatchEvent(new Event('change'));
      fixture.detectChanges();
        expect(component.onOccupationChange).toHaveBeenCalledWith({occupation: "Doctor", rating: 'Professional'});
        console.log('after expect Monthly Premium Calculated Amount');
    });
  });

});
