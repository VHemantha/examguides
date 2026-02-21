---
title: "CIPP/US Practice Exam: 35 Questions with Detailed Explanations (2026)"
description: "35 scenario-based CIPP/US practice exam questions covering CCPA, HIPAA, GLBA, COPPA, FTC Section 5, and state privacy laws. Detailed explanations for every answer."
layout: article
niche: privacy-cipp
date: 2026-01-15
tags: [CIPP/US practice exam, privacy certification practice questions, CCPA exam questions, HIPAA quiz, data privacy scenarios]
difficulty: intermediate
tools: []
related:
  - /privacy-cipp/
  - /privacy-cipp/us-privacy-law/
priority: 0.8
---

These 35 scenario-based questions mirror the style of actual CIPP/US exam questions. The IAPP exam presents real-world privacy scenarios and asks what the correct legal or compliance action is.

```callout type="tip"
**CIPP/US Exam Strategy:** Most questions give you a scenario and ask what "should" happen or what is "required." Eliminate obviously wrong answers first. For borderline choices, apply the principle that privacy law generally favors the more protective interpretation.
```

## Section 1: CCPA / CPRA (Questions 1–10)

```accordion
## 1. A California resident submits a verified request to a covered business asking to know what personal information has been collected about them. The business has 30 days left on its initial response window but needs more time due to complex IT systems. What may the business do?
**Answer: Extend the response period by an additional 45 days (total of 90 days), but must notify the consumer of the extension and the reason within the original 45-day period.**

Explanation: CCPA allows a one-time extension of up to 45 calendar days for responding to consumer requests, but the business MUST notify the consumer of the extension within the original 45-day period. The notice must explain why the extension is needed. Simply missing the deadline without notification is a violation. Total maximum response time: 90 days.

## 2. A company's privacy policy states: "We may share your information with select marketing partners." A California consumer requests a list of third parties with whom their personal information was sold or shared. What is the correct response?
**Answer: Provide the list of specific third-party names, including categories of PI disclosed to each, and inform the consumer of their right to opt-out.**

Explanation: Under CCPA/CPRA, consumers have the right to know the specific categories of PI collected and the specific third parties to whom PI was sold or shared. Vague language like "select marketing partners" in a privacy notice is insufficient. The business must disclose actual third-party names and provide opt-out mechanisms. This scenario tests the distinction between a notice that satisfies CCPA's transparency requirements versus one that is legally inadequate.

## 3. A large California-based tech company's privacy policy says it does not sell personal information. However, the company participates in an ad network that gives advertisers access to users' behavioral data in exchange for revenue sharing. Is this a "sale" under CCPA?
**Answer: Yes — this likely constitutes "sharing" (if not "sale") under CPRA, which covers disclosing PI for cross-context behavioral advertising regardless of whether money changes hands.**

Explanation: The CPRA specifically closed the loophole that allowed companies to claim they "share, not sell" data for advertising. "Sharing" means disclosing PI to a third party for cross-context behavioral advertising for any valuable consideration, including non-monetary consideration. Revenue sharing with an ad network is "valuable consideration." The company's "we don't sell" statement is likely false or misleading under CCPA/CPRA and potentially an FTC Section 5 deceptive practice.

## 4. A CPRA-covered business wants to use consumer PI it collected for customer service to now target the same customers with advertising for a new product line. Is this permissible without additional consent?
**Answer: No — this likely requires a new notice or consent because the new use (advertising) is not compatible with the original purpose (customer service).**

Explanation: CPRA introduced purpose limitation principles: PI collected for one purpose cannot be used for a materially different, incompatible purpose without disclosure and/or consent. Using customer service data for targeted advertising is a materially different purpose. The business must update its privacy notice and provide consumers an opportunity to opt-out or, for sensitive PI use, obtain explicit consent.

## 5. A California consumer opts out of the "sale" of their PI using a business's opt-out link. Three months later, the same consumer visits the business's website. The business's third-party analytics vendor reads the consumer's browser cookie and sends data about the visit to data brokers for audience targeting. Has the business violated CCPA?
**Answer: Potentially yes — if the analytics data transfer constitutes "selling or sharing" personal information, the business violated the consumer's opt-out.**

Explanation: A consumer's opt-out of sale/sharing must be honored globally across the business's data sharing activities. The business is responsible for ensuring vendors comply with opt-out signals. The scenario describes a classic "cookie syncing" situation that regulators have targeted. The business should have configured its analytics to respect opt-out signals. California requires businesses to honor Global Privacy Control (GPC) browser signals as valid opt-out requests.

## 6. A covered business receives a consumer request to delete their personal information. The consumer had made a purchase 18 months ago. The business relies on the transaction data for tax compliance records required by California law. How should the business respond?
**Answer: The business may deny the deletion request for the tax compliance data under the "legal obligation" exception, but must delete all other PI that is not necessary for that legal obligation.**

Explanation: CCPA's right to delete has exceptions, including when the business must retain PI to comply with a legal obligation. Tax records retention is a recognized legal obligation. However, the exception is narrow: the business may ONLY retain what is necessary for that specific exception. If the business also has marketing data, behavioral data, or other PI about this consumer that isn't needed for tax records, it must delete that information. Broad retention under a narrow exception is a violation.

## 7. Under CPRA, which entity is the primary enforcement agency for the California Consumer Privacy Act?
**Answer: The California Privacy Protection Agency (CPPA) — the first dedicated state privacy enforcement agency in the US, created by CPRA. The California AG retains concurrent enforcement authority.**

Explanation: CPRA created the CPPA as an independent regulatory agency with authority to promulgate regulations, investigate violations, and impose fines. The AG's office retains enforcement rights as well. Civil penalties: $2,500 per unintentional violation; $7,500 per intentional violation; $7,500 per violation involving children's PI. The CPPA can initiate investigations proactively — it doesn't need to wait for consumer complaints.

## 8. A business is revising its online privacy notice to comply with CPRA. Which of the following must the notice include?
A) The categories of PI collected and the purposes for processing
B) Whether the business sells or shares PI and how to opt out
C) Retention periods for each category of PI
D) All of the above

**Answer: D) All of the above**

Explanation: CPRA significantly expanded required privacy notice content beyond the original CCPA. The notice must now include: categories of PI collected and the business purposes; sources of PI; categories of third parties PI is disclosed to; whether PI is sold/shared and opt-out instructions; data retention periods or criteria used to determine retention; and the right to limit use of sensitive PI. The old-style vague privacy policies are legally insufficient under CPRA.

## 9. A 15-year-old California resident tries to opt in to allowing a business to sell their personal information. Under CCPA, what is required?
**Answer: The business may not sell/share the PI of consumers between 13–15 years old without their affirmative opt-in consent. For consumers under 13, verifiable parental consent is required.**

Explanation: CCPA created a two-tier opt-in regime for minors: Ages 13-15: business needs the MINOR'S own affirmative opt-in before selling/sharing their PI. Under 13: PARENT or guardian's verifiable consent is required. If the business has "actual knowledge" it is selling PI of a minor and fails to get the required consent, civil penalties are $7,500 per violation. This overlaps with COPPA requirements for under-13 users.

## 10. A California consumer's data is exposed in a breach. The business notifies affected consumers as required. The consumer wants to sue. Under CCPA, what is their private right of action?
**Answer: The consumer may bring a private lawsuit ONLY for data breaches involving nonencrypted and nonredacted personal information. Damages range from $100–$750 per incident per consumer or actual damages, whichever is greater. Private actions for all other CCPA/CPRA violations must go through the AG or CPPA.**

Explanation: CCPA's private right of action is narrow and applies ONLY to data security breaches. For all other violations (failure to honor access requests, opt-out violations, etc.), consumers cannot sue directly — they must file complaints with the CPPA or AG. This is a significant design choice that differs from how some other laws work. The $100–$750 statutory damages provision makes class actions viable even without proving actual damages.
```

