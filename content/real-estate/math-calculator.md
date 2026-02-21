---
title: "Real Estate Exam Math: Formulas, Calculator & Practice Problems"
description: "Complete real estate math guide with built-in calculator. Commission, prorations, LTV, mortgage payments, cap rate, GRM, and 15 worked examples for the license exam."
layout: article
niche: real-estate
date: 2026-01-15
tags: [real estate math, real estate exam calculator, commission calculations, proration, cap rate, GRM]
difficulty: beginner
tools: [calculator]
related:
  - /real-estate/
  - /real-estate/study-guide/
priority: 0.8
---

Real estate math accounts for 8–12% of the national exam. This guide covers every formula you need, with a built-in calculator to practice.

## Built-in Real Estate Calculator

<div id="re-calculator" class="calculator">
  <h2>Real Estate Mortgage Calculator</h2>
  <form class="calculator__form" onsubmit="return false">
    <div class="form-row">
      <div class="form-group">
        <label for="re-price">Purchase Price ($)</label>
        <input type="number" id="re-price" value="350000" min="0" step="1000">
      </div>
      <div class="form-group">
        <label for="re-down">Down Payment (%)</label>
        <input type="number" id="re-down" value="20" min="0" max="100" step="0.5">
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label for="re-rate">Interest Rate (% annual)</label>
        <input type="number" id="re-rate" value="7.0" min="0" max="30" step="0.125">
      </div>
      <div class="form-group">
        <label for="re-term">Loan Term (years)</label>
        <input type="number" id="re-term" value="30" min="1" max="40">
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label for="re-tax">Property Tax Rate (% annual)</label>
        <input type="number" id="re-tax" value="1.2" min="0" max="5" step="0.1">
      </div>
      <div class="form-group">
        <label for="re-insurance">Annual Insurance ($)</label>
        <input type="number" id="re-insurance" value="1800" min="0" step="100">
      </div>
    </div>
    <button type="submit" class="btn btn--primary" data-action="calculate">Calculate</button>
  </form>
  <div class="calculator__result" hidden></div>
</div>

## Real Estate Math Formula Sheet

### Commission Calculations

**Basic Commission:**
```
Commission = Sale Price × Commission Rate
```
**Example:** $325,000 × 6% = $19,500 commission

**Commission Split (Listing vs. Selling Broker):**
```
Each broker share = Total Commission ÷ 2
Agent share = Broker share × Agent Split %
```
**Example:** $19,500 ÷ 2 = $9,750 per broker. If agent is on 70/30 split: $9,750 × 70% = $6,825 to agent.

**Finding Sale Price from Commission:**
```
Sale Price = Commission Amount ÷ Commission Rate
```
**Example:** Agent earned $12,000 at 6%. Sale price = $12,000 ÷ 0.06 = $200,000.

---

### Prorations (Closing Day Calculations)

Prorations divide annual expenses between buyer and seller based on the closing date:

**Proration Formula:**
```
Daily Rate = Annual Amount ÷ 365 (or 360 for banker's year)
Seller's Days = Days from Jan 1 to Closing Day
Buyer's Days = 365 - Seller's Days
```

**Property Tax Proration Example:**
- Annual taxes: $3,600
- Closing: March 15 (74 days from Jan 1)
- Daily rate: $3,600 ÷ 360 = $10/day
- Seller owes: 74 days × $10 = $740 → credit to buyer

```callout type="tip"
**30-Day Month Method (most common):** Many real estate exam problems use a 360-day year with 30-day months. January has 30 days, February has 30 days, etc. Always check what the problem says.
```

---

### Loan-to-Value (LTV) Ratio

```
LTV = Loan Amount ÷ Appraised Value × 100
```

**Example:** $240,000 loan on a $300,000 home = $240,000 ÷ $300,000 = 0.80 = **80% LTV**

**PMI Threshold:** Conventional loans with LTV > 80% typically require PMI (Private Mortgage Insurance).

---

### Debt-to-Income (DTI) Ratios

**Front-End Ratio (Housing Ratio):**
```
Front-End DTI = Monthly PITI ÷ Gross Monthly Income
Guideline: ≤ 28%
```

**Back-End Ratio (Total DTI):**
```
Back-End DTI = Total Monthly Debt ÷ Gross Monthly Income
Guideline: ≤ 36–45% (varies by loan type)
```

**Example:** Gross monthly income = $6,000. PITI = $1,400. Car payment = $350. Student loan = $200.
- Front-end DTI = $1,400 ÷ $6,000 = 23.3% ✓
- Back-end DTI = ($1,400 + $350 + $200) ÷ $6,000 = $1,950 ÷ $6,000 = 32.5% ✓

---

### Appreciation & Depreciation

**Appreciation:**
```
Future Value = Present Value × (1 + Annual Rate)^Years
Percent Change = (New Value - Old Value) ÷ Old Value × 100
```

**Example:** Home bought for $250,000 appreciated 4% per year for 5 years:
$250,000 × (1.04)^5 = $250,000 × 1.2167 = **$304,163**

**Straight-Line Depreciation (Investment Property):**
```
Annual Depreciation = Cost Basis ÷ Useful Life
Residential: 27.5 years | Commercial: 39 years
```
**Example:** $275,000 building (land excluded) ÷ 27.5 = **$10,000/year depreciation**

---

### Income Property Calculations

**Gross Rent Multiplier (GRM):**
```
GRM = Sale Price ÷ Gross Annual Rents
OR
Sale Price = GRM × Gross Annual Rents
```

