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
// THIS IS THE JSX VERSION OF THE ABOVE FUNCTION.
// Can't use JSX in this file so am using above with dangerouslySetInnerHtml
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

/* change shade of colour, e.g. for making a gradient from a single color */
// "Version 2 Universal B" from:
// https://stackoverflow.com/questions/5560248/programmatically-lighten-or-darken-a-hex-color-or-rgb-and-blend-colors
export function shadeBlend(p, c0, c1) {
  const n = p < 0 ? p * -1 : p;
  const u = Math.round;
  const w = parseInt;
  if (c0.length > 7) {
    const f = c0.split(',');
    const t = (c1 || (p < 0 ? 'rgb(0,0,0)' : 'rgb(255,255,255)')).split(',');
    const R = w(f[0].slice(4));
    const G = w(f[1]);
    const B = w(f[2]);
    return `rgb(${u((w(t[0].slice(4)) - R) * n) + R},${u((w(t[1]) - G) * n) +
      G},${u((w(t[2]) - B) * n) + B})`;
  }
  const f = w(c0.slice(1), 16);
  const t = w((c1 || (p < 0 ? '#000000' : '#FFFFFF')).slice(1), 16);
  const R1 = f >> 16;
  const G1 = (f >> 8) & 0x00ff;
  const B1 = f & 0x0000ff;
  return `#${(
    0x1000000 +
    (u(((t >> 16) - R1) * n) + R1) * 0x10000 +
    (u((((t >> 8) & 0x00ff) - G1) * n) + G1) * 0x100 +
    (u(((t & 0x0000ff) - B1) * n) + B1)
  )
    .toString(16)
    .slice(1)}`;
}
