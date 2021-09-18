import * as core from '@actions/core'
import {context, getOctokit} from '@actions/github'

async function run(): Promise<void> {
  const {GITHUB_TOKEN} = process.env
  if (!GITHUB_TOKEN) {
    core.setFailed('GITHUB_TOKEN is required')
    return
  }

  const octokit = getOctokit(GITHUB_TOKEN)
  const trigger = core.getInput('trigger', {required: true})
  const commentBody = context.payload.comment?.body

  if (
    context.eventName !== 'issue_comment' ||
    !context.payload.comment ||
    !context.payload.issue?.pull_request ||
    !commentBody.startsWith(trigger)
  ) {
    await octokit.rest.actions.cancelWorkflowRun({
      ...context.repo,
      run_id: context.runId
    })

    return
  }

  if (context.payload.issue?.pull_request) {
    const {GITHUB_TOKEN} = process.env
    if (!GITHUB_TOKEN) {
      core.setFailed('GITHUB_TOKEN is required')
      return
    }

    const octokit = getOctokit(GITHUB_TOKEN)
    const {data} = await octokit.rest.pulls.get({
      ...context.repo,
      pull_number: context.payload.issue.number
    })
    const branch = data.head.ref
    core.setOutput('branch', branch)
  }
}

run().catch(error => {
  console.log(error)
  core.setFailed(error.message)
})
