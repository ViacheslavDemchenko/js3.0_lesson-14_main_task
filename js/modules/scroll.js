"use strict";

function scroll() {
  function animate(draw, duration) {
    var start = performance.now();
    requestAnimationFrame(function animate(time) {
      var timePassed = time - start;

      if (timePassed > duration) {
        timePassed = duration;
      }

      draw(timePassed);

      if (timePassed < duration) {
        requestAnimationFrame(animate);
      }
    });
  }

  ;
  var navigation = document.getElementsByTagName('nav')[0];
  navigation.addEventListener('click', function (event) {
    event.preventDefault();
    animate(function (timePassed) {
      var target = event.target,
          section = document.getElementById(target.getAttribute('href').slice(1));
      window.scrollBy(0, section.getBoundingClientRect().top / 20 - 4);
    }, 1200);
  });
}

module.exports = scroll;