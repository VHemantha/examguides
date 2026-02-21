/* === search.js === */
(function initSearch() {
  var searchInputs = document.querySelectorAll('.search__input');
  if (!searchInputs.length) return;

  var indexCache = null;
  var fetchPromise = null;

  function fetchIndex() {
    if (indexCache) return Promise.resolve(indexCache);
    if (fetchPromise) return fetchPromise;
    fetchPromise = fetch('/search-index.json')
      .then(function(r) { return r.json(); })
      .then(function(data) { indexCache = data; return data; })
      .catch(function() { return []; });
    return fetchPromise;
  }

  function tokenize(str) {
    return (str || '').toLowerCase().split(/\s+/).filter(function(t) { return t.length > 1; });
  }

  function scoreDoc(doc, queryTokens) {
    var score = 0;
    var titleTokens = tokenize(doc.title);
    var excerptTokens = tokenize(doc.excerpt);
    var tagTokens = (doc.tags || []).map(function(t) { return t.toLowerCase(); });

    queryTokens.forEach(function(q) {
      if (titleTokens.some(function(t) { return t.indexOf(q) !== -1; })) score += 3;
      if (tagTokens.some(function(t) { return t.indexOf(q) !== -1; })) score += 2;
      if (excerptTokens.some(function(t) { return t.indexOf(q) !== -1; })) score += 1;
    });
    return score;
  }

  function search(query, index) {
    if (!query || query.length < 2) return [];
    var tokens = tokenize(query);
    var results = index
      .map(function(doc) { return { doc: doc, score: scoreDoc(doc, tokens) }; })
      .filter(function(r) { return r.score > 0; })
      .sort(function(a, b) { return b.score - a.score; })
      .slice(0, 8)
      .map(function(r) { return r.doc; });
    return results;
  }

  function renderResults(results, resultsEl, query) {
    resultsEl.innerHTML = '';
    if (!results.length) {
      resultsEl.innerHTML = '<div class="search__no-results">No results for "<strong>' + escHtml(query) + '</strong>"</div>';
      resultsEl.hidden = false;
      return;
    }

    var ul = document.createElement('div');
    ul.setAttribute('role', 'listbox');
    results.forEach(function(doc, i) {
      var a = document.createElement('a');
      a.href = doc.url;
      a.className = 'search__result-item';
      a.setAttribute('role', 'option');
      a.setAttribute('id', 'search-result-' + i);
      a.innerHTML = '<div class="search__result-title">' + escHtml(doc.title) + '</div>' +
        (doc.excerpt ? '<div class="search__result-excerpt">' + escHtml(doc.excerpt.slice(0, 100)) + '...</div>' : '') +
        (doc.niche ? '<div class="search__result-niche">' + escHtml(doc.niche.replace(/-/g, ' ')) + '</div>' : '');
      ul.appendChild(a);
    });
    resultsEl.appendChild(ul);
    resultsEl.hidden = false;
  }

  searchInputs.forEach(function(input) {
    var resultsId = input.getAttribute('aria-controls');
    var resultsEl = resultsId ? document.getElementById(resultsId) : input.nextElementSibling;
    if (!resultsEl) return;

    var debounceTimer;
    var selectedIndex = -1;
    var currentResults = [];

    function hideResults() {
      resultsEl.hidden = true;
      input.setAttribute('aria-expanded', 'false');
      selectedIndex = -1;
    }

    function showResults(results, query) {
      currentResults = results;
      renderResults(results, resultsEl, query);
      input.setAttribute('aria-expanded', 'true');
    }

    input.addEventListener('focus', function() {
      fetchIndex(); // prefetch on focus
    });

    input.addEventListener('input', function() {
      var query = this.value.trim();
      clearTimeout(debounceTimer);
      if (query.length < 2) { hideResults(); return; }

      debounceTimer = setTimeout(function() {
        fetchIndex().then(function(index) {
          showResults(search(query, index), query);
        });
      }, 250);
    });

    input.addEventListener('keydown', function(e) {
      var items = resultsEl.querySelectorAll('.search__result-item');
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        selectedIndex = Math.min(selectedIndex + 1, items.length - 1);
        updateSelected(items);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        selectedIndex = Math.max(selectedIndex - 1, -1);
        updateSelected(items);
      } else if (e.key === 'Enter' && selectedIndex >= 0) {
        var item = items[selectedIndex];
        if (item) { e.preventDefault(); window.location.href = item.href; }
      } else if (e.key === 'Escape') {
        hideResults();
        this.blur();
      }
    });

    function updateSelected(items) {
      items.forEach(function(item, i) {
        item.setAttribute('aria-selected', i === selectedIndex ? 'true' : 'false');
        if (i === selectedIndex) {
          item.scrollIntoView({ block: 'nearest' });
          input.setAttribute('aria-activedescendant', item.id || '');
        }
      });
    }

    // Close on click outside
    document.addEventListener('click', function(e) {
      if (!input.contains(e.target) && !resultsEl.contains(e.target)) {
        hideResults();
      }
    });
  });

  function escHtml(s) {
    return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  }
})();
