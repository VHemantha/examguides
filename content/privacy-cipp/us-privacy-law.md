---
title: "US Privacy Law for the CIPP/US Exam: CCPA, HIPAA, GLBA, COPPA & FTC"
description: "Complete US privacy law guide for the CIPP/US exam. CCPA/CPRA, HIPAA Privacy & Security Rules, GLBA, COPPA, and FTC Section 5 explained with comparison tables."
layout: article
niche: privacy-cipp
date: 2026-01-15
tags: [CIPP/US, US privacy law, CCPA, HIPAA, GLBA, COPPA, FTC Section 5, state privacy laws]
difficulty: intermediate
tools: [flashcards]
related:
  - /privacy-cipp/
  - /privacy-cipp/practice-questions/
priority: 0.8
---

This guide covers the core U.S. federal and state privacy laws tested on the CIPP/US exam. Each section breaks down scope, key provisions, consumer/individual rights, and enforcement.

## CCPA / CPRA (California Consumer Privacy Act)

The **California Consumer Privacy Act (CCPA)**, significantly amended by the **California Privacy Rights Act (CPRA)** in 2023, is the most comprehensive U.S. state privacy law and a major exam focus.

### Who Must Comply (Covered Businesses)

A for-profit business that collects California consumers' personal information AND meets **any one** of these thresholds:

| Threshold | 2026 Standard |
|---|---|
| Annual gross revenues | Over $25 million |
| PI of consumers/households/devices | Buys/sells/receives/shares for commercial purposes the PI of 100,000+ consumers or households |
| Revenue from selling/sharing PI | Derives 50%+ of annual revenues from selling or sharing consumers' PI |

**Non-profits and government agencies** are NOT covered businesses under CCPA/CPRA (note: some exemptions apply to data regulated by other laws like HIPAA or GLBA).

### Consumer Rights Under CCPA/CPRA

| Right | Description | Response Time |
|---|---|---|
| **Right to Know** | What categories/specific PI collected, sources, purposes, third parties | 45 days (extendable 45 more) |
| **Right to Access** | Receive a copy of specific PI collected | 45 days |
| **Right to Delete** | Request deletion of PI (exceptions apply) | 45 days |
| **Right to Correct** | Correct inaccurate PI (added by CPRA) | 45 days |
| **Right to Opt-Out of Sale/Sharing** | Stop selling or sharing PI to third parties | Immediate |
| **Right to Limit Sensitive PI Use** | Limit use of sensitive PI to necessary purposes | Immediate |
| **Right to Non-Discrimination** | Cannot penalize for exercising rights | N/A |
| **Right to Data Portability** | Receive PI in portable format | 45 days |

### Sensitive Personal Information Categories (CPRA)

CPRA added a special category of **sensitive personal information** (SPI) with stricter requirements:
- Social security / driver's license / passport numbers
- Financial account credentials
- Precise geolocation data (within 1/4 mile)
- Racial or ethnic origin
- Religious or philosophical beliefs
- Union membership
- Contents of mail, email, text messages
- Genetic data
- Biometric data for identification
- Health information
- Sex life or sexual orientation

Consumers may **limit the use and disclosure** of SPI (not just opt-out of sale).

### Enforcement

- **CPPA (California Privacy Protection Agency):** Created by CPRA; dedicated privacy enforcement agency (first in the US)
- **California AG:** Also retains enforcement authority
- **Fines:** Up to $2,500 per unintentional violation; up to $7,500 per intentional violation or any violation involving minors
- **Private right of action:** Limited to data breach situations — consumers may sue for $100–$750 per incident or actual damages (whichever greater)

### CCPA "Sale" vs. "Sharing"

```callout type="important"
**Key Distinction:** The CPRA added "sharing" as separate from "sale." Sharing means disclosing PI to a third party for cross-context behavioral advertising — even if no money changes hands. This means businesses cannot use "we don't sell data" as a defense if they share data for targeted advertising.
```

---

## HIPAA (Health Insurance Portability and Accountability Act)

HIPAA establishes national standards for the protection of **Protected Health Information (PHI)**.

### Covered Entities

HIPAA applies to **Covered Entities (CEs)**:
1. **Health plans** — insurance companies, HMOs, employer-sponsored health plans
2. **Health care providers** — hospitals, doctors, pharmacies, dentists (those who transmit health info electronically)
3. **Health care clearinghouses** — process nonstandard health info into standardized formats

### Business Associates

