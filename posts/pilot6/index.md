---
title: Pilot 6
# author: <a href="https://www.stuartschechter.org">Stuart</a>
templateEngine: [vto, md]
date: Git Last Modified
tags:
  - background
  - methodology
---

# To do
### Changes to survey for Pilot 7

 - Replace `worst` with `most harmful` - DONE

 - Replace <i>Yes, and I should have included it above among my three worst</i> with <i>Yes and, in retrospect, I should have included that experience above among my three most harmful</i>. - DONE

 - For each scenario, if participant responds that a scenario should have been included among the three most harmful, ask <i>Should you have included that experience as your most harmful, second-most harmful, or third-most harmful experience?</i> options of `["most harmful", "second-most harmful", "third-most harmful"]`. - DONE

 - renamed `hacked-acct-rec` to `hacked-acct-duration`  - DONE

 - Missing question `hacked-bank-rec` and `hacked-pwds-rec` to match `hacked-soc-duration` and `hacked-acct-rec` (hacked-pwds-duration?) - DONE

 - for `hacked-*-duration`, the first option is now `I never lost access`` - DONE

 - New scenario: backups and switching to new devices - DONE

 - Possible new scenario: systems and devices not doing what they say they're doing (failing to keep promises) - DONE

 - Verify that all capitalization of options is caps - DONE
 - Verify that all options that start with "s the" becomes "The" - DONE

  - if PIN or password changed, who changed it? - DONE
    - in progress. replicate locked-acct-pwho
    - replicate locked-acct-how new option 2: "The PIN or password was recently changed"
    - added locked-pwds-how

  - Add question for all scenarios: <i>Please rank the severity of the harm or loss on a scale of 1 (not harmful at all) to 7 (extremely harmful)?</i>
    - (proposed by Serge)
    - Goes at the end of each scenario before the tell us more.
    - DONE


 - Can we reduce inconsistency between questions for devices and accounts, possibly using the same labels so we can graph them all together? - DONE



### Changes for analysis
 - Merge graphs for accounts when same questions asked for email, social, and financial

 - Still a few missing graphs to clean up and add.

## Results


There were {{ data.numberOfParticipants }} participants in this pilot.

Participants started by writing [loss stories](./loss-stories.md) about the three worst technology-related harms they had experienced.


We then told participants we would "describe technology-related harms that that have happened to others, and ask if they have also happened to" them.

<figure>
  <img src="/graphs/Pilot6/scenario-bar-chart.svg" alt="A bar chart summarizing the percent of participants who had experienced each harm scenario."/>
  <figcaption>The percent of participants who had experienced each harm scenario. Losses due to failures of security measures to protect participants from attack are paired (left bar) against harms due to security measures themselves harming participants (right bar).</figcaption>
</figure>

When participants reported having suffered one of the described scenarios, we asked them how recently they had experienced it.

<figure>
  <img src="/graphs/Pilot6/scenario-recency-bar-chart.svg" alt="A bar chart summarizing how recently participants who had experienced each harm scenario."/>
  <figcaption>The absolute number of participants who had experienced each harm scenario for each level of recency.</figcaption>
</figure>

We asked participants who had a device compromised/stolen or locked what type of device it was. (If they had experienced more than one incident of a scenario we asked about the worst.)

<figure>
  <img src="/graphs/Pilot6/device-bar-chart.svg" alt="A bar chart summarizing the number of devices of each type that were lost or hacked."/>
  <figcaption>The absolute number of devices of each type that participants had suffered the compromise of (left bar in pair) or had been locked out of (right bar in pair).</figcaption>
</figure>


<figure>
  <img src="/graphs/Pilot6/account-type-bar-chart.svg" alt="A bar chart summarizing the number of devices of each type that were lost or hacked."/>
  <figcaption>The types of accounts that participants had suffered the compromise of (left bar in pair) or had been locked out of (right bar in pair).</figcaption>
</figure>

<figure>
  <img src="/graphs/Pilot6/social-account-type-bar-chart.svg" alt="A bar chart summarizing the number of devices of each type that were lost or hacked."/>
  <figcaption>The types of social accounts that participants had suffered the compromise of (left bar in pair) or had been locked out of (right bar in pair).</figcaption>
</figure>

<figure>
  <img src="/graphs/Pilot6/financial-account-type-bar-chart.svg" alt="A bar chart summarizing the number of devices of each type that were lost or compromised."/>
  <figcaption>The types of financial accounts that participants had suffered the compromise of (left bar in pair) or had been locked out of (right bar in pair).</figcaption>
</figure>

<figure>
  <img src="/graphs/Pilot6/hacked-device-how-bar-chart.svg" alt="A bar chart summarizing how devices were compromised."/>
  <figcaption>How devices were compromised.</figcaption>
</figure>

<figure>
  <img src="/graphs/Pilot6/locked-device-how-bar-chart.svg" alt="A bar chart summarizing how participants reported being locked out of their devices."/>
  <figcaption>How users were locked out of their devices.</figcaption>
</figure>

<figure><img src="/graphs/Pilot6/locked-device-recdat-bar-chart.svg" alt="TBD"/></figure>
<figure><img src="/graphs/Pilot6/locked-device-rec-bar-chart.svg" alt="TBD"/></figure>

<figure><img src="/graphs/Pilot6/hacked-acct-how-bar-chart.svg" alt="TBD"/></figure>
<figure><img src="/graphs/Pilot6/hacked-acct-type-bar-chart.svg" alt="TBD"/></figure>
<figure><img src="/graphs/Pilot6/hacked-acct-rec-bar-chart.svg" alt="TBD"/></figure>
<figure><img src="/graphs/Pilot6/locked-acct-how-bar-chart.svg" alt="TBD"/></figure>
<figure><img src="/graphs/Pilot6/locked-acct-type-bar-chart.svg" alt="TBD"/></figure>
<figure><img src="/graphs/Pilot6/locked-acct-duration-bar-chart.svg" alt="TBD"/></figure>

<figure><img src="/graphs/Pilot6/hacked-soc-how-bar-chart.svg" alt="TBD"/></figure>
<figure><img src="/graphs/Pilot6/hacked-soc-type-bar-chart.svg" alt="TBD"/></figure>
<figure><img src="/graphs/Pilot6/locked-soc-how-bar-chart.svg" alt="TBD"/></figure>
<figure><img src="/graphs/Pilot6/locked-soc-type-bar-chart.svg" alt="TBD"/></figure>
<figure><img src="/graphs/Pilot6/locked-soc-duration-bar-chart.svg" alt="TBD"/></figure>

<figure><img src="/graphs/Pilot6/hacked-bank-how-bar-chart.svg" alt="TBD"/></figure>
<figure><img src="/graphs/Pilot6/hacked-bank-type-bar-chart.svg" alt="TBD"/></figure>
<figure><img src="/graphs/Pilot6/locked-bank-how-bar-chart.svg" alt="TBD"/></figure>
<figure><img src="/graphs/Pilot6/locked-bank-type-bar-chart.svg" alt="TBD"/></figure>
<figure><img src="/graphs/Pilot6/locked-bank-dur-bar-chart.svg" alt="TBD"/></figure>
