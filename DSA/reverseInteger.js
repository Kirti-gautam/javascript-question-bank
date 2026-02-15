//Ques: https://leetcode.com/problems/reverse-integer/
/**
 * @param {number} x
 * @return {number}
 */
var reverse = function (x) {
  let rev = 0;
  let num = x;
  if (x < 0) {
    num = Math.abs(x);
  }
  while (num != 0) {
    rev = rev * 10 + (num % 10);
    num = Math.floor(num / 10);
  }
  return x < 0 ? -rev : rev;
};