## Section 2: HIPAA (Questions 11–20)

```accordion
## 11. A hospital employee accesses the medical records of a celebrity patient out of curiosity, even though the employee has no treatment, payment, or operations role related to that patient. Has HIPAA been violated?
**Answer: Yes — this is an impermissible use of PHI. The employee violated the minimum necessary standard and the hospital may have a breach on its hands requiring notification.**

Explanation: HIPAA restricts access to PHI to workforce members who need it for TPO (Treatment, Payment, Operations). Accessing a patient's records out of curiosity — even by an authorized workforce member — is an impermissible use. The hospital must discipline the employee and conduct a risk assessment to determine if this constitutes a reportable breach (likely yes). This type of "snooping" is one of the most common HIPAA violations and results in both terminations and HHS enforcement actions.

## 12. A physician's office wants to share a patient's PHI with a pharmaceutical company for marketing purposes. What is required?
**Answer: The covered entity must obtain a valid HIPAA-compliant written authorization from the patient before sharing PHI for marketing purposes (with limited exceptions).**

Explanation: Marketing uses of PHI require patient authorization. Marketing = communication about a product or service encouraging the recipient to purchase or use it. Key exceptions (no authorization needed): face-to-face communications by the CE, promotional gifts of nominal value, and some treatment communications. Selling PHI to a pharma company for marketing without authorization is a major HIPAA violation — and likely also an FTC deceptive practice.

## 13. A cloud computing company stores electronic PHI (ePHI) for a hospital. The cloud company never actually views or handles the PHI directly — it just provides storage infrastructure. Is the cloud company a HIPAA Business Associate?
**Answer: Yes — the cloud company is a Business Associate. HHS has explicitly stated that cloud service providers storing ePHI are BAs even if they don't access the information. A BAA is required.**

Explanation: HHS guidance (2016) confirmed that CSPs that store ePHI are BAs, even without actually accessing the data. The potential access is sufficient. The CE (hospital) must have a Business Associate Agreement with the cloud provider. The BA must implement the HIPAA Security Rule safeguards. This is a critical question for modern healthcare IT — all cloud, SaaS, and hosting vendors that could access ePHI are BAs.

## 14. A patient requests a copy of their medical records from their doctor's office. The office charges $0.25 per page for 500 pages = $125 total. Is this permissible under HIPAA?
**Answer: Potentially — but only if the charge reflects actual costs. HIPAA allows reasonable, cost-based fees. HHS guidance suggests charges based on labor, supplies, and postage. $125 for 500 pages may be reasonable if costs are documented, but charging arbitrary or excessive fees to deter access requests is a HIPAA violation.**

Explanation: The HIPAA Privacy Rule allows CEs to charge a reasonable, cost-based fee for producing records (labor, supplies, postage). They may NOT charge for retrieving records, searching records, or as a deterrent. HHS has indicated a flat fee of approximately $6.50 for electronic records is typically sufficient. Some states have stricter laws capping per-page fees. If the charge is designed to discourage access rather than recover costs, it's a violation.

## 15. A hospital's EHR vendor is implementing multi-factor authentication. Under which HIPAA rule is MFA addressed?
**Answer: The HIPAA Security Rule — specifically, the Technical Safeguards requirement for Access Controls (45 CFR § 164.312(a)).**

Explanation: The HIPAA Security Rule's Technical Safeguards include: Access Controls (unique user IDs, automatic logoff, encryption/decryption), Audit Controls, Integrity Controls, and Transmission Security. MFA falls under access controls and is an "addressable" implementation specification. The 2024 proposed HIPAA Security Rule update would make MFA explicitly **required** (not just addressable) for all access to ePHI. Know this update for the 2026 exam.

## 16. A covered entity discovers a potential HIPAA breach. When does the 60-day notification clock start?
**Answer: The clock starts when the CE (or its BA) discovered (or should have discovered through reasonable diligence) the breach — NOT when investigation is complete.**

Explanation: This is a critical and frequently tested timing point. The notification clock starts at DISCOVERY, not at the end of investigation. Covered entities cannot delay the clock by prolonging investigation. If a CE discovers a breach on March 1, individuals must be notified by April 30 — even if the investigation isn't complete. The CE can provide initial notice and update individuals with additional information as investigation proceeds.

## 17. A HIPAA Business Associate (billing company) discovers it has suffered a ransomware attack that encrypted PHI. What are the BA's obligations?
**Answer: The BA must: (1) notify the covered entity without unreasonable delay and no later than 60 days after discovery; (2) the CE then has its own 60-day notification obligation to individuals and HHS. HHS guidance states ransomware encrypting PHI is presumed a breach unless the CE/BA can demonstrate low probability of compromise.**

Explanation: Under HIPAA, BAs must notify the CE of breaches so the CE can fulfill its notification obligations to individuals and HHS. The BA is liable for its own Security Rule violations. Regarding ransomware: HHS issued guidance (2016) stating that ransomware typically constitutes a HIPAA breach — the encryption of PHI by an unauthorized party is an impermissible acquisition. The CE/BA must demonstrate low risk of compromise to avoid breach notification.

## 18. A hospital merges with a physician group. During due diligence, the acquiring hospital wants access to the physician group's patient records. How should PHI be handled?
**Answer: PHI may be disclosed for due diligence under HIPAA's "health care operations" exception as part of a merger/acquisition, but the acquiring entity becomes a covered entity responsible for the PHI after the merger. A BAA or appropriate data use agreement may be needed during due diligence.**

Explanation: HIPAA's health care operations include "conducting or arranging for due diligence in connection with a merger or acquisition." PHI may be disclosed during this process without patient authorization. However: the disclosing entity must ensure the PHI will be used only for due diligence, the receiving entity agrees to protect the PHI, and if the acquisition doesn't occur, the PHI must be returned or destroyed. After a successful merger, the combined entity is responsible for all inherited PHI.

## 19. A patient's treating physician asks the patient's mental health provider for psychiatric records. The mental health provider refuses, citing HIPAA. Is the refusal justified?
**Answer: Not necessarily — HIPAA generally permits disclosures for treatment without patient authorization, including to other treating providers. However, some states have STRICTER laws for mental health/substance abuse records that supersede HIPAA. The provider should follow applicable state law.**

Explanation: HIPAA's "treatment" exception broadly allows disclosures between providers for TPO without patient authorization. However, HIPAA expressly preserves stricter state laws. Many states have heightened protections for psychiatric records, HIV/AIDS information, and substance abuse records (also federal 42 CFR Part 2 for substance abuse). The mental health provider must comply with BOTH HIPAA and any applicable stricter state law. HIPAA is a floor, not a ceiling.

## 20. Which of the following is NOT a permitted use of PHI under HIPAA without patient authorization?
A) Treating a patient in an emergency
B) Sharing with a health plan for payment
C) Disclosing to a pharmaceutical company for research on a new drug
D) Reporting a communicable disease to the state health department

**Answer: C) Disclosing to a pharmaceutical company for research on a new drug**

Explanation: Research disclosures require either: (1) valid patient authorization, (2) IRB/Privacy Board waiver of authorization, (3) a limited data set with a data use agreement, or (4) de-identified data. A general disclosure to pharma "for research" without meeting one of these pathways is not permitted. Options A, B, and D are all expressly permitted: emergencies (TPO), payment operations, and public health reporting.
```

