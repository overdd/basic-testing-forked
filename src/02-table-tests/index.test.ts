import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 5, b: 3, action: Action.Subtract, expected: 2 },
  { a: 4, b: 2, action: Action.Multiply, expected: 8 },
  { a: 9, b: 3, action: Action.Divide, expected: 3 },
  { a: 2, b: 3, action: Action.Exponentiate, expected: 8 },
];

const testCasesNegative = [
  { a: 2, b: 3, action: 'invalid action', expected: null },
  { a: 'foo', b: 3, action: Action.Add, expected: null },
  // { a: 2, b: 0, action: Action.Divide, expected: null },
];

describe('simpleCalculator', () => {
  describe('Positive Tests', () => {
    test.each(testCases)(
      'given a: %p, b: %p and action: %p, returns: %p',
      ({ a, b, action, expected }) => {
        expect(simpleCalculator({ a, b, action })).toBe(expected);
      },
    );
  });

  describe('Negative Tests', () => {
    test.each(testCasesNegative)(
      'given a: %p, b: %p and action: %p, returns: %p',
      ({ a, b, action, expected }) => {
        if (typeof a === 'string' || typeof action === 'string') {
          expect(simpleCalculator({ a, b, action })).toBe(expected);
        } else {
          throw new Error('Invalid test parameters');
        }
      },
    );
  });
});
