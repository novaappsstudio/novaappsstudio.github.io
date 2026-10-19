// Tap a screenshot to view it full screen; arrows, swipe and Esc work too.
(function () {
  var imgs = Array.prototype.slice.call(document.querySelectorAll('.gallery img'));
  if (!imgs.length) return;
  var box = document.createElement('div');
  box.className = 'lightbox';
  box.innerHTML = '<img alt=""><button class="close" aria-label="Close">×</button>' +
    '<button class="prev" aria-label="Previous">‹</button><button class="next" aria-label="Next">›</button>' +
    '<div class="count"></div>';
  document.body.appendChild(box);
  var big = box.querySelector('img'), count = box.querySelector('.count'), i = 0, x0 = null;
  function show(n) {
    i = (n + imgs.length) % imgs.length;
    big.src = imgs[i].src; big.alt = imgs[i].alt;
    count.textContent = (i + 1) + ' / ' + imgs.length;
    box.classList.add('open'); document.body.style.overflow = 'hidden';
  }
  function hide() { box.classList.remove('open'); document.body.style.overflow = ''; }
  imgs.forEach(function (img, n) { img.addEventListener('click', function () { show(n); }); });
  box.querySelector('.close').onclick = hide;
  box.querySelector('.prev').onclick = function (e) { e.stopPropagation(); show(i - 1); };
  box.querySelector('.next').onclick = function (e) { e.stopPropagation(); show(i + 1); };
  box.addEventListener('click', function (e) { if (e.target === box) hide(); });
  document.addEventListener('keydown', function (e) {
    if (!box.classList.contains('open')) return;
    if (e.key === 'Escape') hide();
    if (e.key === 'ArrowLeft') show(i - 1);
    if (e.key === 'ArrowRight') show(i + 1);
  });
  box.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; }, { passive: true });
  box.addEventListener('touchend', function (e) {
    if (x0 === null) return;
    var dx = e.changedTouches[0].clientX - x0; x0 = null;
    if (Math.abs(dx) > 40) show(i + (dx < 0 ? 1 : -1));
  });
})();
