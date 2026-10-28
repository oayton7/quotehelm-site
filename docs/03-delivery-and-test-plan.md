# Build the test system and prove delivery

## Working test case

Use a fictional scheduled bathroom-installation enquiry. A person submits contact details, a postcode and job description. The system stores the request, notifies a controlled phone and inbox, sends an agreed acknowledgement if included, and allows a responsible person to update its status.

The existing HTML demos simulate these actions. They are useful for explanation, but they are not evidence of storage, delivery, authentication, scheduling or failure recovery.

## Candidate architecture

The original plan names Tally, Make and Twilio. Treat them as candidates to evaluate, not accounts that have already been configured:

1. A form validates minimum contact, job and area information.
2. An intake event receives a unique ID and is stored durably.
3. An automation uses that ID to avoid duplicate notifications.
4. Email and SMS notifications go to agreed destinations.
5. Delivery state and failures are recorded separately from enquiry status.
6. The owner updates the enquiry: new, contacted, quoted, won or closed.
7. Failed jobs alert Oscar and can be replayed without duplicate customer messages.

Where the client’s existing CRM already supports the workflow, prefer its native capabilities. Confirm actual plan limits, integrations, delivery receipts, UK messaging costs, processor terms and account ownership before selecting suppliers.

## Minimum record

Store enquiry ID, submission time, source, contact details, job description, postcode, acknowledgement state, notification state and owner status. Do not collect unrelated sensitive data. Define access roles and retention; do not commit actual submissions to GitHub.

Distinguish “accepted by a provider”, “delivered where supported”, “read” and “responded to”. Do not show a success message that promises inbox delivery merely because the form request succeeded.

## Acceptance test suite

Use synthetic details and only phone numbers/inboxes controlled by the tester. Expected results must be written before running tests. Record pass/fail, timestamps, screenshots/log references and fixes. All required cases must pass before a client pilot, with any remaining limitations explicitly agreed.

| ID | Case | Expected result |
| --- | --- | --- |
| T01 | Valid desktop enquiry | Record saved once and both agreed notifications received |
| T02 | Valid mobile enquiry | Same result with usable mobile controls |
| T03 | Missing contact field | Helpful validation; unusable record not silently accepted |
| T04 | Malformed email | Validation or explicit recoverable error |
| T05 | Invalid phone | Clearly handled according to agreed validation policy |
| T06 | Long/unusual characters | Safe stored text, readable notifications, no injected markup |
| T07 | Double-click submit | One logical enquiry and no duplicate customer messages |
| T08 | Replayed webhook | Existing event detected; no duplicate effects |
| T09 | Two genuine enquiries from same person | Both retained; deduplication does not erase distinct work |
| T10 | SMS delivery failure | Record remains, email route works, failure visible |
| T11 | Email failure | Record remains, SMS route works where possible, failure visible |
| T12 | Both notification routes fail | Durable record, alert and documented recovery |
| T13 | Automation interrupted | Backlog visible; safe replay after recovery |
| T14 | Supplier quota/balance exhausted | Alert and controlled fallback; no silent data loss |
| T15 | After-hours enquiry | Truthful acknowledgement; no invented attendance promise |
| T16 | Out-of-area request | Agreed handling, with a record of what happened |
| T17 | Spam/rapid requests | Rate/abuse controls limit unwanted messages and cost |
| T18 | Owner changes enquiry status | Change persists and is visible to authorised users |
| T19 | Unauthorised record access | Customer records inaccessible to unauthorised users |
| T20 | Export | Authorised owner can obtain the agreed record format |
| T21 | Deletion | Test record removed from applicable stores under the retention policy |
| T22 | Notification destination changes | New destination works; old destination no longer receives new data |
| T23 | Configuration rollback | Previously working configuration restored and rechecked |
| T24 | Handover | Another authorised person follows the runbook successfully |
| T25 | Customer acknowledgement failure | Submission status remains truthful; failure logged for recovery |

For later products, add tests before enabling them: follow-up stops after reply/won/lost/opt-out; review request fires only on the agreed completion event and only once; booking handles conflicts; AI refuses unsupported commitments and escalates unknowns. These are not included simply because the capture suite passes.

## Delivery procedure

1. Discover the workflow and qualify the problem.
2. Verify platform, access, supplier limits and ownership.
3. Agree scope, data handling, costs, support and acceptance.
4. Build in a separate test environment using synthetic records.
5. Run the test suite and record failure recovery.
6. Show the client the exact wording and behaviour; record approval.
7. Deploy in an agreed window with a rollback plan.
8. Run a controlled live test to agreed destinations.
9. Hand over access, documentation and support contact details.
10. Review use and operating cost after an agreed pilot period.

## Evidence from the first pilot

Record a comparable baseline where feasible: number of valid enquiries, routes, human response times and how many received quotes. After installation, record the same definitions plus delivery failures and support effort. Keep sample sizes and dates visible.

Use separate measures for system notification latency and human response. Acknowledgement is not a sale. Revenue attributed to the system needs a defensible comparison; a before/after improvement alone may reflect seasonality, advertising or changed workload.

A useful early case study may say “all 18 recorded enquiries generated the agreed notifications during this period” if that is true. It cannot claim 18 additional jobs or enquiries on that basis.

## Handover artefacts

- A short video of the real test submission and notifications.
- A diagram/list of providers and which account owns each step.
- A setup and rollback procedure.
- A failure-triage procedure with escalation contacts.
- Actual vendor costs, usage assumptions and account limits.
- Test results and approved customer-facing messages.
- Export, access-transfer and offboarding instructions.

Store real client evidence in a controlled private location. Publish only permissioned, suitably minimised case studies.
