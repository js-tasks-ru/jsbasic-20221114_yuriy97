function getMinMax(str) {
  return {min:+str.split(' ').filter(item =>+item).reduce((prev,next)=>next-prev<0?next:prev), 
    max:+str.split(' ').filter(item =>+item).reduce((prev,next)=>next-prev>0?next:prev )};
}
