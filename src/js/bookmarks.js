/* === bookmarks.js === */
(function initBookmarks() {
  var STORAGE_KEY = 'eg-bookmarks';
  var bookmarkBtn = document.getElementById('bookmark-btn');
  var drawer = document.getElementById('bookmarks-drawer');
  var overlay = document.getElementById('bookmarks-overlay');
  var drawerClose = drawer ? drawer.querySelector('.bookmarks-drawer__close') : null;
  var drawerList = document.getElementById('bookmarks-list');

  function getBookmarks() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); }
    catch (e) { return []; }
  }
  function saveBookmarks(items) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }

  function isCurrentPageBookmarked() {
    var bookmarks = getBookmarks();
    return bookmarks.some(function(b) { return b.url === window.location.pathname; });
  }

  function updateBookmarkBtn() {
    if (!bookmarkBtn) return;
    var saved = isCurrentPageBookmarked();
    bookmarkBtn.setAttribute('aria-pressed', saved ? 'true' : 'false');
    bookmarkBtn.innerHTML = (saved ? '&#9733; Bookmarked' : '&#9733; Bookmark This Page');
    bookmarkBtn.classList.toggle('btn--primary', saved);
    bookmarkBtn.classList.toggle('btn--outline', !saved);
  }

  function toggleBookmark() {
    var bookmarks = getBookmarks();
    var url = window.location.pathname;
    var idx = bookmarks.findIndex(function(b) { return b.url === url; });
    if (idx >= 0) {
      bookmarks.splice(idx, 1);
    } else {
      bookmarks.push({
        url: url,
        title: document.title.split(' | ')[0] || document.title,
        niche: document.body.getAttribute('data-niche') || '',
        date: new Date().toISOString(),
      });
    }
    saveBookmarks(bookmarks);
    updateBookmarkBtn();
    renderDrawer();
  }

  function renderDrawer() {
    if (!drawerList) return;
    var bookmarks = getBookmarks();
    if (!bookmarks.length) {
      drawerList.innerHTML = '<p style="color:var(--color-text-muted);font-size:0.875rem;padding:1rem 0">No bookmarks yet. Click the bookmark button on any page to save it.</p>';
      return;
    }

    // Group by niche
    var byNiche = {};
    bookmarks.forEach(function(b) {
      var n = b.niche || 'other';
      if (!byNiche[n]) byNiche[n] = [];
      byNiche[n].push(b);
    });

    var html = '';
    Object.keys(byNiche).forEach(function(niche) {
      html += '<h3 style="font-size:0.75rem;text-transform:uppercase;letter-spacing:0.05em;color:var(--color-text-muted);margin:1rem 0 0.5rem">' +
        niche.replace(/-/g, ' ') + '</h3><ul style="list-style:none;padding:0;margin:0">';
      byNiche[niche].forEach(function(b, i) {
        html += '<li style="display:flex;align-items:center;justify-content:space-between;padding:0.5rem 0;border-bottom:1px solid var(--color-border-light)">' +
          '<a href="' + b.url + '" style="font-size:0.875rem;color:var(--color-text);text-decoration:none;flex:1" onclick="closeDrawer()">' + escHtml(b.title) + '</a>' +
          '<button onclick="removeBookmark(\'' + escAttr(b.url) + '\')" style="font-size:0.75rem;color:var(--color-text-muted);background:none;border:none;cursor:pointer;padding:0.25rem" aria-label="Remove bookmark">&#10005;</button>' +
          '</li>';
      });
      html += '</ul>';
    });

    html += '<button onclick="clearAllBookmarks()" style="margin-top:1rem;font-size:0.75rem;color:var(--color-danger);background:none;border:none;cursor:pointer">Clear all bookmarks</button>';
    drawerList.innerHTML = html;
  }

  function openDrawer() {
    if (!drawer) return;
    drawer.removeAttribute('hidden');
    overlay.removeAttribute('hidden');
    requestAnimationFrame(function() { drawer.classList.add('is-open'); });
    drawer.removeAttribute('aria-hidden');
    overlay.removeAttribute('aria-hidden');
    renderDrawer();
    var firstFocusable = drawer.querySelector('button, a');
    if (firstFocusable) firstFocusable.focus();
  }

  function closeDrawer() {
    if (!drawer) return;
    drawer.classList.remove('is-open');
    drawer.setAttribute('aria-hidden', 'true');
    overlay.setAttribute('aria-hidden', 'true');
    setTimeout(function() {
      drawer.hidden = true;
      overlay.hidden = true;
    }, 250);
  }

  // Make these accessible from inline onclick handlers in rendered HTML
  window.closeDrawer = closeDrawer;
  window.removeBookmark = function(url) {
    var bookmarks = getBookmarks().filter(function(b) { return b.url !== url; });
    saveBookmarks(bookmarks);
    updateBookmarkBtn();
    renderDrawer();
  };
  window.clearAllBookmarks = function() {
    if (confirm('Clear all bookmarks?')) {
      saveBookmarks([]);
      updateBookmarkBtn();
      renderDrawer();
    }
  };

  if (bookmarkBtn) bookmarkBtn.addEventListener('click', toggleBookmark);
  if (drawerClose) drawerClose.addEventListener('click', closeDrawer);
  if (overlay) overlay.addEventListener('click', closeDrawer);

  // ESC key closes drawer
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && drawer && !drawer.hidden) closeDrawer();
  });

  // Check for a "view bookmarks" button elsewhere
  document.querySelectorAll('[data-open-bookmarks]').forEach(function(btn) {
    btn.addEventListener('click', openDrawer);
  });

  updateBookmarkBtn();

  function escHtml(s) { return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
  function escAttr(s) { return String(s).replace(/'/g,"\\'"); }
})();
