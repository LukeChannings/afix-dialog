#!/usr/bin/env bash

if [[ -z $(git status -s -uno) ]]; then
  echo "Please commit all changes before running this script."
fi

read -r -p 'New Component Name: ' NAME;
read -r -p 'Describe the new component: ' DESCRIPTION;

FILES=$(find -E . -regex '.*.(html|json|js|markdown)' | grep -v node_modules)

echo "$FILES" | xargs sed -i .bak "s/name-afix-component/afix-$(echo "$NAME" | tr '[:upper:]' '[:lower:]' | tr -d '[:punct:]' | sed 's/ /-/g')/g"
echo "$FILES" | xargs sed -i .bak "s/name-long-afix-component/${NAME}/g"
echo "$FILES" | xargs sed -i .bak "s/description-afix-component/${DESCRIPTION}/g"

find . -name '*.bak' -delete

git rm "$0"
git commit -am "The new component's name is ${NAME}!"