## Section 3: GLBA, COPPA & FTC Section 5 (Questions 21–30)

```accordion
## 21. An auto dealership that arranges financing for car purchases is visited by a potential buyer. Is the dealership a "financial institution" under GLBA?
**Answer: Yes — auto dealers that extend credit or arrange financing are financial institutions under GLBA and subject to its Privacy Rule and Safeguards Rule.**

Explanation: GLBA's definition of "financial institution" is broad: any company significantly engaged in financial activities. The FTC rule covers entities including auto dealers that arrange financing, mortgage brokers, tax preparers, and financial advisors. Pure auto sales (no financing) may not qualify, but once a dealership arranges a loan, lease, or credit, it becomes a financial institution. The updated FTC Safeguards Rule (effective 2023) applies to these dealers.

## 22. A bank sends its customers an annual GLBA privacy notice. A customer reads that the bank shares information with affiliates. The customer wants to stop this sharing. Under GLBA, what right does the customer have?
**Answer: Under GLBA, customers generally cannot opt out of sharing with AFFILIATES (related companies). The opt-out right under GLBA applies only to sharing with NON-AFFILIATED third parties.**

Explanation: GLBA's opt-out right is limited. Sharing with affiliates (companies under common ownership or control) does NOT require an opt-out opportunity under GLBA. Only sharing with non-affiliated third parties requires notice and opt-out. Note: The FCRA has additional rules about sharing for eligibility determinations. Some state laws (like CCPA for California) provide broader opt-out rights that overlay GLBA's minimum requirements.

## 23. A children's educational website collects email addresses from children under 13 to send "educational newsletters." The website argues this collection is for "support of internal operations." Is this COPPA compliant?
**Answer: No — collecting email addresses from children for newsletter communications is not "support of internal operations" and requires verifiable parental consent.**

Explanation: COPPA's "support for internal operations" exception covers using PI to perform a single request (like sending a requested document), maintain security, or perform other basic functionality — NOT for ongoing communications like newsletters. An email newsletter is an outbound marketing/communication use that requires explicit parental consent. The FTC has taken enforcement action against sites that miscategorize ongoing email programs as "internal operations."

## 24. A company's privacy policy claims it uses "military-grade encryption" to protect customer data. In fact, the company stores passwords in plaintext and uses no encryption at all. An FTC investigation is initiated. Under what theory would the FTC most likely proceed?
**Answer: Deceptive practice under FTC Act Section 5 — the company made false representations about its data security practices that are likely to mislead reasonable consumers making decisions about sharing their information.**

Explanation: When a company makes specific security representations that are false, the FTC treats this as deceptive. The FTC looks at: (1) was there a representation? Yes — "military-grade encryption." (2) Is it misleading to a reasonable consumer? Yes — consumers believe their data is encrypted. (3) Is it material? Yes — security practices affect decisions to share data. The FTC has brought dozens of deceptive security cases against companies whose privacy/security claims were false.

## 25. A fintech startup collects financial data and doesn't have a privacy notice. An FTC investigation reveals the company collected more data than necessary and didn't implement basic security. The FTC brings a case under Section 5. What theory applies?
**Answer: Unfairness under FTC Section 5 — the company's data collection and security practices caused substantial consumer harm (data exposure risk) that consumers could not reasonably avoid and that outweighs any business benefit.**

Explanation: Where there is no false promise (no deceptive act), the FTC uses the unfairness theory for inadequate data security. The test: (1) substantial injury — data exposure causes real harm even before a breach (2) not reasonably avoidable — consumers can't protect themselves without market power (3) not outweighed by benefits — no legitimate business reason to store sensitive data insecurely. The FTC has used this theory against companies with no privacy disclosures at all.

## 26. A consumer reporting agency (CRA) provides tenant screening reports to landlords. A prospective tenant is denied housing based on a screening report. Under the FCRA, what rights does the tenant have?
**Answer: The landlord must provide an "adverse action notice" telling the tenant: (1) the adverse action was taken, (2) the CRA's name, address, and phone number, (3) that the CRA didn't make the decision and can't explain why, and (4) the right to obtain a free copy of the report and dispute inaccuracies.**

Explanation: The FCRA (Fair Credit Reporting Act) governs consumer reporting agencies and the use of consumer reports. When an adverse action is taken based on a consumer report (credit denial, housing denial, employment denial), the user must provide a specific adverse action notice. The consumer then has the right to: request a free copy of the report, dispute inaccurate information (the CRA must investigate within 30 days), and sue for willful or negligent violations. This applies to tenant screening, credit reporting, employment screening, and insurance underwriting.

## 27. An employer wants to monitor employee emails on company computers. Under U.S. law, can the employer do this?
**Answer: Generally yes — U.S. workplace privacy law is employer-favorable. Employers may monitor company-owned devices and networks, especially with prior notice. No federal law generally prohibits employer monitoring of company email, though some state laws add requirements.**

Explanation: The Electronic Communications Privacy Act (ECPA) has a "system provider exception" that allows employers to monitor communications on company systems. The Stored Communications Act similarly allows system owners to access stored communications on their systems. Best practices (and some state laws like Connecticut and Delaware) require prior written notice to employees. The CIPP/US exam tests: employer monitoring is generally permitted with notice; personal devices may have stronger protections; public sector employees have more Fourth Amendment protections.

## 28. A company operating in Virginia is subject to the Virginia Consumer Data Protection Act (CDPA). A Virginia consumer submits a request to access their personal data. The company determines it cannot verify the consumer's identity with reasonable certainty. What should the company do?
**Answer: The company should notify the consumer it cannot verify their identity and request additional verification information. If it still cannot verify after reasonable attempts, it may decline the request but must inform the consumer of the reason and how to appeal.**

Explanation: All major state privacy laws require businesses to respond to verified consumer requests, but the business must be able to verify identity to prevent fraudulent requests (e.g., a bad actor requesting someone else's data). The process: (1) Request additional verification; (2) If verification fails after reasonable efforts, decline with explanation; (3) Inform consumer of appeal rights. Virginia CDPA and other state laws require an appeals process where consumers can challenge denials.

## 29. A data broker sells detailed consumer profiles to marketing companies. The data broker is not a financial institution, healthcare provider, or children's website. Is it subject to any federal privacy law?
**Answer: Yes — the FTC has authority under Section 5 to regulate unfair/deceptive practices. Additionally, if the broker creates consumer reports (used for credit, employment, insurance decisions), it is a Consumer Reporting Agency under FCRA. The FTC has also used its authority to mandate privacy programs at large data brokers.**

Explanation: This tests knowledge of the "sectoral gap" in U.S. privacy law. Unlike GDPR, the U.S. has no omnibus federal privacy law covering all commercial data practices. Data brokers that don't fall into GLBA, HIPAA, or COPPA categories may have limited direct obligations. However: FTC Section 5 always applies to deceptive practices; if reports are used for eligibility decisions, FCRA applies; state privacy laws (CCPA, Virginia, Colorado, etc.) require data broker registration in some states; Vermont and California have specific data broker registration laws.

## 30. Which of the following best describes the FTC's "notice and choice" framework for privacy?
**Answer: Notice and choice is an approach where companies: (1) provide consumers clear notice of their data practices and (2) give consumers meaningful choices about how their data is used. It is the dominant U.S. privacy paradigm but is criticized for relying on consumers to manage their own privacy through consent.**

Explanation: The U.S. has traditionally relied on notice (tell consumers what you do) and choice (give them opt-in or opt-out options) rather than the EU's data minimization and purpose limitation model. Criticisms include: privacy policies are unreadable, consumers don't have meaningful bargaining power, and true consent is illusory. Modern state laws (CCPA/CPRA) have moved toward stronger purpose limitation and default opt-outs, moving away from pure notice-and-choice. The CIPP/US exam tests this framework as the underlying structure of U.S. privacy law.
```

