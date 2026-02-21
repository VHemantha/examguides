---
title: "ICD-10-CM Coding Guide for the CPC Exam: Chapter-by-Chapter Breakdown"
description: "Master ICD-10-CM diagnosis coding for the CPC and CCS exams. Code structure, official guidelines, the 7 most-tested chapters, sequencing rules, and 25 flashcards."
layout: article
niche: medical-coding
date: 2026-01-15
tags: [ICD-10-CM, diagnosis coding, CPC exam, medical coding guide, code structure, sequencing]
difficulty: intermediate
tools: [flashcards]
related:
  - /medical-coding/
  - /medical-coding/cpt-codes-guide/
priority: 0.8
---

ICD-10-CM (International Classification of Diseases, 10th Revision, Clinical Modification) is the diagnosis coding system used in all U.S. healthcare settings. Understanding its structure and guidelines is critical for CPC, CCS, and CCA exam success.

## ICD-10-CM Code Structure

Every ICD-10-CM code follows this anatomy:

```
  S72.001A
  │  │││└── 7th character: Episode of care
  │  ││└─── 6th character: Qualifier (site, laterality)
  │  │└──── 5th character: Qualifier
  │  └───── 4th character: Etiology, anatomic site
  └──────── Category (3 characters): Disease/condition
```

- **Characters 1–3:** Category (the disease or condition grouping)
- **Character 4–6:** Subcategory (specificity — site, etiology, severity)
- **Character 7:** Extension (episode of care for injuries, aftercare)

**7th Character Extensions (Injuries, Poisonings, Fractures):**
| Code | Meaning |
|---|---|
| A | Initial encounter (active treatment) |
| D | Subsequent encounter (routine healing) |
| S | Sequela (complication of healed condition) |

```callout type="important"
**High-Yield Exam Point:** The 7th character "A" is used for EVERY encounter while the patient is receiving ACTIVE treatment — not just the first visit. D is used for aftercare/healing. S is for late effects (sequelae).
```

## Official Coding Conventions (Must Know)

### Excludes Notes
| Type | Meaning | Example |
|---|---|---|
| **Excludes1** | "NOT CODED HERE" — the two codes can NEVER be used together | Congenital malformation AND acquired form of same condition |
| **Excludes2** | "NOT INCLUDED HERE" — patient may have BOTH conditions; use other code if applicable | E11 (Type 2 diabetes) Excludes2 Type 1 diabetes |

### "Code First" / "Use Additional Code"
- **Code First:** Requires sequencing an underlying condition first, then the manifestation
- **Use Additional Code:** The condition requires an additional code to fully describe
- **Code Also:** Report a secondary code if applicable
- **In Diseases Classified Elsewhere:** Manifestation codes — NEVER sequenced first

### NEC vs. NOS
- **NEC (Not Elsewhere Classified):** Sufficient info documented, but no specific code exists → code to "other specified"
- **NOS (Not Otherwise Specified):** Insufficient information documented → code to "unspecified"

## The 7 Most-Tested ICD-10-CM Chapters

### Chapter 2: Neoplasms (C00–D49)

Neoplasm coding requires checking the Neoplasm Table in the Alphabetic Index.

**Sequencing Rules:**
1. Primary malignancy gets principal diagnosis if current treatment targets the primary
2. Secondary (metastatic) malignancy is sequenced when treatment is for the secondary site
3. History codes (Z85.–) used when cancer is no longer active/treated
4. Anemia due to malignancy: sequence the malignancy first (C code), then the anemia (D63.0)

| Behavior | Table Column | ICD-10-CM Range |
|---|---|---|
| Malignant primary | C00–C75, C76–C80 | Most cancers |
| Malignant secondary | C77–C79 | Metastatic sites |
| Carcinoma in situ | D00–D09 | Localized, non-invasive |
| Benign | D10–D36 | Non-cancerous growths |
| Uncertain behavior | D37–D48 | Undetermined at biopsy |
| Unspecified | D49 | No information |

