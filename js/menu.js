/* Burgermenü: auf jeder Seite gleich (Auftrag Abschnitt 5.1). */
(function () {
  var burger = document.getElementById('burger');
  var menue = document.getElementById('menue');
  var schleier = document.getElementById('schleier');
  if (!burger || !menue || !schleier) return;

  function schalten(auf) {
    burger.classList.toggle('auf', auf);
    menue.classList.toggle('auf', auf);
    schleier.classList.toggle('auf', auf);
    burger.setAttribute('aria-expanded', auf ? 'true' : 'false');
  }

  burger.addEventListener('click', function () { schalten(!menue.classList.contains('auf')); });
  schleier.addEventListener('click', function () { schalten(false); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') schalten(false); });
  menue.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () { schalten(false); });
  });
})();
