import * as request from 'request-promise-native'

export class ZenHub {
    private client: request.RequestPromiseAPI
    constructor({ baseUrl, token }:{ baseUrl: string, token: string }) {
        this.client = request.defaults({
            headers: {
                'X-Authentication-Token': token,
                'Content-Type': 'application/json'
            },
            baseUrl
        })
    }

    public async setEstimate(repoId: number, issueNumber: number, estimate: number): Promise<any> {
        return this.client.put(`/p1/repositories/${repoId}/issues/${issueNumber}/estimate`, {
            json: {
                estimate: estimate
            }
        })
    }

    public async addIssueToEpic(repoId: number, issueNumber: number, addIssue: {repoId: number, issueNumber: number}): Promise<any> {
        return this.client.post(`/p1/repositories/${repoId}/epics/${issueNumber}/update_issues`, {
            json: {
                add_issues: [{repo_id: addIssue.repoId, issue_number: addIssue.issueNumber}]
            }
        })
    }
}