### Chapter 4: Endocrine, Nutritional, Metabolic (E00–E89)

**Diabetes Coding** — High-frequency exam topic:
- **E10.–:** Type 1 diabetes mellitus
- **E11.–:** Type 2 diabetes mellitus (most common — unspecified type defaults here)
- **E13.–:** Other specified diabetes (e.g., LADA, post-pancreatectomy)

**Diabetic Complications:** Code with the appropriate 5th/6th character:
- E11.40 — Diabetic neuropathy, unspecified
- E11.65 — Hyperglycemia (with the diabetes code)
- E11.9 — Without complications
- E11.649 — Hypoglycemia without coma

```callout type="tip"
**Memory Tip:** For Type 2 Diabetes, if the documentation doesn't specify Type 1 or Type 2, default to E11 (Type 2). Always add additional codes for manifestations (retinopathy, nephropathy, etc.).
```

### Chapter 5: Mental, Behavioral, Neurodevelopmental (F01–F99)

- **F10.–:** Alcohol-related disorders (in remission, abuse, dependence — note the differences)
- **F20.9:** Schizophrenia, unspecified
- **F32.–:** Major depressive disorder, single episode
- **F33.–:** Major depressive disorder, recurrent
- **F41.1:** Generalized anxiety disorder
- **F84.0:** Autism spectrum disorder

### Chapter 9: Circulatory System (I00–I99)

Cardiovascular coding is complex and heavily tested:

**Hypertension:** I10 (essential hypertension — used for most hypertension cases)
- Hypertensive heart disease: I11.– (with/without heart failure)
- Hypertensive CKD: I12.– (with CKD stage)
- Hypertensive heart and CKD: I13.– (combination code)

**Acute MI (AMI):** I21.–
- STEMI codes by vessel: I21.01–I21.29
- NSTEMI: I21.4
- Subsequent MI (within 4 weeks): I22.–
- Old MI (healed): I25.2

**Stroke (CVA):**
- I63.– = Cerebral infarction (ischemic stroke)
- I61.– = Intracerebral hemorrhage
- I69.– = Sequelae of cerebrovascular disease

### Chapter 13: Musculoskeletal (M00–M99)

Laterality is critical — most codes require specifying right, left, or unspecified:
- M16.11 — Primary osteoarthritis, right hip
- M17.31 — Unilateral post-traumatic osteoarthritis, right knee
- M54.5 — Low back pain

**Fracture coding** uses Chapter 19 (Injuries): S-codes for acute fractures with 7th characters.
Chapter 13 codes (M80–M85) are for pathological fractures (due to osteoporosis, neoplasm, etc.):
- M80.011A — Age-related osteoporosis with pathological fracture, right shoulder, initial encounter

### Chapter 15: Pregnancy, Childbirth, Puerperium (O00–O9A)

**Critical Rules:**
1. Obstetric codes from Chapter 15 ALWAYS take priority (principal dx)
2. Must add a 7th character for trimester (1, 2, 3) or encounter type
3. Use Z3A.– codes to report weeks of gestation (additional code, not principal)
4. Normal delivery: O80 (only when there are NO complications at all)

| Week Range | 7th Character |
|---|---|
| Less than 14 weeks | 1 (First trimester) |
| 14–27 weeks | 2 (Second trimester) |
| 28+ weeks | 3 (Third trimester) |

### Chapter 19: Injuries, Poisonings (S00–T88)

**Poisoning vs. Adverse Effect vs. Underdosing:**
- **Poisoning:** Wrong drug, wrong dose, patient took it intentionally in excess, or non-prescribed drug
- **Adverse Effect:** Properly prescribed and administered, but patient has a reaction
- **Underdosing:** Patient took LESS than prescribed

**Sequence:** Poisoning code first, then the manifestation. For adverse effects: manifestation first, then the adverse effect code (T36–T65 with 6th character A/D/S).

## ICD-10-CM Sequencing Rules Summary

