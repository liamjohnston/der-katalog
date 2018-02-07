export function renderStars(rating) {
  let str = '';
  const whole = Math.floor(rating);

  Array.from(Array(whole), (_, i) => {
    return (str += '<i class="icon-star"></i>');
  });

  if (!Number.isInteger(rating)) {
    return (str += '<i class="icon-star-half"></i>');
  }

  return str;
}
