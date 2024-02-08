---
title: Pilot 7
# author: <a href="https://www.stuartschechter.org">Stuart</a>
templateEngine: [vto, md]
date: Git Last Modified
tags:
  - background
  - methodology
---

### New in this pilot

We now have a scenario about replacing/upgrading devices as well as one about unexpected behavior and broken promises. We also have a likert scale (see the second and third graphs below.)

Stuart updated the scripts so that the loss stories are annotated with the categorization that the participant matched them to.

Stuart added a graph of duration of harm across scenarios.

### Stuart's notes on reading loss stories.

Lots of great loss stories. Worth the read. After reading, participant 22 and 49, they seem most likely to be the result of feeding the questions into an LLM (large language model). Participant 46 did not answer initial questions in a meaningful way.

A number of respondents describe events that happened to friends or loved ones. We may want to emphasize that they should only harms due to themselves or due to their own reliance on technology. (Good meeting discussion topic.)

The distinction between having a device or account hacked is something that might have been clear in the 1990s, but with one's Apple ID or Google Account ID becoming our means of moving identity amongst devices, this line is now very blurred.

### Changes for analysis in progress for this pilot

 - Add a how graph over all hacked accounts
 - Add a how graph over all locked accounts.

### Discussion for next pilot

Possible scenarios:
 - Lost attention, wasted time, and addiction
 - Harassment, bullying, impersonation, or embarrassment (or exposure to others being harassed, bullied, impersonated, or embarrassed)
 - Harms due to others' use of, reliance on, or addiction to technology?
 - Social distance as interactions become less personal
 - Navigation and scheduling failures?
 - General mental health decline?
 - General social decline?

Ordering effects of scenarios


## Results

There were {{ data.numberOfParticipants }} participants in this pilot.

Participants started by writing [loss stories](./loss-stories.md) about the three worst technology-related harms they had experienced. 


We then told participants we would "describe technology-related harms that that have happened to others, and ask if they have also happened to" them.

<!-- ----------------------------------------------------- -->
<details>
<summary>Summary Across Scenarios</summary>

<figure>
  <img src="/graphs/pilot7/scenario-bar-chart.svg" alt="A bar chart summarizing the percent of participants who had experienced each harm scenario."/>
  <figcaption>The percent of participants who had experienced each harm scenario. Losses due to failures of security measures to protect participants from attack are paired (left bar) against harms due to security measures themselves harming participants (right bar).</figcaption>
</figure>
<figure><img src="/graphs/pilot7/scenario-harm-likert-absolute.svg" alt="TBD"/></figure>
<figure><img src="/graphs/pilot7/scenario-harm-likert-percent.svg" alt="TBD"/></figure>

When participants reported having suffered one of the described scenarios, we asked them how recently they had experienced it.

<figure>
  <img src="/graphs/pilot7/scenario-recency-bar-chart.svg" alt="A bar chart summarizing how recently participants who had experienced each harm scenario."/>
  <figcaption>The absolute number of participants who had experienced each harm scenario for each level of recency.</figcaption>
</figure>

<figure>
  <img src="/graphs/Pilot7/scenario-recovery-duration-bar-chart.svg" alt=""/>
  <figcaption>Recovery duration for each scenario (absolute figures).</figcaption>
</figure>

</details>
<!-- ----------------------------------------------------- -->
<details>
<summary>Scenario Pair: Device Compromise & Lockout</summary>

We asked participants who had a device compromised/stolen or locked what type of device it was. (If they had experienced more than one incident of a scenario we asked about the worst.)

<figure>
  <img src="/graphs/pilot7/device-bar-chart.svg" alt="A bar chart summarizing the number of devices of each type that were lost or hacked."/>
  <figcaption>The absolute number of devices of each type that participants had suffered the compromise of (left bar in pair) or had been locked out of (right bar in pair).</figcaption>
</figure>
<figure><img src="/graphs/pilot7/hacked-device-dur-bar-chart.svg" alt="TBD"/></figure>


<figure>
  <img src="/graphs/pilot7/hacked-device-how-bar-chart.svg" alt="A bar chart summarizing how devices were compromised."/>
  <figcaption>How devices were compromised.</figcaption>
</figure>

<figure>
  <img src="/graphs/pilot7/locked-device-how-bar-chart.svg" alt="A bar chart summarizing how participants reported being locked out of their devices."/>
  <figcaption>How users were locked out of their devices.</figcaption>
</figure>

