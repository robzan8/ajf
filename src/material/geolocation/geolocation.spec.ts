
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AjfGeolocationComponent, AjfGeolocationContainerDirective} from './geolocation';
import {AjfGeolocation} from '@ajf/core/geolocation';

describe('AjfMatGeolocation', () => {
  let geolocationComponent: AjfGeolocationComponent;
  let geolocationFixture: ComponentFixture<AjfGeolocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AjfGeolocationComponent, AjfGeolocationContainerDirective],
      providers: [{provide: AjfGeolocation}]
    }).compileComponents();
  }));
  beforeEach(() => {
    geolocationFixture = TestBed.createComponent(AjfGeolocationComponent);
    geolocationComponent = geolocationFixture.componentInstance;
    geolocationFixture.detectChanges();
  });

  it('Test geolocation with correct tileLayer and coordinates', () => {
    geolocationComponent.tileLayer = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    geolocationComponent.writeValue({lat: 51.5, long: -0.09, alt: 12});
    geolocationFixture.detectChanges();
    expect(geolocationComponent.map).toBeDefined();
    expect(geolocationComponent.marker).toBeDefined();
    expect(geolocationComponent.marker.getLatLng().lat).toBe(51.5);
    expect(geolocationComponent.marker.getLatLng().lng).toBe(-0.09);
  });

  it('Test race condition', () => {
    try {
      geolocationComponent.writeValue(null as any);
    } catch (e) {
      expect(e.message).toBe('missed coordinate');
    }

    try {
      geolocationComponent.writeValue({lcat: 51.5, long: -0.09, alt: 12} as any);
    } catch (e) {
      expect(e.message).toBe('missed latitude');
    }

    try {
      geolocationComponent.writeValue({lat: 51.5, longs: -0.09, alt: 12} as any);
    } catch (e) {
      expect(e.message).toBe('missed longitude');
    }

    try {
      geolocationComponent.writeValue({lat: '51.5', long: -0.09, alt: 12} as any);
    } catch (e) {
      expect(e.message).toBe('latitude is not a number');
    }

    try {
      geolocationComponent.writeValue({lat: 51.5, long: '-0.09', alt: 12} as any);
    } catch (e) {
      expect(e.message).toBe('longitude is not a number');
    }

    try {
      geolocationComponent.writeValue({lat: 51.5, long: -0.09, alt: '12'} as any);
    } catch (e) {
      expect(e.message).toBe('altitude is not a number');
    }
  });
});
