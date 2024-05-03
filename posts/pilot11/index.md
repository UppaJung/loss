---
title: Pilot 11 Updates
# author: <a href="https://www.stuartschechter.org">Stuart</a>
templateEngine: [vto, md]
date: Git Last Modified
tags:
  - background
  - methodology
---

Authorized members of the research team can access the [Qualtrics survey](https://harvard.az1.qualtrics.com/survey-builder/SV_4VJxxO9vcLYIN2C) here. Others can see the survey contents [here](/design).

Stuart manually read all 30 responses, [took notes](./stuarts-data-notes), identified two participants to follow-up with, and removed one participant who appeared not to have participated in good faith. All messages and responses are in those [notes](./stuarts-data-notes).

## New in this pilot

We added a new topic: mental-health harm.

After a large number of responses in Pilot 10 that appeared to be automated, disingenuous, or otherwise not provided in good faith, we noted in both the Prolific advertisement and the consent form that we would be manually reviewing every response before approving it and releasing compensation.

We increased the payment to $4.50 per participant as the median time to take the survey increased from 15 to 20 minutes.

## Results

There were {{ data.numberOfParticipants }} participants in this pilot. 

**Due to a survey error**, the first 10 participants were only assigned (at random) to 2 of 3 loss-focused scenarios. (When we added mental health, a 2 choose 2 to randomize order became 3 choose 2). The percents of participants who responded to these are adjusted to be among only those who were asked about the harm.

We were so surprised that over 80\% of participants linked the mental health topic back to one of their three-worst tech harms that we manually checked the data. Participants 1, 7, and 8 were not asked about mental health due to the survey error impacting the first 10 participants. Of the 26 others asked, one can see from the [loss stories](./loss-stories.md) (and the raw survey data that we double-checked) that 22 did indeed connect mental health back to their three worst harms.

Participants started by writing [loss stories](./loss-stories.md) about the three worst technology-related harms they had experienced. 


<!-- <figure><img src="/graphs/Pilot11/harm-likert-absolute.svg" alt=""/></figure>
<figure><img src="/graphs/Pilot11/harm-likert-percent.svg" alt=""/></figure> -->


<!-- ----------------------------------------------------- -->
<details>
<summary>Summary Across Scenarios</summary>

<figure>
  <img src="/graphs/Pilot11/scenario-harm-likert-percent.svg" alt="TBD"/>
  <figcaption>The percent of <i>pilot</i> participants who reported experiencing events causing harms (the 13 bars on the left) or technology-related harms that they did not need to associate with specific events (the 3 bars on the right). Losses due to failures of security measures to protect participants from attack are paired (left bar) against harms due to security measures themselves harming participants (right bar). Each bar is broken down into colors by the Likert severity of harm each participant reported on a Likert scale.</figcaption>
</figure>
<figure>
  <img src="/graphs/Pilot11/scenario-bar-chart.svg" alt="A bar chart summarizing the percent of participants who had experienced each harm event."/>
  <figcaption>The percent of <i>pilot</i> participants who reported experiencing events causing harms (the 13 bars on the left) or technology-related harms that they did not need to associate with specific events (the 3 bars on the right). Losses due to failures of security measures to protect participants from attack are paired (left bar) against harms due to security measures themselves harming participants (right bar). Each bar is broken down into colors based on whether the participant connected the experience/harm to one of the three worst experiences they described at the start of the study ("original"), whether they said they should have included the experience/harm as one of their three worst ("revised"), or whether it did not warrant a position in their top three ("not worst"). Those that had suffered the experience/harm are broken down into those who believe the harm could or could not happen to them.</figcaption>
</figure>
<!-- <figure><img src="/graphs/Pilot11/scenario-harm-likert-absolute.svg" alt="TBD"/></figure> -->

When participants reported having suffered one of the described scenarios, we asked them how recently they had experienced it.

<figure>
  <img src="/graphs/Pilot11/scenario-recency-bar-chart.svg" alt="A bar chart summarizing how recently participants who had experienced each harm scenario."/>
  <figcaption>The absolute number of participants who had experienced each harm event for each level of recency.</figcaption>
</figure>

<figure>
  <img src="/graphs/Pilot11/scenario-recovery-duration-bar-chart.svg" alt=""/>
  <figcaption>Recovery duration for each harm event (absolute figures).</figcaption>
</figure>

<figure>
  <img src="/graphs/Pilot11/scatter-age-vs-scenario-count.svg" alt=""/>
  <figcaption>Have older people experienced more types of harmful events?</figcaption>
</figure>

</details>
<!-- ----------------------------------------------------- -->
<details>
<summary>Scenario Pair: Device Compromise & Lockout</summary>

We asked participants who had a device compromised/stolen or locked what type of device it was. (If they had experienced more than one incident of a scenario we asked about the worst.)

<figure>
  <img src="/graphs/Pilot11/device-bar-chart.svg" alt="A bar chart summarizing the number of devices of each type that were lost or hacked."/>
  <figcaption>The absolute number of devices of each type that participants had suffered the compromise of (left bar in pair) or had been locked out of (right bar in pair).</figcaption>
</figure>
<figure><img src="/graphs/Pilot11/hacked-device-dur-bar-chart.svg" alt="TBD"/></figure>


<figure>
  <img src="/graphs/Pilot11/hacked-device-how-bar-chart.svg" alt="A bar chart summarizing how devices were compromised."/>
  <figcaption>How devices were compromised.</figcaption>
</figure>

<figure>
  <img src="/graphs/Pilot11/locked-device-how-bar-chart.svg" alt="A bar chart summarizing how participants reported being locked out of their devices."/>
  <figcaption>How users were locked out of their devices.</figcaption>
</figure>

<figure><img src="/graphs/Pilot11/locked-device-recdat-bar-chart.svg" alt="TBD"/></figure>
<figure><img src="/graphs/Pilot11/locked-device-dur-bar-chart.svg" alt="TBD"/></figure>

</details>
<!-- ----------------------------------------------------- -->
<details>
<summary>Scenario Pair: Email/File Account Compromise & Lockout</summary>
<figure>
  <img src="/graphs/Pilot11/account-type-bar-chart.svg" alt="A bar chart summarizing the number of devices of each type that were lost or hacked."/>
  <figcaption>The types of accounts that participants had suffered the compromise of (left bar in pair) or had been locked out of (right bar in pair).</figcaption>
</figure>

<figure><img src="/graphs/Pilot11/hacked-acct-how-bar-chart.svg" alt="TBD"/></figure>
<figure><img src="/graphs/Pilot11/hacked-acct-type-bar-chart.svg" alt="TBD"/></figure>
<figure><img src="/graphs/Pilot11/hacked-acct-dur-bar-chart.svg" alt="TBD"/></figure>
<figure><img src="/graphs/Pilot11/locked-acct-how-bar-chart.svg" alt="TBD"/></figure>
<figure><img src="/graphs/Pilot11/locked-acct-type-bar-chart.svg" alt="TBD"/></figure>
<figure><img src="/graphs/Pilot11/locked-acct-dur-bar-chart.svg" alt="TBD"/></figure>

</details>
<!-- ----------------------------------------------------- -->
<details>
<summary>Scenario Pair: Social Account Compromise & Lockout</summary>
<figure>
  <img src="/graphs/Pilot11/social-account-type-bar-chart.svg" alt="A bar chart summarizing the number of devices of each type that were lost or hacked."/>
  <figcaption>The types of social accounts that participants had suffered the compromise of (left bar in pair) or had been locked out of (right bar in pair).</figcaption>
</figure>

<figure><img src="/graphs/Pilot11/hacked-soc-how-bar-chart.svg" alt="TBD"/></figure>
<figure><img src="/graphs/Pilot11/hacked-soc-type-bar-chart.svg" alt="TBD"/></figure>
<figure><img src="/graphs/Pilot11/locked-soc-how-bar-chart.svg" alt="TBD"/></figure>
<figure><img src="/graphs/Pilot11/locked-soc-type-bar-chart.svg" alt="TBD"/></figure>
<figure><img src="/graphs/Pilot11/locked-soc-dur-bar-chart.svg" alt="TBD"/></figure>

</details>
<!-- ----------------------------------------------------- -->
<details>
<summary>Scenario Pair: Financial Account Compromise & Lockout</summary>
<figure>
  <img src="/graphs/Pilot11/financial-account-type-bar-chart.svg" alt="A bar chart summarizing the number of devices of each type that were lost or compromised."/>
  <figcaption>The types of financial accounts that participants had suffered the compromise of (left bar in pair) or had been locked out of (right bar in pair).</figcaption>
</figure>

<figure><img src="/graphs/Pilot11/hacked-bank-how-bar-chart.svg" alt="TBD"/></figure>
<figure><img src="/graphs/Pilot11/hacked-bank-type-bar-chart.svg" alt="TBD"/></figure>
<figure><img src="/graphs/Pilot11/locked-bank-how-bar-chart.svg" alt="TBD"/></figure>
<figure><img src="/graphs/Pilot11/locked-bank-type-bar-chart.svg" alt="TBD"/></figure>
<figure><img src="/graphs/Pilot11/locked-bank-dur-bar-chart.svg" alt="TBD"/></figure>

</details>
<!-- ----------------------------------------------------- -->
<details>
<summary>Scenario: Replaced/Upgrade Device/OS</summary>

<figure><img src="/graphs/Pilot11/swap-device-what-bar-chart.svg" alt="TBD"/></figure>
<figure><img src="/graphs/Pilot11/swap-device-harm-bar-chart.svg" alt="TBD"/></figure>
<figure><img src="/graphs/Pilot11/swap-device-dur-bar-chart.svg" alt="TBD"/></figure>
</details>
<!-- ----------------------------------------------------- -->
<details>
<summary>Scenario: Broken Promises and Unexpected Behaviors</summary>
<figure><img src="/graphs/Pilot11/disconnect-how-bar-chart.svg" alt="TBD"/></figure>
<figure><img src="/graphs/Pilot11/disconnect-harm-bar-chart.svg" alt="TBD"/></figure>
<figure><img src="/graphs/Pilot11/disconnect-dur-bar-chart.svg" alt="TBD"/></figure>
</details>
<!-- ----------------------------------------------------- -->
<details>
<summary>Scenario: Abuse</summary>
<figure><img src="/graphs/Pilot11/abuse-how-bar-chart.svg" alt="TBD"/></figure>
<figure><img src="/graphs/Pilot11/abuse-dur-bar-chart.svg" alt="TBD"/></figure>
</details>
<!-- ----------------------------------------------------- -->
<details>
<summary>Lost photos and emails</summary>
<figure><img src="/graphs/Pilot11/lost-photos-percent.svg" alt=""/></figure>
<figure><img src="/graphs/Pilot11/lost-emails-percent.svg" alt=""/></figure>
<figure><img src="/graphs/Pilot11/lost-photos-percent-cdf.svg" alt=""/></figure>
<figure><img src="/graphs/Pilot11/lost-emails-percent-cdf.svg" alt=""/></figure>
</details>
<!-- ----------------------------------------------------- -->
<details>
<summary>Demographics</summary>
<figure><img src="/graphs/Pilot11/age-cdf.svg" alt="TBD"/></figure>
<figure><img src="/graphs/Pilot11/education-percent.svg" alt="TBD"/></figure>
<figure><img src="/graphs/Pilot11/gender-percent.svg" alt="TBD"/></figure>
</details>
<!-- ----------------------------------------------------- -->
