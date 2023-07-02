import { simpleCalculator, Action } from './index';

describe('simpleCalculator', () => {
  describe('Positive Tests', () => {
    it('should add two numbers', () => {
      const input = { a: 1, b: 2, action: Action.Add };
      expect(simpleCalculator(input)).toEqual(3);
    });
    it('should subtract two numbers', () => {
      const input = { a: 5, b: 3, action: Action.Subtract };
      expect(simpleCalculator(input)).toEqual(2);
    });
    it('should multiply two numbers', () => {
      const input = { a: 4, b: 2, action: Action.Multiply };
      expect(simpleCalculator(input)).toEqual(8);
    });
    it('should divide two numbers', () => {
      const input = { a: 9, b: 3, action: Action.Divide };
      expect(simpleCalculator(input)).toEqual(3);
    });
    it('should exponentiate two numbers', () => {
      const input = { a: 2, b: 3, action: Action.Exponentiate };
      expect(simpleCalculator(input)).toEqual(8);
    });
  });
  describe('Negative Tests', () => {
    it('should return null for invalid action', () => {
      const input = { a: 2, b: 3, action: 'invalid action' };
      expect(simpleCalculator(input)).toBeNull();
    });
    it('should return null for invalid arguments', () => {
      const input = { a: 'foo', b: 3, action: Action.Add };
      expect(simpleCalculator(input)).toBeNull();
    });
    // it('should return Infinity for divide by zero', () => {
    //   const input = { a: 3, b: 0, action: Action.Divide };
    //   expect(simpleCalculator(input)).toBeNull();
    // });
  });
});
