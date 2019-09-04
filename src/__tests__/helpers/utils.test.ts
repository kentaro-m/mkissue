import {getRepoNameAndIssueNumberFromIssueURL} from '../../helpers/utils'

test('URLからリポジトリ名とissue番号を取得できる', () => {
    expect(getRepoNameAndIssueNumberFromIssueURL('https://github.com/org/repo/issues/1'))
        .toMatchObject({repo: 'repo', issueNumber: 1})
})

test('URL形式が違うときエラーが返ってくる', () => {
    expect(getRepoNameAndIssueNumberFromIssueURL('github.com/org/repo/issues/1'))
        .toBe(undefined)
})

test('issue番号部分が数字でないときにエラーが返ってくる', () => {
    expect(getRepoNameAndIssueNumberFromIssueURL('https://github.com/org/repo/issues/NotANumber'))
        .toBe(undefined)
})
