/* === tabs.js === */
(function initTabs() {
  document.querySelectorAll('[data-tabs]').forEach(function(tabWidget) {
    var tabs = tabWidget.querySelectorAll('[role="tab"]');
    var panels = tabWidget.querySelectorAll('[role="tabpanel"]');

    function activate(tab) {
      tabs.forEach(function(t) {
        t.setAttribute('aria-selected', 'false');
        t.setAttribute('tabindex', '-1');
        t.classList.remove('is-active');
      });
      panels.forEach(function(p) {
        p.hidden = true;
        p.classList.remove('is-active');
      });

      tab.setAttribute('aria-selected', 'true');
      tab.setAttribute('tabindex', '0');
      tab.classList.add('is-active');
      tab.focus();

      var panelId = tab.getAttribute('aria-controls');
      var panel = document.getElementById(panelId);
      if (panel) {
        panel.hidden = false;
        panel.classList.add('is-active');
      }
    }

    tabs.forEach(function(tab) {
      tab.addEventListener('click', function() { activate(this); });
      tab.addEventListener('keydown', function(e) {
        var idx = Array.from(tabs).indexOf(this);
        if (e.key === 'ArrowRight') {
          e.preventDefault();
          activate(tabs[(idx + 1) % tabs.length]);
        } else if (e.key === 'ArrowLeft') {
          e.preventDefault();
          activate(tabs[(idx - 1 + tabs.length) % tabs.length]);
        } else if (e.key === 'Home') {
          e.preventDefault();
          activate(tabs[0]);
        } else if (e.key === 'End') {
          e.preventDefault();
          activate(tabs[tabs.length - 1]);
        }
      });
    });
  });
})();
