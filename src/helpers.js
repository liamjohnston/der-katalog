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
//THIS IS THE JSX VERSION OF THE ABOVE FUNCTION.
//Can't use JSX in this file so am using above with dangerouslySetInnerHtml
// renderStars(rating) {
//   let str = [];
//   const whole = Math.floor(rating);
//
//   Array.from(Array(whole), (_, i) => {
//     return str.push(<i className="icon-star" key={i} />);
//   });
//
//   if (!Number.isInteger(rating)) {
//     str.push(<i className="icon-star-half" key={rating} />);
//   }
//
//   return str;
// }