**Example:** Property sells for $540,000. Annual rents = $60,000. GRM = $540,000 ÷ $60,000 = **9**

**Net Operating Income (NOI):**
```
NOI = Gross Potential Income
    - Vacancy & Collection Loss
    = Effective Gross Income
    - Operating Expenses
    = NOI
```
*Note: Do NOT subtract mortgage payments — they are NOT an operating expense.*

**Capitalization Rate (Cap Rate):**
```
Cap Rate = NOI ÷ Value
Value = NOI ÷ Cap Rate
NOI = Value × Cap Rate
```

**Example:** Property has $48,000 NOI. Similar properties sell at an 8% cap rate:
Value = $48,000 ÷ 0.08 = **$600,000**

---

### Transfer Taxes

Transfer (conveyance) taxes are levied when property changes hands. Most states charge per $500 or $1,000 of sale price:

**Formula:**
```
Transfer Tax = (Sale Price ÷ Unit Value) × Tax Rate per Unit
```

**Example:** Sale price $285,000. State charges $1.10 per $500.
$285,000 ÷ $500 = 570 units × $1.10 = **$627 transfer tax**

---

## 15 Practice Problems

```accordion
## Problem 1: Commission Split
A home sells for $420,000 with a 6% total commission split 50/50 between the listing and selling office. The selling agent has a 65/35 split with their broker (agent gets 65%). How much does the selling agent earn?

**Solution:**
- Total commission: $420,000 × 6% = $25,200
- Selling office share: $25,200 ÷ 2 = $12,600
- Agent's share: $12,600 × 65% = **$8,190**

## Problem 2: Finding Sale Price
A listing agent earned $7,800 on a sale representing her 3% side of a 6% commission. What did the home sell for?

**Solution:**
- Agent's commission = seller side commission only
- Sale price × 3% = $7,800
- Sale price = $7,800 ÷ 0.03 = **$260,000**

## Problem 3: Property Tax Proration
Closing is June 15. Annual property taxes are $4,800. Using a 360-day banker's year (30-day months), how much does the seller owe the buyer as a proration credit?

**Solution:**
- Daily rate: $4,800 ÷ 360 = $13.33/day
- Days Jan 1 through June 15: Jan(30) + Feb(30) + Mar(30) + Apr(30) + May(30) + 15 = 165 days
- Seller's portion: 165 × $13.33 = **$2,200** (credit to buyer)

## Problem 4: Loan-to-Value
A buyer purchases a $380,000 home and makes a 15% down payment. What is the LTV and will PMI be required?

**Solution:**
- Down payment: $380,000 × 15% = $57,000
- Loan amount: $380,000 - $57,000 = $323,000
- LTV: $323,000 ÷ $380,000 = 0.85 = **85% LTV**
- **Yes, PMI is required** (LTV > 80%)

## Problem 5: NOI and Cap Rate
An apartment building has 10 units at $1,200/month each. Vacancy is 5%. Annual operating expenses total $42,000. What is the NOI and what would this property sell for at a 7% cap rate?

**Solution:**
- Gross potential income: 10 × $1,200 × 12 = $144,000
- Vacancy loss: $144,000 × 5% = $7,200
- Effective gross income: $144,000 - $7,200 = $136,800
- NOI: $136,800 - $42,000 = **$94,800**
- Value at 7% cap: $94,800 ÷ 0.07 = **$1,354,286**

## Problem 6: Depreciation
An investor purchases a residential rental property for $420,000. The land is assessed at $70,000. How much can the investor deduct annually for depreciation?

**Solution:**
- Building value (depreciable basis): $420,000 - $70,000 = $350,000
- Useful life for residential rental: 27.5 years
- Annual depreciation: $350,000 ÷ 27.5 = **$12,727/year**

## Problem 7: DTI Qualification
A buyer has gross monthly income of $7,500. They have $450/month in car payments and $200/month in student loans. The home they want has monthly PITI of $1,800. Do they qualify under standard 28/36 guidelines?

**Solution:**
- Front-end DTI: $1,800 ÷ $7,500 = 24% ✓ (≤ 28%)
- Back-end DTI: ($1,800 + $450 + $200) ÷ $7,500 = $2,450 ÷ $7,500 = 32.7% ✓ (≤ 36%)
- **Yes, they qualify** under both ratios.

## Problem 8: Appreciation
A home purchased in 2020 for $280,000 appreciated at 6% per year for 5 years. What is its value in 2025?

**Solution:**
- $280,000 × (1.06)^5 = $280,000 × 1.3382 = **$374,706**

## Problem 9: Transfer Tax
A property sells for $465,000 in a state that charges $2.00 per $500 of sale price (or fraction thereof). What is the transfer tax?

**Solution:**
- $465,000 ÷ $500 = 930 units (exactly, no fraction)
- Transfer tax: 930 × $2.00 = **$1,860**

## Problem 10: GRM Analysis
Two comparable buildings are for sale. Building A: price $600,000, annual rents $75,000. Building B: price $550,000, annual rents $65,000. Which is the better value by GRM?

**Solution:**
- Building A GRM: $600,000 ÷ $75,000 = **8.0**
- Building B GRM: $550,000 ÷ $65,000 = **8.46**
- **Building A** is the better value (lower GRM = paying less per dollar of rent)
```

```callout type="tip"
**Print this page** (use the print button above) to create a clean, ad-free formula reference sheet for exam day review. Or bookmark it for quick mobile access.
```
