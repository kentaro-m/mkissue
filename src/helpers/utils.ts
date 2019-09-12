export type Maybe<T> = undefined | T

// https://github.com/{org}/{repo}/issues/{issue_number} からrepoとissue_numberを取得する 
export const getRepoNameAndIssueNumberFromIssueURL = (issueURL: string): Maybe<{ repo: string, issueNumber: number }> => {
  const splittedIssueURL = issueURL.split('/')
  if (splittedIssueURL.length !== 7) {
    return
  }

  const repo = splittedIssueURL[4]
  const issueNumber = Number(splittedIssueURL[6])
  if (!Number.isInteger(issueNumber)) {
    return
  }
  return { repo, issueNumber }
}