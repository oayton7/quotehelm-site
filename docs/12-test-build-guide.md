# Build the test enquiry flow

A click-by-click guide for days 4 to 6 of [Start here](00-start-here.md). It builds the working test case from the [delivery and test plan](03-delivery-and-test-plan.md) with Tally, Make, Airtable and, later, Twilio. These are candidate tools under evaluation, not a final supplier choice. Screen and button names change over time, so follow the intent of each step if a label differs.

Use synthetic enquiries only. Every notification goes to an inbox and phone that Oscar controls. Never put a real customer’s details into the test setup, and never commit test exports or screenshots containing personal data to this repository.

## Stage 1: form, record and email

**Finished when:** one test submission creates exactly one Airtable record and one email, and the record shows the email as sent.

### 1. Record store (Airtable)

Create a base called **Tandem test** with a table called **Enquiries**:

| Field | Type | Purpose |
| --- | --- | --- |
| Enquiry ID | Single line text | Tally’s response ID, used to stop duplicates |
| Submitted at | Date with time | When the form was sent |
| Name | Single line text | Contact |
| Phone | Phone number | Contact |
| Email | Email | Contact |
| Postcode | Single line text | Area check |
| Job description | Long text | What the customer needs |
| Source | Single line text | Which form or website it came from |
| Status | Single select: New, Contacted, Quoted, Won, Closed | Owner’s progress |
| Email notification | Single select: Pending, Sent, Failed | Delivery state, kept separate from Status |
| SMS notification | Single select: Not set up, Pending, Sent, Failed | Delivery state, kept separate from Status |
| Notes | Long text | Failures, fixes and owner notes |

A Google Sheet with the same columns is an acceptable substitute if Airtable is unsuitable.

### 2. Form (Tally)

1. Create a form called **Test bathroom enquiry**.
2. Add required fields: **Name**, **Phone**, **Email**, **Postcode** and **What do you need?** (long answer).
3. Set the thank-you text to something truthful, for example: "Thanks, your enquiry has been sent. We will reply as soon as we can." Do not promise a response time that has not been agreed.
4. Publish it. Do not embed it on any website yet.

### 3. Automation (Make)

Create a scenario called **Test enquiry flow** with these modules in order. Save often (Cmd+S); a new scenario that has not been saved is lost if the tab closes.

1. **Webhooks: Custom webhook.** Create a webhook, copy its address and paste it into the form’s Tally **Integrations → Webhooks** as the endpoint URL. Keep the address private. Click **Run once** and submit a test so Make learns the data structure. Tally sends the answers as a list under `data.fields`, each with a `label` (the question) and a `value` (the answer), and a unique `data.responseId`.
2. **Airtable: Search records** (connection type Airtable OAuth, with access to the test base only). Filter type **Airtable formula**, formula `{Enquiry ID} = "{{1.data.responseId}}"`, limit 1.
3. **Filter** on the link to the next module: label `New enquiries only`, condition **Total number of bundles** (from Search records) **Numeric: Equal to** `0`. When nothing matches, Make’s Airtable search still passes on one summary bundle with that total, so filter on the total rather than on whether a bundle arrived. An aggregator is not needed and would count the summary bundle as 1. This stops one submission being saved or notified twice (tests T07 and T08).
4. **Airtable: Create a record.** Map:

| Field | Value |
| --- | --- |
| Enquiry ID | `{{1.data.responseId}}` |
| Submitted at | `{{1.createdAt}}` (time zone Europe/London) |
| Name | `{{get(map(1.data.fields; "value"; "label"; "Name"); 1)}}` |
| Phone | `{{get(map(1.data.fields; "value"; "label"; "Phone"); 1)}}` |
| Email | `{{get(map(1.data.fields; "value"; "label"; "Email"); 1)}}` |
| Postcode | `{{get(map(1.data.fields; "value"; "label"; "Postcode"); 1)}}` |
| Job description | `{{get(map(1.data.fields; "value"; "label"; "What do you need?"); 1)}}` |
| Source | `Tally test form` |
| Status, Email notification, SMS notification | Switch **Map** on and type `New`, `Pending` and `Not set up` |

Pasted `{{…}}` expressions turn into coloured tags; Make drops the quote marks inside functions. Do not start a typed value with `/`, which opens Make’s keyword menu. Looking answers up by question label keeps the mapping working if the question order changes, but the labels in Tally must match exactly.

5. **Email: Send an email** to Oscar’s own inbox, using the Zoho Mail module or an SMTP connection. Suggested subject: `New enquiry: {Name}, {Postcode}`. Include the job description, phone and email in the body.
6. **Airtable: Update a record.** Set **Email notification** to Sent.
7. Add an **error handler** to the email module that updates the record to **Email notification: Failed** and writes the error into **Notes**. The record must survive an email failure (test T11).

The webhook, search, filter and create steps were confirmed working on 29 October 2026 (one submission produced one record). Each run used about 1 credit per module.

Turn the scenario on and submit one enquiry, for example: *Test Person, Oscar’s own phone and email, PO19 1AA, "Replace bath with walk-in shower, flexible on dates."*

## Stage 2: add SMS (Twilio)

**Finished when:** the same submission also sends one text to Oscar’s own mobile and the record shows the SMS as sent.

1. Create a Twilio trial account and verify Oscar’s own mobile number. Trial accounts can usually only text verified numbers.
2. Check what Twilio requires before issuing a UK number or sender. Identity or address checks may apply and can take time. Record what was required and how long it took; this affects any promised lead time.
3. In Make, after the email steps, add **Twilio: Send an SMS** to Oscar’s mobile. Keep the text short, for example: `New enquiry from {Name}, {Postcode}. Check your email for details.`
4. Add an **Airtable: Update a record** step setting **SMS notification** to Sent, and an error handler setting it to Failed with the error in **Notes** (test T10).
5. Record the cost of each text and the number rental in the test log.

## Stage 3: run the tests

Copy the [test log template](templates/test-log.md) to a private location and work through the acceptance tests in the [delivery and test plan](03-delivery-and-test-plan.md). Write the expected result before running each test. A suggested first batch:

| Test | How to run it |
| --- | --- |
| T01 | Submit a valid enquiry on a desktop browser |
| T02 | Submit a valid enquiry on a phone |
| T03 | Leave a required field blank |
| T04 | Enter an email address without an @ |
| T07 | Double-click the submit button |
| T09 | Send two different genuine enquiries from the same person |
| T10 | Change the SMS destination to an invalid number, then submit |
| T11 | Change the email recipient to an invalid address, then submit |
| T13 | Turn the scenario off, submit, turn it back on and check the backlog is processed once |

Restore the correct settings after each failure test and re-run T01 to confirm recovery.

## Costs and limits to record

- Make credits used per enquiry. The free plan allowance is reportedly 1,000 credits a month; confirm on Make’s pricing page.
- Tally, Airtable and Twilio plan limits that the test reached or came close to.
- Cost per SMS and per number, from the Twilio console rather than third-party price lists.
- Total time spent building, testing and fixing.

These figures feed decisions D04, D05 and D06 in the [decision register](10-decisions.md).
