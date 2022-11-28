function sumSalary(salaries) {
  let totalSum = 0;
  for(let key in salaries){
    if(Number.isFinite(salaries[key])) totalSum += salaries[key] ;
  }
  return totalSum;
}
