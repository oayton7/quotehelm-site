# Learn through delivery

Use a small number of tools to complete real tasks. One conversational assistant for thinking/documentation and one coding agent for implementation is enough to begin. The goal is to understand and operate a useful workflow, not to collect subscriptions or produce a large codebase.

## Learning sequence

| Project | Skill | Evidence of understanding |
| --- | --- | --- |
| Explain and edit the homepage offer | Clear requirements and basic HTML/CSS | You can identify the visitor, offer, cost and next action |
| Change a price on a branch | Git, diffs and consistency | You can review what changed and revert it |
| Build a private form | Validation and data design | You know which fields are required and why |
| Connect storage and notifications | Events, webhooks and service boundaries | You can trace an enquiry through every step |
| Replay an event | IDs and deduplication | One event does not create repeated messages |
| Simulate a supplier failure | Debugging and recovery | The enquiry remains accessible and can be recovered |
| Deploy and roll back | Hosting, configuration and release discipline | You can restore a working version |
| Hand over the pilot | Documentation and customer communication | Another person can follow the instructions |
| Measure results | Basic commercial analysis | You separate notification success, human response and jobs won |

## Prompt patterns

Before building:

> Explain the proposed workflow in plain English. List the inputs, stored records, actions, costs and failure cases. Identify what depends on a third party. Do not make changes yet.

For implementation:

> Implement only this agreed step. Keep credentials out of source. Show the diff, explain assumptions and give me a way to verify the behaviour. Do not add unrelated features.

For debugging:

> Here is the sanitised error and expected behaviour. Identify the failing boundary, propose the smallest repair, and explain how to check recovery and avoid duplicate actions.

For learning:

> Ask me five questions that test whether I understand this change. Focus on what happens if the input is wrong, an API fails or a user submits twice.

Never paste credentials, employer information or unapproved client data into a tool. Sanitise logs before sharing. Use an assistant to inspect evidence and explain tradeoffs; maintain your own approval of production actions.

## Ready to sell

You can explain what the system does, demonstrate it, recognise failure, recover it, estimate its running costs and hand it over. If you can only reproduce a successful demo by following an unexplained prompt, continue the practice build before accepting a live operational dependency.