A **Business Associate (BA)** performs functions on behalf of a CE that involve creating, receiving, maintaining, or transmitting PHI. Examples: billing companies, IT vendors, cloud storage for medical records, legal firms handling PHI.

- CEs must have a **Business Associate Agreement (BAA)** with all BAs
- BAs are directly subject to HIPAA Security Rule and certain Privacy Rule provisions
- BAs are liable for their own violations

### HIPAA Privacy Rule (45 CFR Part 164)

**Protected Health Information (PHI):** Individually identifiable health information in any medium (oral, written, electronic) relating to past, present, or future health/treatment/payment.

**18 HIPAA Identifiers** (any one makes data PHI):
Names, Geographic data (smaller than state), Dates (other than year), Phone numbers, Fax numbers, Email, SSN, MRN, Health plan beneficiary numbers, Account numbers, Certificate/license numbers, Vehicle identifiers, Device identifiers, Web URLs, IP addresses, Biometrics, Full-face photos, Any unique identifier

**Minimum Necessary Standard:** CEs must make reasonable efforts to limit PHI access and disclosures to the minimum necessary to accomplish the intended purpose. This does NOT apply to treatment disclosures between providers.

**Permitted Disclosures (no authorization required):**
- Treatment, payment, and healthcare operations (TPO)
- Individuals requesting their own PHI
- Facility directories (limited)
- Public health reporting
- Law enforcement (limited, under court order or specific conditions)
- Judicial and administrative proceedings (with court order)

**Individual Rights Under HIPAA Privacy Rule:**
- Right to access their PHI (must respond within 30 days)
- Right to request amendment
- Right to accounting of disclosures
- Right to request restrictions
- Right to request confidential communications
- Right to receive Notice of Privacy Practices (NPP)

### HIPAA Security Rule (45 CFR Part 164.300–318)

Applies ONLY to **electronic PHI (ePHI)**. Three categories of safeguards:

| Category | Examples |
|---|---|
| **Administrative Safeguards** | Security management process, risk analysis, workforce training, contingency plan, BA agreements |
| **Physical Safeguards** | Facility access controls, workstation use policies, device and media controls |
| **Technical Safeguards** | Access controls (unique user IDs), audit controls, integrity controls, transmission security (encryption) |

**Required vs. Addressable:**
- **Required:** Must implement (no wiggle room)
- **Addressable:** Must implement OR document why not and implement equivalent alternative

### HIPAA Breach Notification Rule

A **breach** is impermissible acquisition, access, use, or disclosure of unsecured PHI that compromises security or privacy. Key notification requirements:

| Notification | Timeline |
|---|---|
| **Individuals affected** | Within 60 days of discovering breach |
| **HHS Secretary** | Within 60 days (large breaches); Annual report (small breaches) |
| **Media** (if 500+ residents in state/jurisdiction) | Within 60 days |

**Safe Harbor:** Breaches of **encrypted PHI** are exempt from notification if the encryption meets NIST standards. This is a major incentive for encryption.

---

## GLBA (Gramm-Leach-Bliley Act)

GLBA applies to **financial institutions** — broadly defined as companies significantly engaged in financial activities.

### Who Is Covered

Financial institutions under GLBA include banks, mortgage companies, credit unions, securities brokers, insurance companies, tax preparers, financial advisors, and auto dealers that arrange financing.

### Three Core Rules

```tabs
## Privacy Rule
**Requires financial institutions to:**
- Provide customers with a **Notice of Privacy Practices** at account opening and annually
- Describe information sharing practices with third parties
- Give customers the right to **opt out** of sharing with non-affiliated third parties (in most cases)
- Not share customers' non-public personal information (NPPI) with non-affiliates unless given notice/opt-out opportunity

**Opt-Out Exceptions (no opt-out required):**
- Sharing with affiliates (related companies)
- Service provider sharing under contract
- Required disclosures by law
- Marketing of own products to existing customers

## Safeguards Rule (Updated 2023)
**FTC's Safeguards Rule** (significantly updated May 2023) requires financial institutions to implement a comprehensive information security program with specific elements:

- **Written information security program** with designated qualified individual
- **Risk assessment** identifying reasonably foreseeable threats
- **Technical safeguards:** Encryption of customer information at rest and in transit; MFA for all systems with customer information; penetration testing; vulnerability assessments
- **Incident response plan**
- **Annual reporting** to board of directors

**Applicability threshold change (2023):** Applies to all financial institutions, with some exceptions for small firms with fewer than 5,000 customer records.

## Pretexting Protection
GLBA prohibits obtaining customer information through **pretexting** — using false pretenses to obtain personal financial information. This includes impersonating a bank employee, government official, or the customer to obtain account information from the financial institution.
```

