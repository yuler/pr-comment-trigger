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
      - uses: actions/checkout@v2
        with:
          ref: ${{ github.event.pull_request.head.ref }}
      - uses: yuler/pr-comment-trigger@main
        id: 'pr'
        with:
          trigger: '/trigger'
        env:
          GITHUB_TOKEN: '${{ secrets.GITHUB_TOKEN }}'
      - name: Echo # sleep 2s wait for cancel
        run: |
          sleep 2 # sleep 2s wait for cancel
          echo Trigger
```

## Inputs

`trigger`: The string match starts with it in pull request comment. For example '/trigger'

## Refs

- https://github.com/Khan/pull-request-comment-trigger
