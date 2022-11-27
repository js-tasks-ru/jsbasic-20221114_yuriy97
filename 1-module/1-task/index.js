function factorial(n) {
  if(n === 0) return 1; 
  for(let k = n; k > 1; k--){
    n = n*(k-1);
  }
  return n;
}
