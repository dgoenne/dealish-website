/* Zitat-Karussell: Pfeile, Punkte, Tastatur, Wischen. Kein externes Skript. */
(function () {
  var wurzel = document.querySelector('.zitat-karussell');
  if (!wurzel) return;

  var fenster = wurzel.querySelector('.zitat-fenster');
  var spur = wurzel.querySelector('.zitat-spur');
  var karten = Array.prototype.slice.call(wurzel.querySelectorAll('.zitat-karte'));
  var punkte = Array.prototype.slice.call(wurzel.querySelectorAll('.zitat-punkt'));
  var zurueck = wurzel.querySelector('.zitat-pfeil-links');
  var weiter = wurzel.querySelector('.zitat-pfeil-rechts');
  var anzahl = karten.length;
  var index = 0;

  function anzeigen(neuerIndex) {
    index = (neuerIndex + anzahl) % anzahl;
    spur.style.transform = 'translateX(-' + (index * 100) + '%)';
    karten.forEach(function (karte, i) {
      karte.setAttribute('aria-hidden', i === index ? 'false' : 'true');
    });
    punkte.forEach(function (punkt, i) {
      punkt.setAttribute('aria-current', i === index ? 'true' : 'false');
    });
  }

  zurueck.addEventListener('click', function () { anzeigen(index - 1); });
  weiter.addEventListener('click', function () { anzeigen(index + 1); });
  punkte.forEach(function (punkt, i) {
    punkt.addEventListener('click', function () { anzeigen(i); });
  });

  fenster.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') { anzeigen(index - 1); e.preventDefault(); }
    if (e.key === 'ArrowRight') { anzeigen(index + 1); e.preventDefault(); }
  });

  var startX = null;
  var startY = null;
  fenster.addEventListener('touchstart', function (e) {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
  }, { passive: true });
  fenster.addEventListener('touchend', function (e) {
    if (startX === null) return;
    var endX = e.changedTouches[0].clientX;
    var endY = e.changedTouches[0].clientY;
    var deltaX = endX - startX;
    var deltaY = endY - startY;
    if (Math.abs(deltaX) > 40 && Math.abs(deltaX) > Math.abs(deltaY)) {
      anzeigen(deltaX < 0 ? index + 1 : index - 1);
    }
    startX = null;
    startY = null;
  });

  anzeigen(0);
})();
