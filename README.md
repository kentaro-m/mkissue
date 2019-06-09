:ticket: mkissue
=========
[![npm](https://img.shields.io/npm/v/mkissue.svg)](https://www.npmjs.com/package/mkissue)
[![npm](https://img.shields.io/npm/dt/mkissue.svg)](https://www.npmjs.com/package/mkissue)
![GitHub](https://img.shields.io/github/license/kentaro-m/mkissue.svg)

Create GitHub issues from importing CSV file.

## :arrow_forward: Usage

### Create GitHub issues
You need to create [personal access token for GitHub (scope:repo)](https://github.com/settings/tokens) before mkissue runs.

```bash
# Install tool
$ npm install -g mkissue

# Create GitHub issues
$ mkissue run issues.csv
Loaded issue data from csv file:

  Title                                                             Labels
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

### Create CSV file contain issue data
The header of CSV file contains need to title, body, and labels. Please refer to the template below.

[mkissue template (Google Sheets)](https://docs.google.com/spreadsheets/d/1_AefuYDiQxnl-6-pzE7ppGbA3sSREruFnUcVCNNecLg/edit?usp=sharing)

```csv
title,body,labels
titleA,bodyA,"good first issue,bug"
titleB,bodyB,bug
titleC,bodyC,enhancement
```

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

_See code: [src/commands/run.ts](https://github.com/kentaro-m/mkissue/blob/v1.0.3/src/commands/run.ts)_
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