<figure><img src="/graphs/pilot7/locked-device-recdat-bar-chart.svg" alt="TBD"/></figure>
<figure><img src="/graphs/pilot7/locked-device-dur-bar-chart.svg" alt="TBD"/></figure>

</details>
<!-- ----------------------------------------------------- -->
<details>
<summary>Scenario Pair: Email/File Account Compromise & Lockout</summary>
<figure>
  <img src="/graphs/pilot7/account-type-bar-chart.svg" alt="A bar chart summarizing the number of devices of each type that were lost or hacked."/>
  <figcaption>The types of accounts that participants had suffered the compromise of (left bar in pair) or had been locked out of (right bar in pair).</figcaption>
</figure>

<figure><img src="/graphs/pilot7/hacked-acct-how-bar-chart.svg" alt="TBD"/></figure>
<figure><img src="/graphs/pilot7/hacked-acct-type-bar-chart.svg" alt="TBD"/></figure>
<figure><img src="/graphs/pilot7/hacked-acct-dur-bar-chart.svg" alt="TBD"/></figure>
<figure><img src="/graphs/pilot7/locked-acct-how-bar-chart.svg" alt="TBD"/></figure>
<figure><img src="/graphs/pilot7/locked-acct-type-bar-chart.svg" alt="TBD"/></figure>
<figure><img src="/graphs/pilot7/locked-acct-dur-bar-chart.svg" alt="TBD"/></figure>

</details>
<!-- ----------------------------------------------------- -->
<details>
<summary>Scenario Pair: Social Account Compromise & Lockout</summary>
<figure>
  <img src="/graphs/pilot7/social-account-type-bar-chart.svg" alt="A bar chart summarizing the number of devices of each type that were lost or hacked."/>
  <figcaption>The types of social accounts that participants had suffered the compromise of (left bar in pair) or had been locked out of (right bar in pair).</figcaption>
</figure>

<figure><img src="/graphs/pilot7/hacked-soc-how-bar-chart.svg" alt="TBD"/></figure>
<figure><img src="/graphs/pilot7/hacked-soc-type-bar-chart.svg" alt="TBD"/></figure>
<figure><img src="/graphs/pilot7/locked-soc-how-bar-chart.svg" alt="TBD"/></figure>
<figure><img src="/graphs/pilot7/locked-soc-type-bar-chart.svg" alt="TBD"/></figure>
<figure><img src="/graphs/pilot7/locked-soc-dur-bar-chart.svg" alt="TBD"/></figure>

</details>
<!-- ----------------------------------------------------- -->
<details>
<summary>Scenario Pair: Financial Account Compromise & Lockout</summary>
<figure>
  <img src="/graphs/pilot7/financial-account-type-bar-chart.svg" alt="A bar chart summarizing the number of devices of each type that were lost or compromised."/>
  <figcaption>The types of financial accounts that participants had suffered the compromise of (left bar in pair) or had been locked out of (right bar in pair).</figcaption>
</figure>

<figure><img src="/graphs/pilot7/hacked-bank-how-bar-chart.svg" alt="TBD"/></figure>
<figure><img src="/graphs/pilot7/hacked-bank-type-bar-chart.svg" alt="TBD"/></figure>
<figure><img src="/graphs/pilot7/locked-bank-how-bar-chart.svg" alt="TBD"/></figure>
<figure><img src="/graphs/pilot7/locked-bank-type-bar-chart.svg" alt="TBD"/></figure>
<figure><img src="/graphs/pilot7/locked-bank-dur-bar-chart.svg" alt="TBD"/></figure>

</details>
<!-- ----------------------------------------------------- -->
<details>
<summary>Scenario: Replaced/Upgrade Device/OS</summary>

<figure><img src="/graphs/pilot7/swap-device-what-bar-chart.svg" alt="TBD"/></figure>
<figure><img src="/graphs/pilot7/swap-device-harm-bar-chart.svg" alt="TBD"/></figure>
<figure><img src="/graphs/pilot7/swap-device-dur-bar-chart.svg" alt="TBD"/></figure>
</details>
<!-- ----------------------------------------------------- -->
<details>
<summary>Scenario: Broken Promises and Unexpected Behaviors</summary>
<figure><img src="/graphs/pilot7/disconnect-how-bar-chart.svg" alt="TBD"/></figure>
<figure><img src="/graphs/pilot7/disconnect-harm-bar-chart.svg" alt="TBD"/></figure>
<figure><img src="/graphs/pilot7/disconnect-dur-bar-chart.svg" alt="TBD"/></figure>
</details>
<!-- ----------------------------------------------------- -->
