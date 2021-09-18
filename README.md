# PR Comment Trigger

> Trigger match on pull request comment

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
      - name: echo
        if: ${{ steps.pr.outputs.triggered }} # condition for skip
        run: |
          echo "${{ steps.pr.outputs.triggered }}"
```

## Inputs

`trigger`: The string match starts with it in pull request comment. For example '/trigger'

## Outputs

`triggered`: The string 'true' if the triggered, otherwise the string 'false'

## Refs

- https://github.com/Khan/pull-request-comment-trigger
