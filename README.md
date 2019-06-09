:ticket: mkissue
=========

Create GitHub issues from importing CSV file.

## :arrow_forward: Usage
<!-- usage -->
```sh-session
$ npm install -g mkissue
$ mkissue COMMAND
running command...
$ mkissue (-v|--version|version)
mkissue/1.0.1 darwin-x64 node-v8.15.0
$ mkissue --help [COMMAND]
USAGE
  $ mkissue COMMAND
...
```
<!-- usagestop -->

## :video_game: Commands
<!-- commands -->
* [`mkissue help [COMMAND]`](#mkissue-help-command)
* [`mkissue run FILE`](#mkissue-run-file)

## `mkissue help [COMMAND]`

display help for mkissue

```
USAGE
  $ mkissue help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.1.6/src/commands/help.ts)_

## `mkissue run FILE`

create issues from csv file

```
USAGE
  $ mkissue run FILE

ARGUMENTS
  FILE  where to load csv file

OPTIONS
  -h, --help  show CLI help

EXAMPLES
  $ mkissue run issues.csv
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
  Creating issues... done
```

_See code: [src/commands/run.ts](https://github.com/kentaro-m/mkissue/blob/v1.0.1/src/commands/run.ts)_
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
