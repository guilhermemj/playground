export default class Calculator {
  sum(...numbers) {
    return numbers.reduce((a, b) => a + b);
  }

  sub(...numbers) {
    return numbers.reduce((a, b) => a - b);
  }

  mult(...numbers) {
    return numbers.reduce((a, b) => a * b);
  }

  div(...numbers) {
    if (numbers.slice(1).includes(0)) {
      throw new RangeError('Division by zero is not allowed!');
    }

    return numbers.reduce((a, b) => a / b);
  }
}
