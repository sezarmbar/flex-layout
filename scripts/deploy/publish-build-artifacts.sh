#!/bin/bash

# Script to publish the build artifacts to a GitHub repository.
# Builds will be automatically published once new changes are made to the repository.

# The script should immediately exit if any command in the script fails.
set -e

# Go to the project root directory
cd $(dirname ${0})/../..

if [ -z ${FLEX_LAYOUT_BUILDS_TOKEN} ]; then
  echo "Error: No access token for GitHub could be found." \
       "Please set the environment variable 'MATERIAL2_BUILDS_TOKEN'."
  exit 1
fi

# Material packages that need to published.
PACKAGES=(cdk material)
REPOSITORIES=(cdk-builds material2-builds)

# Command line arguments.
COMMAND_ARGS=${*}

# Function to publish artifacts of a package to Github.
#   @param ${1} Name of the package
#   @param ${2} Repository name of the package.
publishPackage() {
  packageName=${1}
  packageRepo=${2}

  buildDir="dist/releases/${packageName}"
  buildVersion=$(sed -nE 's/^\s*"version": "(.*?)",$/\1/p' package.json)

  commitSha=$(git rev-parse --short HEAD)
  commitAuthorName=$(git --no-pager show -s --format='%an' HEAD)
  commitAuthorEmail=$(git --no-pager show -s --format='%ae' HEAD)
  commitMessage=$(git log --oneline -n 1)

  repoUrl="https://github.com/angular/${packageRepo}.git"
  repoDir="tmp/${packageRepo}"

  if [[ ! ${COMMAND_ARGS} == *--no-build* ]]; then
    # Create a release of the current repository.
    $(npm bin)/gulp ${packageName}:build-release:clean
  fi

  # Prepare cloning the builds repository
  rm -rf ${repoDir}
  mkdir -p ${repoDir}

  # Clone the repository and only fetch the last commit to download less unused data.
  git clone ${repoUrl} ${repoDir} --depth 1

  # Copy the build files to the repository
  rm -rf ${repoDir}/*
  cp -r ${buildDir}/* ${repoDir}

  # Create the build commit and push the changes to the repository.
  cd ${repoDir}

  # Update the package.json version to include the current commit SHA.
  sed -i "s/${buildVersion}/${buildVersion}-${commitSha}/g" package.json

  # For build artifacts the different Angular packages that refer to the 0.0.0-PLACEHOLDER should
  # be replaced with the Github builds that are published at the same time.
  sed -i "s/0.0.0-PLACEHOLDER/${buildVersion}-${commitSha}/g" package.json

  # Prepare Git for pushing the artifacts to the repository.
  git config user.name "${commitAuthorName}"
  git config user.email "${commitAuthorEmail}"
  git config credential.helper "store --file=.git/credentials"

  echo "https://${FLEX_LAYOUT_BUILDS_TOKEN}:@github.com" > .git/credentials

  git add -A
  git commit -m "${commitMessage}"
  git tag "${buildVersion}-${commitSha}"
  git push origin master --tags

  echo "Published package artifacts for ${packageName}#${commitSha}."
}

for ((i = 0; i < ${#PACKAGES[@]}; i++)); do
  packageName=${PACKAGES[${i}]}
  packageRepo=${REPOSITORIES[${i}]}

  # Publish artifacts of the current package. Run publishing in a sub-shell to avoid working
  # directory changes.
  (publishPackage ${packageName} ${packageRepo})
done
