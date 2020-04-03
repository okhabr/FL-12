import { TestBed } from '@angular/core/testing';

import { CreditCardService } from './credit-card.service';

interface Result {
  isValid: boolean,
  message: string
};

describe('CreditCardService', () => {
  let service: CreditCardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreditCardService);
  });

  it('should create CreditCardService', async () => {
    expect(service).toBeTruthy();
  });

  it('should check valid one', () => {
    let result = service.testCreditCard('4111111111111111','VISA');
    expect(result.isValid).toBeTruthy();
    expect(result.message).toBe('Credit card has a valid format');
  });

  it('should check card type', () => {
    let result = service.testCreditCard('4111111111111111','Carte Blanche');
    expect(result.isValid).toBeFalsy();
    expect(result.message).toBe('Unknown card type');
  });

  it('should check card number format', () => {
    let result = service.testCreditCard('23675765','Visa');
    expect(result.isValid).toBeFalsy();
    expect(result.message).toBe('Credit card number is in invalid format');
  });
  
  it('should check if valid number', () => {
    let result = service.testCreditCard('5890997771092064','Discover');
    expect(result.isValid).toBeFalsy();
    expect(result.message).toBe('Credit card number is invalid');
  });

  it('should check if spam', () => {
    let result = service.testCreditCard('5490997771092064','JCB');
    expect(result.isValid).toBeFalsy();
    expect(result.message).toBe('Credit card number is invalid');
  });

  it('should check if correct length', () => {
    let result = service.testCreditCard('411111111111111','Visa');
    expect(result.isValid).toBeFalsy();
    expect(result.message).toBe('Credit card number has an inappropriate number of digits');
  });
});
