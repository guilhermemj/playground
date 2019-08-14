export default class Calculator {
  static sum(...numbers) {
    return numbers.reduce((a, b) => a + b);
  }

  static sub(...numbers) {
    return numbers.reduce((a, b) => a - b);
  }

  static mult(...numbers) {
    return numbers.reduce((a, b) => a * b);
  }

  static div(...numbers) {
    if (numbers.slice(1).includes(0)) {
      throw new RangeError('Division by zero is not allowed!');
    }

    return numbers.reduce((a, b) => a / b);
  }
}
