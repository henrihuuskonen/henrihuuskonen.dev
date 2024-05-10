#!/bin/bash

PR_NUMBER=$1

# Check lines containing lint or playwright-tests and containing the word pass
PR_CHECK_COMMAND=$(gh pr checks $PR_NUMBER)
lint_check=$(echo "$COMMAND" | grep -c -E '^lint.*pass' | wc -l | awk '{$1=$1};1')
playwright_tests_check=$(echo "$COMMAND" | grep -c -E '^playwright-tests.*pass' | wc -l | awk '{$1=$1};1')


# Exit code based on the result
if [ $lint_check -eq 1 ] && [ $playwright_tests_check -eq 1 ]; then
    echo "Success: lint and playwright-tests both passed."
    gh pr review $PR_NUMBER --approve
    gh pr merge $PR_NUMBER --squash
    exit 0
else
    echo "Failure: lint and/or playwright-tests did not pass."
    exit 1
fi