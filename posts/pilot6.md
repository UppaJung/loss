---
title: Pilot 6
author: <a href="https://www.stuartschechter.org">Stuart</a>
templateEngine: [vto, md]
date: Git Last Modified
tags:
  - background
  - methodology
---

There were {{ data.numberOfParticipants }} participants in this pilot.

<figure>
  <img src="/graphs/pilot6/scenario-bar-chart.svg" alt="A bar chart summarizing the percent of participants who had experienced each harm scenario."/>
  <caption>The percent of participants who had experienced each harm scenario. Losses due to failures of security measures to protect participants from attack are paired against harms due to security measures themselves harming participants.</caption>
</figure>

<figure>
  <img src="/graphs/pilot6/device-bar-chart.svg" alt="A bar chart summarizing the number of devices of each type that were lost or hacked."/>
  <caption>The aggregate number of devices of each type that were hacked or that participants were locked out of.</caption>
</figure>


{{ include "../analysis-src/generated-data/Pilot6/markdown/loss-stories.md" }}
