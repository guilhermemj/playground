import { expect } from 'chai';

import Calculator from '../src/calculator';

const testIOFunction = (testCases, testFn) => {
  testCases.forEach(({ args, expectedResult }) => {
    const testTitle = `Should return "${expectedResult}" when called with (${args.join(', ')})`;

    it(testTitle, function () {
      const result = testFn(...args);

      expect(result).to.be.equal(expectedResult);
    });
  });
};

describe('Calculator', function () {
  let calc;

  beforeEach(function () {
    calc = new Calculator();
  });

  afterEach(function () {
    calc = null;
  });

  describe('Smoke tests', function () {
    it('Should create an instance', function () {
      expect(calc).to.exist;
      expect(calc).to.be.a('object');
    });

    it('Should define a "sum" method', function () {
      expect(calc.sum).to.exist;
      expect(calc.sum).to.be.a('function');
    });

    it('Should define a "sub" method', function () {
      expect(calc.sub).to.exist;
      expect(calc.sub).to.be.a('function');
    });

    it('Should define a "mult" method', function () {
      expect(calc.mult).to.exist;
      expect(calc.mult).to.be.a('function');
    });

    it('Should define a "div" method', function () {
      expect(calc.div).to.exist;
      expect(calc.div).to.be.a('function');
    });
  });

  describe('Sum method', function () {
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

    testIOFunction(testCases, (...args) => calc.sum(...args));
  });

  describe('Subtraction method', function () {
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

    testIOFunction(testCases, (...args) => calc.sub(...args));
  });

  describe('Multiplication method', function () {
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

    testIOFunction(testCases, (...args) => calc.mult(...args));
  });

  describe('Division method', function () {
    it('Should throw when dividing by zero', function () {
      expect(() => calc.div(1, 0)).to.throw();
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

    testIOFunction(testCases, (...args) => calc.div(...args));
  });
});