---

## COPPA (Children's Online Privacy Protection Act)

COPPA regulates the online collection of personal information from **children under 13**.

### Who Must Comply

- Operators of websites and online services **directed to children under 13**
- Operators of **general audience sites** who have **actual knowledge** they are collecting PI from children under 13
- Mobile apps, connected toys, smart devices directed to children

### Key Requirements

**Verifiable Parental Consent (VPC)** must be obtained BEFORE collecting, using, or disclosing personal information from children under 13.

| VPC Method | Description |
|---|---|
| Signed consent form (electronic or paper) | Parent submits scanned form |
| Credit card verification | Small transaction proves adult |
| Video conference with trained operator | Real-time identity verification |
| Government-issued photo ID | Verified against government database |
| Knowledge-based authentication | Questions only adult could answer |

**Permitted Without Consent (Support for Internal Operations):**
Limited data collection for: responding to a one-time request, supporting the internal operations of the website (no tracking, no behavioral advertising), required by law.

**Privacy Notice Requirements:**
Operators must have a clearly written, comprehensive privacy notice that includes:
- What information is collected from children
- How it is used
- Disclosure policies
- Parent's right to review, delete, and refuse further collection

**Parental Rights:**
- Review PI collected from their child
- Request deletion
- Opt-out of future collection
- Must not condition participation on providing more PI than necessary

**COPPA Enforcement:**
- FTC enforcement only (no private right of action)
- Civil penalties up to $51,744 per violation (2024 rate)
- Notable cases: YouTube/Google ($170M), TikTok ($5.7M)

---

## FTC Act Section 5: Unfair and Deceptive Practices

The **Federal Trade Commission Act Section 5** prohibits "unfair or deceptive acts or practices in or affecting commerce." The FTC uses this broad authority to enforce privacy and data security even where no specific privacy law exists.

### Deceptive Practices

A practice is **deceptive** if:
1. There is a representation, omission, or practice
2. That is likely to mislead consumers acting reasonably
3. That is material to consumers' decisions

**Privacy deception examples:**
- Stating "we don't sell your data" while selling to data brokers
- Claiming "bank-level security" for a basic site with no real security
- Privacy policy says data won't be shared, but it is shared
- Changing privacy policy retroactively without notice

### Unfair Practices

A practice is **unfair** if it:
1. Causes or is likely to cause substantial injury to consumers
2. Is not reasonably avoidable by consumers
3. Is not outweighed by countervailing benefits to consumers or competition

**Data security unfairness examples:**
- Collecting sensitive data (SSNs, financial info) without reasonable security
- Failing to patch known vulnerabilities that expose consumer data
- Storing passwords in plaintext

### FTC Enforcement Tools

- **Administrative complaints** and consent orders (most common)
- **Civil penalties** for violations of consent orders or specific statutes
- **Injunctive relief** to stop unfair/deceptive practices
- **Section 6(b) orders** to compel information disclosure for studies

---

## State Privacy Law Comparison Table (2026)

| Feature | CCPA/CPRA (CA) | Virginia CDPA | Colorado CPA | Connecticut CTDPA | Texas TDPSA |
|---|---|---|---|---|---|
| **Effective** | 2020 / 2023 | Jan 2023 | Jul 2023 | Jul 2023 | Jul 2024 |
| **Threshold** | Revenue or data volume | 100K consumers | 100K consumers | 100K consumers | 100K consumers or 25K if 25% revenue from PI |
| **Right to Access** | ✓ | ✓ | ✓ | ✓ | ✓ |
| **Right to Delete** | ✓ | ✓ | ✓ | ✓ | ✓ |
| **Right to Correct** | ✓ | ✓ | ✓ | ✓ | ✓ |
| **Right to Portability** | ✓ | ✓ | ✓ | ✓ | ✓ |
| **Opt-out of targeted ads** | ✓ (via sharing) | ✓ | ✓ | ✓ | ✓ |
| **Universal opt-out signal** | ✓ | ✓ | ✓ | ✓ | ✗ |
| **Private right of action** | Limited (breaches only) | ✗ | ✗ | ✗ | ✗ |
| **Enforcer** | CPPA + AG | AG | AG | AG | AG |
| **Cure period** | None (CPPA) | 30 days | 60 days (expires 2025) | 60 days (expires 2025) | 30 days |

