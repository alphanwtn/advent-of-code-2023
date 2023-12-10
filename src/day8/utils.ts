const calculateLCM = (...arr: number[]) => {
  const gcd2 = (a: number, b: number): number => {
    // Greatest common divisor of 2 integers
    if (!b) return b === 0 ? a : NaN;
    return gcd2(b, a % b);
  };
  const lcm2 = (a: number, b: number): number => {
    // Least common multiple of 2 integers
    return (a * b) / gcd2(a, b);
  };
  // Least common multiple of a list of integers
  let n = 1;
  for (let i = 0; i < arr.length; ++i) {
    n = lcm2(arr[i], n);
  }
  return n;
};

console.log(calculateLCM(20803, 17873, 23147, 15529, 17287, 19631));
