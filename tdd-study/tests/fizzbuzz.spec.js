import { expect } from 'chai';
import fizzBuzz from '../src/fizzbuzz';

describe('FizzBuzz', () => {
  describe('Smoke tests', () => {
    it('Should be a function', () => {
      expect(fizzBuzz).to.exist;
      expect(fizzBuzz).to.be.a('function');
    });

    it('Should return a value', () => {
      expect(fizzBuzz(1)).not.to.be.undefined;
      expect(fizzBuzz(3)).not.to.be.undefined;
      expect(fizzBuzz(5)).not.to.be.undefined;
      expect(fizzBuzz(15)).not.to.be.undefined;
    });
  });

  describe('Exhaustive tests', () => {
    it('Should return "Fizz" for multiples of 3', () => {
      // Positive cases
      expect(fizzBuzz(3)).to.be.equal('Fizz');
      expect(fizzBuzz(33)).to.be.equal('Fizz');
      expect(fizzBuzz(999)).to.be.equal('Fizz');

      // Negative cases
      expect(fizzBuzz(2)).not.to.be.equal('Fizz');
      expect(fizzBuzz(55)).not.to.be.equal('Fizz');
      expect(fizzBuzz(150)).not.to.be.equal('Fizz');
    });

    it('Should return "Buzz" for multiples of 5', () => {
      // Positive cases
      expect(fizzBuzz(5)).to.be.equal('Buzz');
      expect(fizzBuzz(10)).to.be.equal('Buzz');
      expect(fizzBuzz(100)).to.be.equal('Buzz');

      // Negative cases
      expect(fizzBuzz(2)).not.to.be.equal('Buzz');
      expect(fizzBuzz(33)).not.to.be.equal('Buzz');
      expect(fizzBuzz(150)).not.to.be.equal('Buzz');
    });

    it('Should return "FizzBuzz" for multiples of 3 and 5', () => {
      // Positive cases
      expect(fizzBuzz(15)).to.be.equal('FizzBuzz');
      expect(fizzBuzz(30)).to.be.equal('FizzBuzz');
      expect(fizzBuzz(45)).to.be.equal('FizzBuzz');

      // Negative cases
      expect(fizzBuzz(17)).not.to.be.equal('FizzBuzz');
      expect(fizzBuzz(40)).not.to.be.equal('FizzBuzz');
      expect(fizzBuzz(99)).not.to.be.equal('FizzBuzz');
    });

    it('Should return numbers not divisible by 3 nor 5 as is', () => {
      // Positive cases
      expect(fizzBuzz(2)).to.be.equal(2);
      expect(fizzBuzz(4)).to.be.equal(4);
      expect(fizzBuzz(8)).to.be.equal(8);
      expect(fizzBuzz(16)).to.be.equal(16);

      // Negative cases
      expect(fizzBuzz(3)).not.to.be.equal(3);
      expect(fizzBuzz(5)).not.to.be.equal(5);
      expect(fizzBuzz(15)).not.to.be.equal(15);
    });
  });
});
