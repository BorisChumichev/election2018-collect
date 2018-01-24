#!/bin/bash
set -e

### Configuration ###

SERVER=hetzner

### Library ###

function run()
{
  echo "Running: $@"
  "$@"
}

echo " ---- Running setup script on remote server"
run ssh $SERVER 'bash -s' < deployment/remote-setup.sh
echo " ---- Copy production .env file"
scp deployment/.env.production $SERVER:~/election-collect/.env
echo " ---- Running start script on remote server"
run ssh $SERVER 'bash -s' < deployment/remote-run.sh
