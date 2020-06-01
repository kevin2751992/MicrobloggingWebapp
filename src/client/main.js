require('./test');

// Add Eventlistener here
document.addEventListener('DOMContentLoaded', function (event) {
  // the event occurred
  console.log('loaded');
  document.getElementById('testButton').addEventListener('click', myFunction);
});

function myFunction () {
  console.log('clicked');
  document.getElementById('testButton').innerHTML = 'YOU CLICKED ME!';
}
