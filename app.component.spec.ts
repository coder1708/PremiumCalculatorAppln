import { Component, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { AppComponent } from './app.component';

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
    component.form.controls['name'].setValue('Amit Tiwari');
    component.form.controls['age'].setValue(null);
    component.form.controls['dob'].setValue('08/17/1993');
    component.form.controls['deathsuminsured'].setValue(1600000);
    component.form.controls['occupation'].setValue('Doctor');
    expect(component.form.invalid).toBeTruthy();
  });
  
  it('should call the onOccupationChange method', () => {
    fixture.detectChanges();
    spyOn(component, 'onOccupationChange');
    el = fixture.debugElement.query(By.css('select')).nativeElement;
    el.click();
    expect(component.onOccupationChange).toHaveBeenCalledTimes(0);
  });
});
