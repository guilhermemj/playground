import { expect } from 'chai';

import Calculator from '../src/calculator';

const testIOFunction = (testCases, testFn) => {
  testCases.forEach(({ args, expectedResult }) => {
    const testTitle = `Should return "${expectedResult}" when called with (${args.join(', ')})`;

    it(testTitle, () => {
      const result = testFn(...args);

      expect(result).to.be.equal(expectedResult);
    });
  });
};

describe('Calculator', () => {
  describe('Smoke tests', () => {
    it('Should define a "sum" method', () => {
      expect(Calculator.sum).to.exist;
      expect(Calculator.sum).to.be.a('function');
    });

    it('Should define a "sub" method', () => {
      expect(Calculator.sub).to.exist;
      expect(Calculator.sub).to.be.a('function');
    });

    it('Should define a "mult" method', () => {
      expect(Calculator.mult).to.exist;
      expect(Calculator.mult).to.be.a('function');
    });

    it('Should define a "div" method', () => {
      expect(Calculator.div).to.exist;
      expect(Calculator.div).to.be.a('function');
    });
  });

  describe('Sum method', () => {
    const testCases = [
      {
        args: [2, 1],
        expectedResult: 3,
      },

      {
        args: [1, 2],
        expectedResult: 3,
      },

      {
        args: [10, 1, 1, 1, 1],
        expectedResult: 14,
      },

      {
        args: [10, -5],
        expectedResult: 5,
      },

      {
        args: [-5, -5],
        expectedResult: -10,
      },
    ];

    testIOFunction(testCases, (...args) => Calculator.sum(...args));
  });

  describe('Subtraction method', () => {
    const testCases = [
      {
        args: [2, 1],
        expectedResult: 1,
      },

      {
        args: [1, 2],
        expectedResult: -1,
      },

      {
        args: [10, 1, 1, 1, 1],
        expectedResult: 6,
      },

      {
        args: [10, -5],
        expectedResult: 15,
      },

      {
        args: [-5, -5],
        expectedResult: 0,
      },
    ];

    testIOFunction(testCases, (...args) => Calculator.sub(...args));
  });

  describe('Multiplication method', () => {
    const testCases = [
      {
        args: [2, 1],
        expectedResult: 2,
      },

      {
        args: [1, 2],
        expectedResult: 2,
      },

      {
        args: [10, 1, 1, 1, 1],
        expectedResult: 10,
      },

      {
        args: [10, -5],
        expectedResult: -50,
      },

      {
        args: [-5, -5],
        expectedResult: 25,
      },
    ];

    testIOFunction(testCases, (...args) => Calculator.mult(...args));
  });

  describe('Division method', () => {
    it('Should throw when dividing by zero', () => {
      expect(() => Calculator.div(1, 0)).to.throw();
    });

    const testCases = [
      {
        args: [2, 1],
        expectedResult: 2,
      },

      {
        args: [1, 2],
        expectedResult: 0.5,
      },

      {
        args: [10, 1, 1, 1, 1],
        expectedResult: 10,
      },

      {
        args: [10, -5],
        expectedResult: -2,
      },

      {
        args: [-5, -5],
        expectedResult: 1,
      },
    ];

    testIOFunction(testCases, (...args) => Calculator.div(...args));
  });
});
