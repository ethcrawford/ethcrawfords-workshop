export default function () {
  var x = document.getElementById('myTopnav');
  if (x.className === 'topnav') {
    x.className += 'responseve';
  } else {
    x.className = 'topnav';
  }
  return x;
};