## Section 4: Advanced Scenarios (Questions 31–35)

```accordion
## 31. A company's DPO discovers that the company has been sharing consumer location data with law enforcement without a warrant, relying on a "legal process" exception. Under the SCA (Stored Communications Act), when can a government entity compel a company to disclose user location data?
**Answer: For real-time precise location data (CSLI), a warrant based on probable cause is required under Carpenter v. United States (2018). For stored location data, requirements vary by type, though Carpenter's reasoning extends to detailed historical location information.**

Explanation: The Supreme Court's Carpenter v. United States (2018) held that the government must obtain a warrant for historical cell-site location information (CSLI). The ruling recognized that detailed location data — revealing a person's movements over time — deserves Fourth Amendment protection. Prior to Carpenter, the "third-party doctrine" meant data shared with third parties (like carriers) had no Fourth Amendment protection. CIPP/US candidates should know Carpenter's impact on government access to digital data.

## 32. A privacy engineer wants to implement "privacy by design" for a new product. Which of the following is NOT one of Ann Cavoukian's seven foundational principles of Privacy by Design?
A) Proactive, not reactive; preventative, not remedial
B) Privacy as the default setting
C) Full functionality — positive-sum, not zero-sum
D) Transparency to regulators, not users

**Answer: D) Transparency to regulators, not users**

Explanation: Ann Cavoukian's seven Privacy by Design principles are: (1) Proactive, not reactive; (2) Privacy as the default; (3) Privacy embedded into design; (4) Full functionality — positive sum; (5) End-to-end security; (6) Visibility and transparency (TO USERS, not just regulators); (7) Respect for user privacy — keep it user-centric. Privacy by Design requires transparency to users about data practices. This framework is tested on CIPP/US, CIPT, and increasingly referenced in privacy regulations including GDPR.

## 33. Under the "contextual integrity" theory of privacy, when is data sharing appropriate?
**Answer: Data sharing is appropriate when it matches the norms of the context in which the information was originally shared. Data flows that violate contextual norms are privacy violations, even if technically permitted by law.**

Explanation: Contextual integrity (developed by Helen Nissenbaum) is a theoretical framework tested on CIPP/US. Example: Sharing medical info with your doctor is appropriate (medical context norms). That same doctor sharing your information with your employer violates contextual integrity — even if the employer-sharing is technically permitted somewhere. This framework helps explain why legal sharing can still feel like a privacy violation. The CIPP/US exam occasionally references academic privacy frameworks alongside legal requirements.

## 34. A U.S. company receives an EU law enforcement request for data about an EU resident stored on U.S. servers. Under what framework should this be evaluated?
**Answer: U.S. companies must balance: (1) applicable U.S. law on government requests (ECPA, SCA); (2) EU data protection law (GDPR); (3) Any applicable data transfer mechanisms; (4) The EU-U.S. Data Privacy Framework (DPF, 2023) if the company is DPF-certified. Companies should review requests carefully and consider legal challenges where appropriate.**

Explanation: Cross-border law enforcement requests are complex. U.S. law (ECPA/SCA) governs what U.S. companies must disclose to U.S. authorities. Foreign government requests must follow Mutual Legal Assistance Treaties (MLATs) or may be resisted if they violate U.S. law. GDPR Chapter V restrictions apply to transfers from EU to non-EU entities. The DPF (successor to Privacy Shield) addresses commercial data transfers, not law enforcement. This tests the international considerations section of CIPP/US.

## 35. A company is reviewing its privacy program. The DPO recommends implementing a Records of Processing Activities (ROPA). Under which law is this required?
**Answer: ROPA is required under the EU's GDPR (Article 30) — not under U.S. law. However, similar data mapping/inventory documentation is a privacy best practice and increasingly referenced in U.S. state privacy law compliance guidance. Some U.S. state laws require disclosure of data practices that effectively necessitate a data inventory.**

Explanation: The CIPP/US exam sometimes includes questions about international privacy frameworks that affect U.S. companies. GDPR Article 30 requires controllers to maintain records of processing activities (who processes what, for what purpose, with what legal basis, retention periods, etc.). While no U.S. federal law mandates a ROPA, the practice is essential for any company subject to GDPR (EU operations, EU customers, or EU employee data) and serves as a best practice for all privacy programs. CCPA/CPRA compliance also benefits from a data inventory showing what PI is collected and where.
```

---

```callout type="success"
**Score Interpretation:**
- **32–35 correct:** Exam-ready. Focus on reviewing any specific laws you missed.
- **27–31 correct:** Good foundation. Deep-dive into HIPAA, GLBA, and COPPA sections where you missed questions.
- **Below 27:** Work through the [US Privacy Law Guide](/privacy-cipp/us-privacy-law/) systematically before retesting.
```

```callout type="tip"
**Final Prep Tip:** The CIPP/US exam tests specific law provisions, not general principles. Memorize: thresholds (who's covered), rights (what consumers can do), obligations (what businesses must do), and timelines (how quickly). Flashcards work well for this type of memorization.
```
