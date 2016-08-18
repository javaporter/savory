#!/bin/bash

# Grab the environment from the first argument. If no arguments, then default to staging deployments
ENVIRONMENT=${1:-staging}

DEPLOYMENT_DIRECTORY=/var/www

if [ "$ENVIRONMENT" == "staging" ]
then
    DEPLOYMENT_DIRECTORY="$DEPLOYMENT_DIRECTORY/dev.savory.global"
elif [ "$ENVIRONMENT" == "production" ]
then
    DEPLOYMENT_DIRECTORY="$DEPLOYMENT_DIRECTORY/savory.global"
fi

ROOT_DIRECTORY="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && cd .. && pwd )"

echo "Deploying to $ENVIRONMENT at root@savory.global:$DEPLOYMENT_DIRECTORY"
rsync -rltDz --exclude-from="$ROOT_DIRECTORY/config/rsync-exclusions.txt" --delete --delete-delay "$ROOT_DIRECTORY/" root@savory.global:$DEPLOYMENT_DIRECTORY
ssh root@savory.global pm2 restart $ENVIRONMENT
