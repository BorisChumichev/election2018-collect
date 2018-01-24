#!/bin/bash
set -e

### Configuration ###

INSTALL_PATH=~/election-collect
GIT_REPO_URL=git@github.com:BorisChumichev/election2018-collect.git

### Automation steps ###

set -x

# Pull latest code
if [[ -e $INSTALL_PATH ]]; then
  cd $INSTALL_PATH
  git pull
else
  git clone $GIT_REPO_URL $INSTALL_PATH
  cd $INSTALL_PATH
fi

# Install dependencies
npm install --production
npm prune --production
