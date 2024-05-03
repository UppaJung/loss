---
title: Pilot 8
# author: <a href="https://www.stuartschechter.org">Stuart</a>
templateEngine: [vto, md]
date: 2024-02-22
tags:
  - background
  - methodology
---

[Qualtrics](https://harvard.az1.qualtrics.com/survey-builder/SV_8fiaLOqpnLLq7Ea/edit?SurveyID=SV_3sJejDu4fm4KaGO)

[To-do list](./to-do.md)

### New in this pilot

There are now two harm-first scenarios, for photos/videos and emails, at the start. The answers are not paired to the initial 3 event stories. (see to-do)

All event-first scenarios are now randomized. Paired scenarios (compromise vs. lock-out) are always adjacent but their order is randomized (so questions about devices will always be together, but compromise may be before lock-out or vice versa).

For the paired scenarios, the intro paragraph covers scope for both the compromise and lock-out scenario (devices in scope, accounts out of scope; social accounts in scope, other types of accounts out of scope, etc.).

A few answers were added mid-pilot after 10 participants and then after 20, so the pilot is for testing purposes and not interpretive purposes.

If these 20 participants are representative of the population, a big headline of this study is that data loss is a huge problem and that while tech promises to ensure our memories do not degrade over time, it's collectively failing to deliver that.

## Results

There were {{ data.numberOfParticipants }} participants in this pilot.  We paid more ($4.50) since the survey now takes a median of ~15 minutes. We learned that the great majority of people have lost photos and emails. Loss, it seems, is expected. This seems to capture something that our event-focused scenarios do not.

The new event-focused scenarios seem to capture a good deal of what our old event-focused scenarios missed.

Participants started by writing [loss stories](./loss-stories.md) about the three worst technology-related harms they had experienced. 

We then told participants we would "describe technology-related harms that that have happened to others, and ask if they have also happened to" them.



<!-- ----------------------------------------------------- -->
<details>
<summary>New Graphs</summary>

<figure><img src="/graphs/Pilot8/harm-likert-absolute.svg" alt=""/></figure>
<figure><img src="/graphs/Pilot8/harm-likert-percent.svg" alt=""/></figure>
<figure><img src="/graphs/Pilot8/lost-photos-percent.svg" alt=""/></figure>
<figure><img src="/graphs/Pilot8/lost-emails-percent.svg" alt=""/></figure>
<figure><img src="/graphs/Pilot8/lost-photos-percent-cdf.svg" alt=""/></figure>
<figure><img src="/graphs/Pilot8/lost-emails-percent-cdf.svg" alt=""/></figure>

</details>
<!-- ----------------------------------------------------- -->

<!-- ----------------------------------------------------- -->
<details>
<summary>Summary Across Scenarios</summary>

<figure>
  <img src="/graphs/Pilot8/scenario-bar-chart.svg" alt="A bar chart summarizing the percent of participants who had experienced each harm scenario."/>
  <figcaption>The percent of participants who had experienced each harm scenario. Losses due to failures of security measures to protect participants from attack are paired (left bar) against harms due to security measures themselves harming participants (right bar).</figcaption>
</figure>
<figure><img src="/graphs/Pilot8/scenario-harm-likert-absolute.svg" alt="TBD"/></figure>
<figure><img src="/graphs/Pilot8/scenario-harm-likert-percent.svg" alt="TBD"/></figure>

When participants reported having suffered one of the described scenarios, we asked them how recently they had experienced it.

<figure>
  <img src="/graphs/Pilot8/scenario-recency-bar-chart.svg" alt="A bar chart summarizing how recently participants who had experienced each harm scenario."/>
  <figcaption>The absolute number of participants who had experienced each harm scenario for each level of recency.</figcaption>
</figure>

<figure>
  <img src="/graphs/Pilot8/scenario-recovery-duration-bar-chart.svg" alt=""/>
  <figcaption>Recovery duration for each scenario (absolute figures).</figcaption>
</figure>

<figure>
  <img src="/graphs/Pilot8/scatter-age-vs-scenario-count.svg" alt=""/>
  <figcaption>Have older people experienced more types of harmful events?</figcaption>
</figure>

</details>
<!-- ----------------------------------------------------- -->
<details>
<summary>Scenario Pair: Device Compromise & Lockout</summary>

We asked participants who had a device compromised/stolen or locked what type of device it was. (If they had experienced more than one incident of a scenario we asked about the worst.)

<figure>
  <img src="/graphs/Pilot8/device-bar-chart.svg" alt="A bar chart summarizing the number of devices of each type that were lost or hacked."/>
  <figcaption>The absolute number of devices of each type that participants had suffered the compromise of (left bar in pair) or had been locked out of (right bar in pair).</figcaption>
</figure>
<figure><img src="/graphs/Pilot8/hacked-device-dur-bar-chart.svg" alt="TBD"/></figure>


<figure>
  <img src="/graphs/Pilot8/hacked-device-how-bar-chart.svg" alt="A bar chart summarizing how devices were compromised."/>
  <figcaption>How devices were compromised.</figcaption>
</figure>

<figure>
  <img src="/graphs/Pilot8/locked-device-how-bar-chart.svg" alt="A bar chart summarizing how participants reported being locked out of their devices."/>
  <figcaption>How users were locked out of their devices.</figcaption>
</figure>

<figure><img src="/graphs/Pilot8/locked-device-recdat-bar-chart.svg" alt="TBD"/></figure>
<figure><img src="/graphs/Pilot8/locked-device-dur-bar-chart.svg" alt="TBD"/></figure>

</details>
<!-- ----------------------------------------------------- -->
<details>
<summary>Scenario Pair: Email/File Account Compromise & Lockout</summary>
<figure>
  <img src="/graphs/Pilot8/account-type-bar-chart.svg" alt="A bar chart summarizing the number of devices of each type that were lost or hacked."/>
  <figcaption>The types of accounts that participants had suffered the compromise of (left bar in pair) or had been locked out of (right bar in pair).</figcaption>
</figure>

<figure><img src="/graphs/Pilot8/hacked-acct-how-bar-chart.svg" alt="TBD"/></figure>
<figure><img src="/graphs/Pilot8/hacked-acct-type-bar-chart.svg" alt="TBD"/></figure>
<figure><img src="/graphs/Pilot8/hacked-acct-dur-bar-chart.svg" alt="TBD"/></figure>
<figure><img src="/graphs/Pilot8/locked-acct-how-bar-chart.svg" alt="TBD"/></figure>
<figure><img src="/graphs/Pilot8/locked-acct-type-bar-chart.svg" alt="TBD"/></figure>
<figure><img src="/graphs/Pilot8/locked-acct-dur-bar-chart.svg" alt="TBD"/></figure>

</details>
<!-- ----------------------------------------------------- -->
<details>
<summary>Scenario Pair: Social Account Compromise & Lockout</summary>
<figure>
  <img src="/graphs/Pilot8/social-account-type-bar-chart.svg" alt="A bar chart summarizing the number of devices of each type that were lost or hacked."/>
  <figcaption>The types of social accounts that participants had suffered the compromise of (left bar in pair) or had been locked out of (right bar in pair).</figcaption>
</figure>

<figure><img src="/graphs/Pilot8/hacked-soc-how-bar-chart.svg" alt="TBD"/></figure>
<figure><img src="/graphs/Pilot8/hacked-soc-type-bar-chart.svg" alt="TBD"/></figure>
<figure><img src="/graphs/Pilot8/locked-soc-how-bar-chart.svg" alt="TBD"/></figure>
<figure><img src="/graphs/Pilot8/locked-soc-type-bar-chart.svg" alt="TBD"/></figure>
<figure><img src="/graphs/Pilot8/locked-soc-dur-bar-chart.svg" alt="TBD"/></figure>

</details>
<!-- ----------------------------------------------------- -->
<details>
<summary>Scenario Pair: Financial Account Compromise & Lockout</summary>
<figure>
  <img src="/graphs/Pilot8/financial-account-type-bar-chart.svg" alt="A bar chart summarizing the number of devices of each type that were lost or compromised."/>
  <figcaption>The types of financial accounts that participants had suffered the compromise of (left bar in pair) or had been locked out of (right bar in pair).</figcaption>
</figure>

<figure><img src="/graphs/Pilot8/hacked-bank-how-bar-chart.svg" alt="TBD"/></figure>
<figure><img src="/graphs/Pilot8/hacked-bank-type-bar-chart.svg" alt="TBD"/></figure>
<figure><img src="/graphs/Pilot8/locked-bank-how-bar-chart.svg" alt="TBD"/></figure>
<figure><img src="/graphs/Pilot8/locked-bank-type-bar-chart.svg" alt="TBD"/></figure>
<figure><img src="/graphs/Pilot8/locked-bank-dur-bar-chart.svg" alt="TBD"/></figure>

</details>
<!-- ----------------------------------------------------- -->
<details>
<summary>Scenario: Replaced/Upgrade Device/OS</summary>

<figure><img src="/graphs/Pilot8/swap-device-what-bar-chart.svg" alt="TBD"/></figure>
<figure><img src="/graphs/Pilot8/swap-device-harm-bar-chart.svg" alt="TBD"/></figure>
<figure><img src="/graphs/Pilot8/swap-device-dur-bar-chart.svg" alt="TBD"/></figure>
</details>
<!-- ----------------------------------------------------- -->
<details>
<summary>Scenario: Broken Promises and Unexpected Behaviors</summary>
<figure><img src="/graphs/Pilot8/disconnect-how-bar-chart.svg" alt="TBD"/></figure>
<figure><img src="/graphs/Pilot8/disconnect-harm-bar-chart.svg" alt="TBD"/></figure>
<figure><img src="/graphs/Pilot8/disconnect-dur-bar-chart.svg" alt="TBD"/></figure>
</details>
<!-- ----------------------------------------------------- -->
