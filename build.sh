#!/bin/bash

# Clean up any existing .git folder (shallow clone)
rm -rf .git

# Reinitialize the Git repository and fetch full history
git init
git remote add origin https://$VERCEL_GIT_REPO_OWNER:$GITHUB_TOKEN@github.com/$VERCEL_GIT_REPO_SLUG.git
git remote
git fetch --depth=0
git reset --hard origin/main
git checkout $VERCEL_GIT_COMMIT_SHA

# Proceed with the build process
yarn
yarn build
