:ticket: csv2issue
=========

Create GitHub issues from importing CSV file.

## :arrow_forward: Usage
<!-- usage -->
```sh-session
$ npm install -g csv2issue
$ csv2issue COMMAND
running command...

$ csv2issue (-v|--version|version)
csv2issue/0.1.0 darwin-x64 node-v8.15.0

$ csv2issue --help [COMMAND]
USAGE
  $ csv2issue COMMAND
...
```
<!-- usagestop -->

## :video_game: Commands
<!-- commands -->
* [`csv2issue run [FILE]`](#csv2issue-run-file)
* [`csv2issue help [COMMAND]`](#csv2issue-help-command)

### `csv2issue run [FILE]`

Create issues from csv file.

```
USAGE
  $ csv2issue run [FILE]

ARGUMENTS
  FILE  where to load csv file

OPTIONS
  -h, --help       show CLI help

EXAMPLES
  $ csv2issue run issues.csv
  Loaded issue data from csv file:

  Title                                                             Label
  Enable to install from npm registry                               feature request
  Save GitHub token for creating issues to local configuration file feature request
  Add ZenHub support                                                feature request, discussion
  Add CI/CD for using GitHub Actions                                feature request

  What is owner name?: kentaro-m
  What is repository name?: create-issues-test
  What is GitHub host? [https://api.github.com]:
  What is GitHub token?: ****************
  Continue? [yes/no]: yes
  Creating issues... done
```

Create a CSV file in the following format using Excel or Google Sheets:
```csv
title,body,label
"Enable to install from npm registry",Body A,"feature request"
"Save GitHub token for creating issues to local configuration file",Body B,"feature request"
"Add ZenHub support",,"feature request, discussion"
"Add GitHub Project support",,"feature request, discussion"
"Add CI/CD for using GitHub Actions",,"feature request"
```

_See code: [src/commands/run.ts](https://github.com/csv2issue/csv2issue/blob/v0.1.0/src/commands/run.ts)_

### `csv2issue help [COMMAND]`

Display help for csv2issue.

```
USAGE
  $ csv2issue help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.1.6/src/commands/help.ts)_
<!-- commandsstop -->

## :construction_worker: Development
```
# install dependencies
$ npm install

# execute the command
$ ./bin/run run issues.csv
```

## :memo: LICENSE
MIT
