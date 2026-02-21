/* === progress.js === */
(function initProgress() {
  // ── Scroll progress bar ───────────────────────────────────────────────────
  var progressBar = document.querySelector('.scroll-progress');
  if (progressBar) {
    var ticking = false;
    window.addEventListener('scroll', function() {
      if (!ticking) {
        requestAnimationFrame(function() {
          var scrolled = window.scrollY;
          var docHeight = document.documentElement.scrollHeight - window.innerHeight;
          var pct = docHeight > 0 ? Math.min((scrolled / docHeight) * 100, 100) : 0;
          progressBar.style.width = pct + '%';
          progressBar.setAttribute('aria-valuenow', Math.round(pct));
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  // ── TOC active link highlight ─────────────────────────────────────────────
  var tocLinks = document.querySelectorAll('.toc__link');
  if (!tocLinks.length) return;

  var headingIds = Array.from(tocLinks).map(function(link) {
    return link.getAttribute('href').replace('#', '');
  });

  var headingEls = headingIds.map(function(id) {
    return document.getElementById(id);
  }).filter(Boolean);

  if (!headingEls.length) return;

  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        var id = entry.target.id;
        tocLinks.forEach(function(link) {
          var isActive = link.getAttribute('href') === '#' + id;
          link.classList.toggle('is-active', isActive);
        });
      }
    });
  }, {
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0,
  });

  headingEls.forEach(function(el) { observer.observe(el); });
})();
