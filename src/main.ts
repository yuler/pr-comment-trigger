import * as core from '@actions/core'
import {context, getOctokit} from '@actions/github'

async function run(): Promise<void> {
  const trigger = core.getInput('trigger', {required: true})
  const {GITHUB_TOKEN} = process.env

  if (!GITHUB_TOKEN) {
    core.setFailed('GITHUB_TOKEN is required')
    return
  }

  if (
    context.eventName !== 'issue_comment' ||
    !context.payload.comment ||
    !context.payload.issue!.pull_request
  ) {
    core.setOutput('triggered', 'false')
    return
  }

  const {id: commentId, body: commentBody} = context.payload.comment

  if (!commentBody.startsWith(trigger)) {
    core.setOutput('triggered', 'false')
    return
  }

  core.setOutput('triggered', 'true')

  const octokit = getOctokit(GITHUB_TOKEN)
  await octokit.rest.reactions.createForIssueComment({
    ...context.repo,
    comment_id: commentId,
    content: 'rocket'
  })
}

run().catch(error => {
  console.log(error)
  core.setFailed(error.message)
})
