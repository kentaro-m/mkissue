csv2issue
=========

Create GitHub issues from importing CSV file.

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/csv2issue.svg)](https://npmjs.org/package/csv2issue)
[![CircleCI](https://circleci.com/gh/csv2issue/csv2issue/tree/master.svg?style=shield)](https://circleci.com/gh/csv2issue/csv2issue/tree/master)
[![Downloads/week](https://img.shields.io/npm/dw/csv2issue.svg)](https://npmjs.org/package/csv2issue)
[![License](https://img.shields.io/npm/l/csv2issue.svg)](https://github.com/csv2issue/csv2issue/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g csv2issue
$ csv2issue COMMAND
running command...
$ csv2issue (-v|--version|version)
csv2issue/0.0.0 darwin-x64 node-v8.15.0
$ csv2issue --help [COMMAND]
USAGE
  $ csv2issue COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`csv2issue hello [FILE]`](#csv2issue-hello-file)
* [`csv2issue help [COMMAND]`](#csv2issue-help-command)

## `csv2issue hello [FILE]`

describe the command here

```
USAGE
  $ csv2issue hello [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print

EXAMPLE
  $ csv2issue hello
  hello world from ./src/hello.ts!
```

_See code: [src/commands/hello.ts](https://github.com/csv2issue/csv2issue/blob/v0.0.0/src/commands/hello.ts)_

## `csv2issue help [COMMAND]`

display help for csv2issue

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