| Scenario | Principal Diagnosis |
|---|---|
| Two conditions equal in treatment | Either (provider discretion) |
| Symptom + confirmed diagnosis | Confirmed diagnosis |
| Symptom only (outpatient, unconfirmed) | The symptom |
| Symptom only (inpatient, unconfirmed) | The condition described as "possible" or "probable" |
| Chronic condition + acute exacerbation | Acute exacerbation |
| Pregnancy complication | Obstetric code (O code) |
| Poisoning | Poisoning code first, then manifestation |
| Adverse effect | Manifestation first, then T code |

## Flashcard Study Set: ICD-10-CM High-Yield Facts

```flashcards
- front: "What does Excludes1 mean in ICD-10-CM?"
  back: "Excludes1 means 'NOT CODED HERE' — the excluded condition CANNOT be coded with the code that has the Excludes1 note. The two conditions are mutually exclusive and should never appear together on the same claim."

- front: "What is the difference between NEC and NOS?"
  back: "NEC (Not Elsewhere Classified): The provider has documented specific details, but no specific code exists — use 'other specified.' NOS (Not Otherwise Specified): The provider has NOT documented enough detail — use 'unspecified.' NEC = specific details, no code. NOS = insufficient documentation."

- front: "Which type of diabetes is coded with E11 by default when not specified?"
  back: "Type 2 Diabetes Mellitus (E11). If documentation says 'diabetes mellitus' without specifying type, default to E11 (Type 2). Only code Type 1 (E10) when the record specifically documents Type 1 or insulin-dependent diabetes mellitus (IDDM)."

- front: "What 7th character is used when a patient returns for routine follow-up care on a healing fracture?"
  back: "'D' — Subsequent encounter. The 7th character 'A' is for initial/active treatment. 'D' is for routine healing and follow-up care. 'S' is for sequelae (complications of a previously healed condition)."

- front: "For a malignant neoplasm, when do you sequence the metastatic (secondary) site as principal diagnosis?"
  back: "Sequence the secondary/metastatic site as principal diagnosis when the TREATMENT (during this encounter) is DIRECTED AT the secondary site, not the primary. Example: Patient with colon cancer (primary) admitted for chemo targeting liver metastasis → liver metastasis (C78.7) is principal dx."

- front: "What is the sequencing rule for diabetic manifestations (e.g., diabetic retinopathy)?"
  back: "The diabetes code (E10.–, E11.–, etc.) is ALWAYS sequenced FIRST as the principal/first-listed diagnosis. The manifestation (e.g., H36 proliferative vitreoretinopathy) is listed secondly. The diabetes code itself includes combination codes that incorporate the complication."

- front: "What is the difference between an 'adverse effect' and a 'poisoning' in ICD-10-CM?"
  back: "ADVERSE EFFECT: A drug reaction that occurs when a medication is taken correctly as prescribed. Sequence manifestation first, then T code. POISONING: A drug reaction from taking the wrong drug, wrong dose, or someone else's medication — also includes overdoses. Sequence T code (poisoning) first, then manifestation."

- front: "In outpatient coding, how are 'possible' and 'probable' diagnoses handled?"
  back: "In OUTPATIENT settings, do NOT code diagnoses documented as 'possible,' 'probable,' 'suspected,' or 'rule out.' Code the sign, symptom, or finding instead. In INPATIENT settings, you MAY code conditions described as possible, probable, or suspected as if confirmed."

- front: "What does 'Code First' instruction mean in ICD-10-CM?"
  back: "'Code First' tells you that this code represents a manifestation of another underlying condition. You must sequence the underlying condition BEFORE this manifestation code. Manifestation codes (marked 'in diseases classified elsewhere') can NEVER be the first-listed/principal diagnosis."

- front: "What ICD-10-CM code is used for a normal, uncomplicated delivery?"
  back: "O80 — Encounter for full-term uncomplicated delivery. This is ONLY used when there are ABSOLUTELY NO complications during labor, delivery, and the immediate postpartum period. Any complication at all requires a specific O-chapter code. Add Z37.0 for outcome of delivery (liveborn infant)."
```
