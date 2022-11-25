function checkSpam(str) {
  if(!str) return false;
  return (str.toUpperCase().indexOf('1XBET')>-1 || str.toUpperCase().indexOf('XXX')>-1); 
}
