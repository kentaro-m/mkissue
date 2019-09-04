import {Command, flags} from '@oclif/command'
import {cli} from 'cli-ux'
import * as parse from 'csv-parse'
import * as fs from 'fs'
import {promisify} from 'util'
import * as Octokit from '@octokit/rest'
import { ZenHub } from '../helpers/zenhub'
import { getRepoNameAndIssueNumberFromIssueURL } from '../helpers/utils'

export default class Run extends Command {
  static description = 'create issues from csv file'

  static example = `$ mkissue run issues.csv
Loaded issue data from csv file:

Title                                                             Label
Enable to install from npm registry                               feature request
Save GitHub token for creating issues to local configuration file feature request
Add ZenHub support                                                feature request, discussion
Add CI/CD for using GitHub Actions                                feature request

What is owner name?: kentaro-m
What is repository name?: create-issues-test
What is GitHub host?: https://api.github.com
What is GitHub token?: ****************
What is ZenHub host?: https://api.zenhub.io
What is ZenHub token?: ****************
Continue? [yes/no]: yes
Creating issues... done`

  static flags = {
    help: flags.help({char: 'h'}),
    zenhub: flags.boolean()
  }

  static args = [{
    name: 'file',
    description: 'where to load csv file',
    required: true,
  }]

  async run() {
    const {args, flags} = this.parse(Run)

    if (args.file) {
      try {
        const buffer = await promisify(fs.readFile)(args.file)
        // @ts-ignore
        const data = await promisify(parse)(buffer, {columns: true})

        this.log('Loaded issue data from csv file:\n')

        cli.table(
          data,
          {
            title: {},
            labels: {}
          },
          {printLine: this.log,}
        )

        const owner = await cli.prompt('\nWhat is owner name?')
        const repo = await cli.prompt('What is repository name?')
        const githubHost = await cli.prompt('What is GitHub host?', {
          default: 'https://api.github.com'
        })
        const githubToken = await cli.prompt('What is GitHub token?', {type: 'mask'})

        let zenhubHost: string = ''
        let zenhubToken: string = ''
        if (flags.zenhub) {
          zenhubHost = await cli.prompt('What is ZenHub host?', {
            default: 'https://api.zenhub.io'
          })
          zenhubToken = await cli.prompt('What is ZenHub token?', {type: 'mask'})
        }

        const confirm = await cli.confirm('Continue? [yes/no]')

        if (!confirm) {
          return
        }

        cli.action.start('Creating issues')

        const githubOptions = {
          baseUrl: githubHost ? githubHost : 'https://api.github.com',
          auth: `token ${githubToken}`
        }

        const octokit = new Octokit(githubOptions)

        const repository = await octokit.repos.get({owner: owner, repo: repo}).then(res => res.data)

        const milestones = await octokit.issues.listMilestonesForRepo({
          owner: owner,
          repo: repo,
          state: 'open',
          per_page: 100
        }).then(res => res.data)

        const repositories: {[repo: string]: Octokit.ReposGetResponse} = {}

        for (const item of data) {
          const params:Octokit.IssuesCreateParams = {
            owner: owner,
            repo: repo,
            title: item.title,
            body: item.body,
            labels: item.labels ? item.labels.split(',') : []
          }

          const milestone = milestones.find((milestone: Octokit.IssuesListMilestonesForRepoResponseItem): boolean => milestone.title === item.milestone)
          if (milestone) {
            params.milestone = milestone.number
          }

          const issue = await octokit.issues.create(params).then(res => res.data)

          if (flags.zenhub && (item.estimate || item["epic-url"])) {
            const zenhubOptions = {
              baseUrl: String(zenhubHost),
              token: String(zenhubToken)
            }
            const zenhub = new ZenHub(zenhubOptions)

            if (zenhubToken !== '' && item.estimate) {
              await zenhub.setEstimate(repository.id, issue.number, item.estimate)
            }

            if (zenhubToken !== '' && item["epic-url"]) {
              const result = getRepoNameAndIssueNumberFromIssueURL(item["epic-url"])
              if (result) {
                const { repo: epicRepo, issueNumber } = result
                if (!repositories[epicRepo]) {
                  repositories[epicRepo] = await octokit.repos.get({owner: owner, repo: epicRepo}).then(res => res.data)
                }
                
                await zenhub.addIssueToEpic(repositories[epicRepo].id, issueNumber, {repoId: repository.id, issueNumber: issue.number })
              }
            }
          }
        }

        cli.action.stop()

      } catch (error) {
        this.log(error)
      }
    }
  }
}
