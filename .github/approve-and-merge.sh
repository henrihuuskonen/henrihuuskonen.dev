#!/bin/bash

PR_NUMBER=$1

# Wait for the PR checks to complete
gh pr checks $PR_NUMBER --watch --fail-fast

# Fetch the JSON data using 'gh pr view' command
json_data=$(gh pr view $PR_NUMBER --json statusCheckRollup,mergeable)

# Check if the command was successful
if [ $? -ne 0 ]; then
    echo "Error fetching PR data"
    exit 1
fi

# Extract the "conclusion" fields from the JSON data
conclusions=$(echo "$json_data" | jq -r '.statusCheckRollup[].conclusion')
mergeable=$(echo "$json_data" | jq -r '.mergeable')

# Check if all conclusions are "SUCCESS"
if [[ $(echo "$conclusions" | grep -c "SUCCESS") -eq $(echo "$conclusions" | wc -l) && "$mergeable" == "MERGEABLE" ]]; then
    echo "All conclusions are SUCCESS and PR is MERGEABLE"
    gh pr review $PR_NUMBER --approve
    gh pr merge $PR_NUMBER --squash
    exit 0
else
    echo "Some conclusions are not SUCCESS or not MERGEABLE"
    exit 1
fi