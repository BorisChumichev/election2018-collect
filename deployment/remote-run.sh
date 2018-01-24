#!/bin/bash
cd ~/election-collect
forever restart electionCollectorVK || \
  forever start --uid "electionCollectorVK" collector-vk.js
forever restart electionCollectorTwitter || \
  forever start --uid "electionCollectorTwitter" collector-twitter.js
