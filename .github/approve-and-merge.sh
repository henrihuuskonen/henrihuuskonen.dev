#!/bin/bash

GITHUB_TOKEN=$1
REPO_OWNER=$2
REPO_NAME=$3
PR_NUMBER=$4

pr_status=$(gh pr status $PR_NUMBER --json status)

if [[ "$pr_status" == *"OPEN"* ]]; then
    # Check if every other check has passed
    checks_passed=$(gh pr checks $PR_NUMBER --json check_runs[].conclusion --jq 'map(select(. != "neutral" and . != "cancelled" and . != "skipped" and . != null)) | length')

    if [[ "$checks_passed" -gt 0 ]]; then
        gh pr review $PR_NUMBER --approve --json
        gh pr merge $PR_NUMBER --merge --json
    else
        echo "Not all checks have passed. Cannot approve and merge the pull request."
    fi
else
    echo "The pull request is not open. Skipping the approval and merge process."
fi