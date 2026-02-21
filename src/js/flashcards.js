/* === flashcards.js === */
(function initFlashcards() {
  document.querySelectorAll('.flashcard-deck').forEach(function(deck) {
    var cards = Array.from(deck.querySelectorAll('.flashcard'));
    if (!cards.length) return;

    var total = cards.length;
    var currentIndex = 0;
    var order = cards.map(function(_, i) { return i; });

    var prevBtn = deck.querySelector('[data-action="prev"]');
    var nextBtn = deck.querySelector('[data-action="next"]');
    var shuffleBtn = deck.querySelector('[data-action="shuffle"]');
    var resetBtn = deck.querySelector('[data-action="reset"]');
    var counterCurrent = deck.querySelector('[data-current]');
    var progressBar = deck.querySelector('.flashcard-progress__bar');

    function showCard(idx) {
      cards.forEach(function(card, i) {
        card.classList.remove('is-active');
        card.classList.remove('is-flipped');
        card.setAttribute('aria-label', 'Flashcard ' + (i + 1) + ' of ' + total + ': click to flip');
      });

      var card = cards[order[idx]];
      card.classList.add('is-active');
      currentIndex = idx;
      updateUI();
    }

    function updateUI() {
      if (counterCurrent) counterCurrent.textContent = currentIndex + 1;

      if (prevBtn) prevBtn.disabled = currentIndex === 0;
      if (nextBtn) nextBtn.disabled = currentIndex === total - 1;

      if (progressBar) {
        var pct = total > 1 ? (currentIndex / (total - 1)) * 100 : 100;
        progressBar.style.width = pct + '%';
        progressBar.setAttribute('aria-valuenow', pct);
      }
    }

    function flipCard(card) {
      card.classList.toggle('is-flipped');
      var flipped = card.classList.contains('is-flipped');
      card.setAttribute('aria-label', 'Flashcard ' + (currentIndex + 1) + ': ' + (flipped ? 'showing answer, click to show question' : 'click to reveal answer'));
    }

    // Card click/keyboard to flip
    cards.forEach(function(card) {
      card.addEventListener('click', function() { flipCard(this); });
      card.addEventListener('keydown', function(e) {
        if (e.key === ' ' || e.key === 'Enter') {
          e.preventDefault();
          flipCard(this);
        } else if (e.key === 'ArrowRight') {
          e.preventDefault();
          if (currentIndex < total - 1) showCard(currentIndex + 1);
        } else if (e.key === 'ArrowLeft') {
          e.preventDefault();
          if (currentIndex > 0) showCard(currentIndex - 1);
        }
      });
    });

    if (prevBtn) prevBtn.addEventListener('click', function() {
      if (currentIndex > 0) showCard(currentIndex - 1);
    });

    if (nextBtn) nextBtn.addEventListener('click', function() {
      if (currentIndex < total - 1) showCard(currentIndex + 1);
    });

    if (shuffleBtn) shuffleBtn.addEventListener('click', function() {
      // Fisher-Yates shuffle
      for (var i = order.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var tmp = order[i]; order[i] = order[j]; order[j] = tmp;
      }
      showCard(0);
    });

    if (resetBtn) resetBtn.addEventListener('click', function() {
      order = cards.map(function(_, i) { return i; });
      showCard(0);
    });

    // Keyboard navigation when deck is focused
    deck.addEventListener('keydown', function(e) {
      if (e.key === 'ArrowRight' && currentIndex < total - 1) {
        e.preventDefault(); showCard(currentIndex + 1);
      } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
        e.preventDefault(); showCard(currentIndex - 1);
      }
    });

    // Initialize
    showCard(0);
  });
})();
