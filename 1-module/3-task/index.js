function ucFirst(str) {
  if(str){
    let firstChar = str[0].toUpperCase();
    let reusltStr = firstChar+str.slice(1);
    return reusltStr;  
  }
  return str;
}
