# First test build results

Results of Stage 1 of the [test build guide](12-test-build-guide.md), run by Oscar on 29 October 2026 with synthetic enquiries sent only to Oscar’s own inbox. Personal details, record contents, webhook addresses and screenshots are kept privately and are not recorded here. The full private log follows the [test log template](templates/test-log.md).

## What was built

| Step | Tool | Result |
| --- | --- | --- |
| Enquiry form (name, phone, email, postcode, job) | Tally, free plan | Working; all fields required, email and phone formats checked by Tally |
| Delivery to the automation | Make custom webhook | Working; each submission arrives within seconds |
| Duplicate check | Airtable search on Enquiry ID, filter on Total number of bundles = 0 | Working for a new enquiry; a repeat has not yet been tested |
| Durable record | Airtable, “Tandem test” base | Working; one row per submission with Status New |
| Owner email | Make Zoho Mail module, plain text | Working; subject `New enquiry: {Name}, {Postcode}` |
| Notification state | Airtable update | Working; Email notification set to Sent after sending |
| Email failure handling | Make error handler route on the email step | Working; record kept and marked Failed, scenario not stopped |

SMS (Stage 2) is not built yet.

## Tests run

| ID | Case | Result |
| --- | --- | --- |
| T01 | Valid desktop enquiry | Pass: one record, one email, record marked Sent |
| T11 | Email failure (invalid Zoho account ID) | Pass: record kept, marked Failed, no email sent, scenario kept running |
| – | Email to an undeliverable address | Limitation found, see below |

Not yet run: T02 phone, T03 to T05 validation, T07 double click, T08 replay, T09 two enquiries from one person, T10 SMS failure, T13 interrupted automation, and the rest of the suite in the [delivery and test plan](03-delivery-and-test-plan.md). The scenario has been switched on to run without manual starts; a test run after switching on is still to be confirmed.

## Problems found and fixed

- **Search with no results still continues.** Make’s Airtable search passes on one summary bundle (“Total number of bundles: 0”) when nothing matches. A counting step added in between counted that summary as 1 and blocked every new enquiry. Fixed by removing the counting step and filtering on Total number of bundles = 0.
- **Tally sends answers as a list.** Answers arrive under `data.fields`, each with a label and a value. Mapped by question label so the mapping survives reordering; labels in Tally must match exactly.
- **Typed values starting with `/`.** Make treats `/` as the start of a keyword, so values must be typed without it.
- **Placeholder text in the email.** Square-bracket placeholders were sent literally until replaced with mapped fields.

## Limitation: “Sent” is not “delivered”

With the recipient changed to an address that cannot receive email, Zoho accepted the message, Make marked the record Sent, and the failure appeared only as a bounce in the sender’s inbox a few seconds later. The record therefore shows that the provider accepted the email, not that the owner received it. This matches the warning in the [delivery and test plan](03-delivery-and-test-plan.md) about distinguishing provider acceptance from delivery.

Before offering this to a client: confirm the owner’s notification address with a live test at setup, watch for bounces, and add a second route such as SMS. Do not describe Sent as proof of delivery.

## Costs observed

- Make: about 1 credit per step, so roughly 6 to 7 credits per enquiry for the full Stage 1 flow on the free plan (1,000 credits a month).
- Tally, Airtable and Zoho: no extra cost at test volumes. Airtable started a paid-plan trial automatically; the base is expected to continue on the free plan when the trial ends.
- Build time: record Oscar’s actual hours in the private log; this feeds decision D04.

## Accounts used

Make, Tally and Airtable are on Oscar’s personal sign-in for testing. Move them to a business address before client work, and use client-owned accounts for paid installations as proposed in decision D05. Two-factor authentication should be enabled on each.

## Next

1. Confirm one enquiry runs with the scenario switched on and no manual start.
2. Run T02, T03, T04, T07 and T09, then restore the setup and re-run T01.
3. Stage 2: add Twilio SMS and test T10.
4. Record build hours and costs against decisions D04 and D06 in the [decision register](10-decisions.md).
