import * as core from '@actions/core'
import {context} from '@actions/github'

async function run(): Promise<void> {
  const trigger = core.getInput('trigger', {required: true})

  if (
    context.eventName !== 'issue_comment' ||
    !context.payload.comment ||
    !context.payload.issue!.pull_request
  ) {
    core.setOutput('triggered', 'false')
    return
  }

  const {body: commentBody} = context.payload.comment

  if (!commentBody.startsWith(trigger)) {
    core.setOutput('triggered', 'false')
    return
  }

  core.setOutput('triggered', 'true')
}

run().catch(error => {
  console.log(error)
  core.setFailed(error.message)
})
