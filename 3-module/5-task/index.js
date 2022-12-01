function getMinMax(str) {
  return str
  .split(" ")
  .filter((item) => !isNaN(item))
  .reduce((prev, item, index) => {
   prev.min = prev.min < +item ? prev.min: +item;
   prev.max = prev.max > +item ? prev.max: +item;
   return prev;
},{});
}
