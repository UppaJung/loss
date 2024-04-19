---
title: Pilot 11
# author: <a href="https://www.stuartschechter.org">Stuart</a>
templateEngine: [vto, md]
date: Git Last Modified
tags:
  - background
  - methodology
---

[Qualtrics](https://harvard.az1.qualtrics.com/survey-builder/SV_4VJxxO9vcLYIN2C)


### New in this pilot

### Data notes

**Due to a survey error*, the first 10 participants were only assigned (at random) to 2 of 3 loss-focused scenarios. (When we added mental health, a 2 choose 2 to randomize order became 3 choose 2). The percents of participants who responded to these are adjusted to be among only those who were asked.

Participant (PID ending 184) **Removed from data following message with participant**
  - Provide three things that were not personal harm descriptions for the three harms
  - Matched abuse and lost photos to items those descriptions that were not harms
  - Responded to lost emails: "Yes, and while I did not describe it above, I should have ranked it my most harmful", then, when asked how many emails were lost, responded "I have never lost any emails".

> Hi. Before processing payment, I'm reviewing your response to the survey about online harms. Your written answers for the three worst instances of "harm or loss you have experienced" do not appear to be about anything you report to have experienced personally. When you connected other questions to those essay answers, we cannot make sense of them. For example, "the technologies you or others rely on [being] used to embarrass or harass you" does not seem to be part of "Reduced attention and symptoms of ADHD". Can you help us make sense of your response?


Participant 20 (PID ending d78)
  - Replied that they had lost photos/videos, checking the cause as "A phone storing the photos/videos was stolen"
  - Replied no to "Have you had a personal electronic device stolen, used by someone without your permission, used in a way that you did not permit or later regretted permitting, or otherwise compromised (hacked)?"
  - Replied that social was hacked in that "The account was used by someone I knew with my permission, but they used it in a way that they knew I would not want" which associated with their written response "When my data was used to steal my identity and people were using my password and credentials to do criminal activities"
  - Yet, seems to have put effort in. Took time to write "Tons of my friends were sent thousands of spam messages from my account and I had to warn them about it"
  - "The account was used by someone I knew without my permission"

I sent.
> Thanks for participating in our survey. I am writing to request a clarification. When asked how you had lost photos/videos, you checked "A phone storing the photos/videos was stolen". When asked "Have you had a personal electronic device stolen, used by someone without your permission, used in a way that you did not permit or later regretted permitting, or otherwise compromised (hacked)", you selected "No, and I do not worry that this might happen to me in the future". Can you clarify whether you had a phone stolen and help us resolve this inconsistency?

They replied:
> Yes I had phone stolen and it was my designated company work phone. It was stolen from my car. I selected no I do not worry about this happening in the future because I no longer have a work phone because my company discontinued that program. I hope that makes sense

Perhaps we should ask who the "someone I knew" is in these situations.


Participant 21, perhaps a lost opportunity in matching (missed broken promise)

Participant 23 had odd matchings (maybe age related at 67?), missed broken promise

Participant 24, not great matchings (missed broken promise)

Participant 28, lots of work-related (not personal) stories


**Theme**, broken promise seems to be written in a way that isn't leading to matches.


## Results

There were {{ data.numberOfParticipants }} participants in this pilot.  We paid more ($4.50) since the survey now takes a median of ~15 minutes. We learned that the great majority of people have lost photos and emails. Loss, it seems, is expected. This seems to capture something that our event-focused scenarios do not.

The new event-focused scenarios seem to capture a good deal of what our old event-focused scenarios missed.

Participants started by writing [loss stories](./loss-stories.md) about the three worst technology-related harms they had experienced. 

We then told participants we would "describe technology-related harms that that have happened to others, and ask if they have also happened to" them.



<!-- ----------------------------------------------------- -->
<details>
<summary>New Graphs</summary>

<figure><img src="/graphs/pilot11/harm-likert-absolute.svg" alt=""/></figure>
<figure><img src="/graphs/pilot11/harm-likert-percent.svg" alt=""/></figure>
<figure><img src="/graphs/pilot11/lost-photos-percent.svg" alt=""/></figure>
<figure><img src="/graphs/pilot11/lost-emails-percent.svg" alt=""/></figure>
<figure><img src="/graphs/pilot11/lost-photos-percent-cdf.svg" alt=""/></figure>
<figure><img src="/graphs/pilot11/lost-emails-percent-cdf.svg" alt=""/></figure>

</details>
<!-- ----------------------------------------------------- -->

<!-- ----------------------------------------------------- -->
<details>
<summary>Summary Across Scenarios</summary>

<figure>
  <img src="/graphs/pilot11/scenario-bar-chart.svg" alt="A bar chart summarizing the percent of participants who had experienced each harm scenario."/>
  <figcaption>The percent of participants who had experienced each harm scenario. Losses due to failures of security measures to protect participants from attack are paired (left bar) against harms due to security measures themselves harming participants (right bar).</figcaption>
</figure>
<figure><img src="/graphs/pilot11/scenario-harm-likert-absolute.svg" alt="TBD"/></figure>
<figure><img src="/graphs/pilot11/scenario-harm-likert-percent.svg" alt="TBD"/></figure>

When participants reported having suffered one of the described scenarios, we asked them how recently they had experienced it.

<figure>
  <img src="/graphs/pilot11/scenario-recency-bar-chart.svg" alt="A bar chart summarizing how recently participants who had experienced each harm scenario."/>
  <figcaption>The absolute number of participants who had experienced each harm scenario for each level of recency.</figcaption>
</figure>

<figure>
  <img src="/graphs/Pilot11/scenario-recovery-duration-bar-chart.svg" alt=""/>
  <figcaption>Recovery duration for each scenario (absolute figures).</figcaption>
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
  <img src="/graphs/pilot11/device-bar-chart.svg" alt="A bar chart summarizing the number of devices of each type that were lost or hacked."/>
  <figcaption>The absolute number of devices of each type that participants had suffered the compromise of (left bar in pair) or had been locked out of (right bar in pair).</figcaption>
</figure>
<figure><img src="/graphs/pilot11/hacked-device-dur-bar-chart.svg" alt="TBD"/></figure>


<figure>
  <img src="/graphs/pilot11/hacked-device-how-bar-chart.svg" alt="A bar chart summarizing how devices were compromised."/>
  <figcaption>How devices were compromised.</figcaption>
</figure>

<figure>
  <img src="/graphs/pilot11/locked-device-how-bar-chart.svg" alt="A bar chart summarizing how participants reported being locked out of their devices."/>
  <figcaption>How users were locked out of their devices.</figcaption>
</figure>

<figure><img src="/graphs/pilot11/locked-device-recdat-bar-chart.svg" alt="TBD"/></figure>
<figure><img src="/graphs/pilot11/locked-device-dur-bar-chart.svg" alt="TBD"/></figure>

</details>
<!-- ----------------------------------------------------- -->
<details>
<summary>Scenario Pair: Email/File Account Compromise & Lockout</summary>
<figure>
  <img src="/graphs/pilot11/account-type-bar-chart.svg" alt="A bar chart summarizing the number of devices of each type that were lost or hacked."/>
  <figcaption>The types of accounts that participants had suffered the compromise of (left bar in pair) or had been locked out of (right bar in pair).</figcaption>
</figure>

<figure><img src="/graphs/pilot11/hacked-acct-how-bar-chart.svg" alt="TBD"/></figure>
<figure><img src="/graphs/pilot11/hacked-acct-type-bar-chart.svg" alt="TBD"/></figure>
<figure><img src="/graphs/pilot11/hacked-acct-dur-bar-chart.svg" alt="TBD"/></figure>
<figure><img src="/graphs/pilot11/locked-acct-how-bar-chart.svg" alt="TBD"/></figure>
<figure><img src="/graphs/pilot11/locked-acct-type-bar-chart.svg" alt="TBD"/></figure>
<figure><img src="/graphs/pilot11/locked-acct-dur-bar-chart.svg" alt="TBD"/></figure>

</details>
<!-- ----------------------------------------------------- -->
<details>
<summary>Scenario Pair: Social Account Compromise & Lockout</summary>
<figure>
  <img src="/graphs/pilot11/social-account-type-bar-chart.svg" alt="A bar chart summarizing the number of devices of each type that were lost or hacked."/>
  <figcaption>The types of social accounts that participants had suffered the compromise of (left bar in pair) or had been locked out of (right bar in pair).</figcaption>
</figure>

<figure><img src="/graphs/pilot11/hacked-soc-how-bar-chart.svg" alt="TBD"/></figure>
<figure><img src="/graphs/pilot11/hacked-soc-type-bar-chart.svg" alt="TBD"/></figure>
<figure><img src="/graphs/pilot11/locked-soc-how-bar-chart.svg" alt="TBD"/></figure>
<figure><img src="/graphs/pilot11/locked-soc-type-bar-chart.svg" alt="TBD"/></figure>
<figure><img src="/graphs/pilot11/locked-soc-dur-bar-chart.svg" alt="TBD"/></figure>

</details>
<!-- ----------------------------------------------------- -->
<details>
<summary>Scenario Pair: Financial Account Compromise & Lockout</summary>
<figure>
  <img src="/graphs/pilot11/financial-account-type-bar-chart.svg" alt="A bar chart summarizing the number of devices of each type that were lost or compromised."/>
  <figcaption>The types of financial accounts that participants had suffered the compromise of (left bar in pair) or had been locked out of (right bar in pair).</figcaption>
</figure>

<figure><img src="/graphs/pilot11/hacked-bank-how-bar-chart.svg" alt="TBD"/></figure>
<figure><img src="/graphs/pilot11/hacked-bank-type-bar-chart.svg" alt="TBD"/></figure>
<figure><img src="/graphs/pilot11/locked-bank-how-bar-chart.svg" alt="TBD"/></figure>
<figure><img src="/graphs/pilot11/locked-bank-type-bar-chart.svg" alt="TBD"/></figure>
<figure><img src="/graphs/pilot11/locked-bank-dur-bar-chart.svg" alt="TBD"/></figure>

</details>
<!-- ----------------------------------------------------- -->
<details>
<summary>Scenario: Replaced/Upgrade Device/OS</summary>

<figure><img src="/graphs/pilot11/swap-device-what-bar-chart.svg" alt="TBD"/></figure>
<figure><img src="/graphs/pilot11/swap-device-harm-bar-chart.svg" alt="TBD"/></figure>
<figure><img src="/graphs/pilot11/swap-device-dur-bar-chart.svg" alt="TBD"/></figure>
</details>
<!-- ----------------------------------------------------- -->
<details>
<summary>Scenario: Broken Promises and Unexpected Behaviors</summary>
<figure><img src="/graphs/pilot11/disconnect-how-bar-chart.svg" alt="TBD"/></figure>
<figure><img src="/graphs/pilot11/disconnect-harm-bar-chart.svg" alt="TBD"/></figure>
<figure><img src="/graphs/pilot11/disconnect-dur-bar-chart.svg" alt="TBD"/></figure>
</details>
<!-- ----------------------------------------------------- -->
<details>
<summary>Scenario: Abuse</summary>
<figure><img src="/graphs/pilot11/abuse-how-bar-chart.svg" alt="TBD"/></figure>
<figure><img src="/graphs/pilot11/abuse-dur-bar-chart.svg" alt="TBD"/></figure>
</details>
<!-- ----------------------------------------------------- -->
<details>
<summary>Demographics</summary>
<figure><img src="/graphs/pilot11/age-cdf.svg" alt="TBD"/></figure>
<figure><img src="/graphs/pilot11/education-percent.svg" alt="TBD"/></figure>
<figure><img src="/graphs/pilot11/gender-percent.svg" alt="TBD"/></figure>
</details>
<!-- ----------------------------------------------------- -->
