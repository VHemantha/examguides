/* === calculators.js === */
(function initCalculators() {

  // ── Real Estate Calculator ────────────────────────────────────────────────
  var reCalc = document.getElementById('re-calculator');
  if (reCalc) {
    var reForm = reCalc.querySelector('.calculator__form');
    var reResult = reCalc.querySelector('.calculator__result');

    function formatCurrency(n) {
      return '$' + Number(n).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }
    function formatPct(n) { return (n * 100).toFixed(2) + '%'; }
    function getVal(id, def) { var el = document.getElementById(id); return el ? (parseFloat(el.value) || def || 0) : (def || 0); }

    function calculateRE() {
      var price     = getVal('re-price', 300000);
      var downPct   = getVal('re-down', 20) / 100;
      var rate      = getVal('re-rate', 7) / 100 / 12;
      var termYears = getVal('re-term', 30);
      var taxRate   = getVal('re-tax', 1.2) / 100;
      var insurance = getVal('re-insurance', 1500);

      var downAmt   = price * downPct;
      var principal = price - downAmt;
      var n         = termYears * 12;
      var ltv       = principal / price;

      var monthlyPI = rate > 0
        ? principal * (rate * Math.pow(1 + rate, n)) / (Math.pow(1 + rate, n) - 1)
        : principal / n;

      var monthlyTax = (price * taxRate) / 12;
      var monthlyIns = insurance / 12;
      var monthlyPITI = monthlyPI + monthlyTax + monthlyIns;
      var totalInterest = (monthlyPI * n) - principal;
      var reqIncome = (monthlyPITI / 0.28);

      if (!reResult) return;
      reResult.innerHTML = '<h3>Results</h3><div class="result-grid">' +
        resultItem('Monthly P&I', formatCurrency(monthlyPI), 'Principal + Interest') +
        resultItem('Monthly PITI', formatCurrency(monthlyPITI), 'With tax & insurance') +
        resultItem('Down Payment', formatCurrency(downAmt), formatPct(downPct) + ' down') +
        resultItem('Total Interest', formatCurrency(totalInterest), 'Over ' + termYears + ' years') +
        resultItem('LTV Ratio', formatPct(ltv), ltv > 0.8 ? '⚠ PMI likely' : '✓ No PMI') +
        resultItem('Required Income', formatCurrency(reqIncome * 12) + '/yr', '28% front-end rule') +
        '</div>';
      reResult.hidden = false;
    }

    if (reForm) reForm.addEventListener('input', calculateRE);
    var calcBtn = reCalc.querySelector('[data-action="calculate"]');
    if (calcBtn) calcBtn.addEventListener('click', function(e) { e.preventDefault(); calculateRE(); });
    // Auto-calculate on load
    calculateRE();
  }

  // ── HVAC Load Calculator ──────────────────────────────────────────────────
  var hvacCalc = document.getElementById('hvac-calculator');
  if (hvacCalc) {
    var hvacForm = hvacCalc.querySelector('.calculator__form');
    var hvacResult = hvacCalc.querySelector('.calculator__result');

    // BTU/hr per sq ft cooling factors by climate zone (simplified Manual J)
    var climateFactors = {
      '1': { cool: 20, heat: 30, label: 'Very Hot (Zone 1)' },
      '2': { cool: 22, heat: 35, label: 'Hot (Zone 2)' },
      '3': { cool: 25, heat: 45, label: 'Warm (Zone 3)' },
      '4': { cool: 28, heat: 55, label: 'Mixed (Zone 4)' },
      '5': { cool: 30, heat: 65, label: 'Cool (Zone 5)' },
      '6': { cool: 32, heat: 75, label: 'Cold (Zone 6)' },
      '7': { cool: 35, heat: 85, label: 'Very Cold (Zone 7)' },
    };

    // Insulation multipliers
    var insulMult = { poor: 1.25, average: 1.0, good: 0.85, excellent: 0.70 };

    function getHvacVal(id, def) { var el = document.getElementById(id); return el ? (parseFloat(el.value) || def || 0) : (def || 0); }
    function getHvacSelect(id, def) { var el = document.getElementById(id); return el ? (el.value || def) : def; }

    function calculateHVAC() {
      var area      = getHvacVal('hvac-area', 1500);
      var ceiling   = getHvacVal('hvac-ceiling', 9);
      var zone      = getHvacSelect('hvac-zone', '4');
      var insul     = getHvacSelect('hvac-insulation', 'average');
      var windows   = getHvacVal('hvac-windows', 150);
      var occupants = getHvacVal('hvac-occupants', 4);

      var cf = climateFactors[zone] || climateFactors['4'];
      var im = insulMult[insul] || 1.0;

      // Base cooling load
      var baseCool = area * cf.cool;
      // Ceiling height adjustment (standard is 8ft)
      var heightAdj = ceiling / 8;
      // Window adjustment (windows add ~870 BTU/hr per sq ft in sun)
      var windowAdj = windows * 40;
      // Occupant heat gain (~250 BTU/hr per person)
      var occupantAdj = occupants * 250;

      var totalCoolBtu = (baseCool * heightAdj * im) + windowAdj + occupantAdj;
      var totalCoolTons = totalCoolBtu / 12000;

      // Heating load
      var baseHeat = area * cf.heat * heightAdj * im;
      var totalHeatBtu = baseHeat;

      var eer = 12; // average EER
      var seer = 16; // average SEER
      var annualKwh = (totalCoolBtu * 1000) / (seer * 1000); // rough annual kWh

      if (!hvacResult) return;
      hvacResult.innerHTML = '<h3>HVAC Load Estimate</h3>' +
        '<p style="font-size:0.875rem;color:var(--color-text-muted);margin-bottom:1rem">Based on simplified Manual J calculations for ' + cf.label + '</p>' +
        '<div class="result-grid">' +
        resultItem('Cooling Load', Math.round(totalCoolBtu).toLocaleString() + ' BTU/hr', 'Total cooling requirement') +
        resultItem('AC Tonnage', totalCoolTons.toFixed(1) + ' tons', 'Round up to nearest half ton') +
        resultItem('Heating Load', Math.round(totalHeatBtu).toLocaleString() + ' BTU/hr', 'Heating requirement') +
        resultItem('Est. Annual kWh', Math.round(annualKwh).toLocaleString() + ' kWh', 'Cooling season estimate') +
        '</div>' +
        '<p style="font-size:0.75rem;color:var(--color-text-muted);margin-top:1rem">⚠ This is a simplified estimate. Always perform a full Manual J calculation before equipment selection.</p>';
      hvacResult.hidden = false;
    }

    if (hvacForm) hvacForm.addEventListener('input', calculateHVAC);
    var hvacBtn = hvacCalc.querySelector('[data-action="calculate"]');
    if (hvacBtn) hvacBtn.addEventListener('click', function(e) { e.preventDefault(); calculateHVAC(); });
    calculateHVAC();
  }

  // ── Helper ────────────────────────────────────────────────────────────────
  function resultItem(label, value, sub) {
    return '<div class="result-item">' +
      '<div class="result-item__label">' + label + '</div>' +
      '<div class="result-item__value">' + value + '</div>' +
      (sub ? '<div class="result-item__sub">' + sub + '</div>' : '') +
      '</div>';
  }

})();
