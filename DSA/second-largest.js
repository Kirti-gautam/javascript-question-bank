//characters are compared using their Unicode/ASCII numeric codes.
//When JS compares two characters:
//'5' >= '0'
//it actually compares:
//ASCII('5') >= ASCII('0')
//53 >= 48   → true

// how to check if any character is a digit? -> if(ch >= '0' && ch<-'9')

// Question - Find second largest number in a string

/**
 * @param {string} s
 * @return {number}
 */
var secondHighest = function (s) {
  let max = -1;
  let seclar = -1;
  for (let ch of s) {
    if (ch >= "0" && ch <= "9") {
      const i = Number(ch);
      if (max < i) {
        seclar = max;
        max = i;
      } else if (i < max && i > seclar) {
        seclar = i;
      }
    }
  }
  return seclar;
};
