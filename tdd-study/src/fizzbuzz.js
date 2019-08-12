export default (num) => {
  let str = '';

  if (num % 3 === 0) str += 'Fizz';
  if (num % 5 === 0) str += 'Buzz';

  return str || num;
};