## Flashcard Study Set: US Privacy Law

```flashcards
- front: "What are the three thresholds that trigger CCPA/CPRA applicability for a for-profit business?"
  back: "A business meets CCPA/CPRA thresholds if it: (1) Has annual gross revenues over $25 million; OR (2) Buys, sells, receives, or shares for commercial purposes the PI of 100,000+ consumers or households annually; OR (3) Derives 50%+ of annual revenues from selling or sharing consumers' PI. Any ONE threshold is sufficient."

- front: "What is the CCPA/CPRA right to 'limit use of sensitive personal information'?"
  back: "Consumers can direct businesses to limit the use and disclosure of their Sensitive Personal Information (SPI) to only what is necessary to perform the requested service or provide requested goods. SPI includes SSNs, precise geolocation, racial origin, health info, biometrics, and financial credentials. This is an OPT-OUT right, and businesses must provide a 'Limit the Use' link."

- front: "What are the 18 HIPAA identifiers that make health data 'PHI'?"
  back: "Names; Geographic data (sub-state); Dates (except year); Phone; Fax; Email; SSN; MRN; Health plan number; Account numbers; Certificate/license numbers; Vehicle IDs; Device IDs; URLs; IP addresses; Biometrics; Full-face photos; Any unique identifier. If de-identified by removing all 18 OR by expert statistical determination, data is NOT PHI."

- front: "What is the HIPAA 'minimum necessary' standard and when does it NOT apply?"
  back: "The minimum necessary standard requires CEs to make reasonable efforts to access, use, and disclose only the PHI needed for the intended purpose. It does NOT apply to: (1) Disclosures to the individual themselves; (2) Treatment disclosures between providers; (3) Uses/disclosures required by law; (4) HHS oversight activities."

- front: "Under HIPAA Breach Notification Rule, when must individuals be notified of a breach?"
  back: "Individuals must be notified within 60 CALENDAR DAYS of discovering the breach. If 500+ residents in a state/jurisdiction are affected, the media must also be notified within 60 days. HHS must always be notified within 60 days for large breaches; small breaches may be reported annually. If PHI is encrypted to NIST standards, no notification is required (safe harbor)."

- front: "What is GLBA's Safeguards Rule and what does it require?"
  back: "GLBA's FTC Safeguards Rule requires financial institutions to implement a comprehensive written information security program. Key 2023 update requirements: designated qualified individual, written risk assessment, encryption at rest and in transit, multi-factor authentication (MFA) for all systems with customer information, penetration testing, vulnerability assessments, and an incident response plan."

- front: "What is COPPA and who must comply with it?"
  back: "COPPA (Children's Online Privacy Protection Act) requires: Operators of websites/apps DIRECTED to children under 13, AND operators of general-audience sites with ACTUAL KNOWLEDGE they collect data from under-13 users must obtain VERIFIABLE PARENTAL CONSENT before collecting any personal information from children. FTC enforces with penalties up to $51,744 per violation."

- front: "How does the FTC use Section 5 for privacy enforcement?"
  back: "The FTC uses Section 5 of the FTC Act (prohibiting unfair or deceptive acts or practices) as a general privacy enforcement tool even where no specific privacy statute exists. DECEPTIVE: False or misleading privacy promises (e.g., 'we don't sell data' when you do). UNFAIR: Unreasonable data security that causes substantial consumer harm not reasonably avoidable."

- front: "What is the difference between CCPA 'sale' and 'sharing'?"
  back: "SALE: Disclosing personal information to a third party for monetary or other valuable consideration. SHARING (added by CPRA): Disclosing PI to a third party for cross-context behavioral advertising — even if no money is exchanged. This distinction closes the loophole where companies claimed they 'shared' (not sold) data for targeted advertising. Both require an opt-out right."

- front: "What is a HIPAA Business Associate and what is a Business Associate Agreement?"
  back: "A Business Associate (BA) is a person/entity that performs functions on behalf of a Covered Entity that involves creating, receiving, maintaining, or transmitting PHI. Examples: cloud vendors, billing companies, attorneys handling PHI. A Business Associate Agreement (BAA) is a required contract specifying how the BA will protect PHI, their permitted uses, and their obligation to report breaches. CEs may not share PHI with BAs without a BAA."
```
