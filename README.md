# PR Comment Trigger

> Trigger match on pull request comment. Automatic cancel workflow when mismatch trigger.

## Usage

```yml
name: PR Comment Trigger

on:
  issue_comment:
    types: [created]

jobs:
  pr_commented:
    runs-on: ubuntu-latest
    steps:
      - uses: yuler/pr-comment-trigger@main
        id: 'pr'
        with:
          trigger: '/trigger'
      - name: Echo # sleep 2s wait for cancel
        run: |
          sleep 2 # sleep 2s wait for cancel
          echo Trigger
      - uses: actions/checkout@v2
        with:
          ref: ${{ steps.pr.outputs.branch }}
```

## Inputs

`trigger`: The string match starts with it in pull request comment. For example '/trigger'

## Refs

- https://github.com/Khan/pull-request-comment-trigger
