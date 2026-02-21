/* === accordion.js === */
(function initAccordions() {
  document.querySelectorAll('[data-accordion]').forEach(function(accordion) {
    var triggers = accordion.querySelectorAll('.accordion__trigger');

    triggers.forEach(function(trigger) {
      trigger.addEventListener('click', function() {
        var expanded = this.getAttribute('aria-expanded') === 'true';
        var panelId = this.getAttribute('aria-controls');
        var panel = document.getElementById(panelId);
        if (!panel) return;

        if (expanded) {
          this.setAttribute('aria-expanded', 'false');
          panel.style.maxHeight = panel.scrollHeight + 'px';
          requestAnimationFrame(function() {
            panel.style.maxHeight = '0';
            panel.addEventListener('transitionend', function handler() {
              panel.hidden = true;
              panel.style.maxHeight = '';
              panel.removeEventListener('transitionend', handler);
            });
          });
        } else {
          panel.hidden = false;
          panel.style.maxHeight = '0';
          panel.style.overflow = 'hidden';
          panel.style.transition = 'max-height 0.3s ease';
          requestAnimationFrame(function() {
            panel.style.maxHeight = panel.scrollHeight + 'px';
            panel.addEventListener('transitionend', function handler() {
              panel.style.maxHeight = '';
              panel.style.overflow = '';
              panel.removeEventListener('transitionend', handler);
            });
          });
          this.setAttribute('aria-expanded', 'true');
        }
      });

      // Keyboard: arrows move between triggers
      trigger.addEventListener('keydown', function(e) {
        var idx = Array.from(triggers).indexOf(this);
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          var next = triggers[idx + 1] || triggers[0];
          next.focus();
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          var prev = triggers[idx - 1] || triggers[triggers.length - 1];
          prev.focus();
        } else if (e.key === 'Home') {
          e.preventDefault();
          triggers[0].focus();
        } else if (e.key === 'End') {
          e.preventDefault();
          triggers[triggers.length - 1].focus();
        }
      });
    });
  });
})();
