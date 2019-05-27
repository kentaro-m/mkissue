import {Command, flags} from '@oclif/command'
import {cli} from 'cli-ux'
import * as parse from 'csv-parse'
import * as fs from 'fs'
import {promisify} from 'util'
import * as Octokit from '@octokit/rest'

export default class Run extends Command {
  static description = 'create issues from csv file'

  static example = `$ csv2issue run issues.csv
Loaded issue data from csv file:

Title                                                             Label
Enable to install from npm registry                               feature request
Save GitHub token for creating issues to local configuration file feature request
Add ZenHub support                                                feature request, discussion
Add CI/CD for using GitHub Actions                                feature request

What is owner name?: kentaro-m
What is repository name?: create-issues-test
What is GitHub token?: ****************
Continue? [yes/no]: yes
Creating issues... done`

  static flags = {
    help: flags.help({char: 'h'}),
  }

  static args = [{
    name: 'file',
    description: 'where to load csv file',
    required: true,
  }]

  async run() {
    const {args} = this.parse(Run)

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
        const host = await cli.prompt('What is GitHub host?', {
          default: 'https://api.github.com'
        })
        const token = await cli.prompt('What is GitHub token?', {type: 'mask'})

        const confirm = await cli.confirm('Continue? [yes/no]')

        if (!confirm) {
          return
        }

        cli.action.start('Creating issues')

        const options = {
          baseUrl: host ? host : 'https://api.github.com',
          auth: `token ${token}`
        }

        const octokit = new Octokit(options)

        for (const item of data) {
          const params = {
            owner: owner,
            repo: repo,
            title: item.title,
            body: item.body,
            labels: item.labels ? item.labels.split(',') : []
          }

          await octokit.issues.create(params);
        }

        cli.action.stop()

      } catch (error) {
        this.log(error)
      }
    }
  }
}
