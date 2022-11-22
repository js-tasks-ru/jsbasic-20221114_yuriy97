function checkSpam(str) {
  if(!str) return false;
  str = str.toUpperCase();
  if(str.indexOf('1XBET')>-1 || str.indexOf('XXX')>-1 ){
    return true;
  }
  return false;
}
