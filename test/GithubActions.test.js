const chai = require('chai');
const expect = chai.expect;
const nock = require('nock');

const {
  searchUsers,
  getUser,
  getUserRepos,
} = require('../src/context/github/GithubActions'); // Replace with the actual path to your module

describe('GitHub API Functions', () => {
  // Mock the GitHub API base URL
  const githubApiBaseUrl = 'https://api.github.com';

  // Mock the GitHub API token
  const githubApiToken = process.env.REACT_APP_API_TOKEN;

  before(() => {
    // Configure nock to intercept HTTP requests to the GitHub API
    nock(githubApiBaseUrl, {
      reqheaders: {
        authorization: `token ${githubApiToken}`,
      },
    })
      .persist() // Persist the interceptor for all subsequent requests
      .get('/search/users')
      .query(true) // Match query parameters
      .reply(200, { items: [] }); // Mock a successful search response

    nock(githubApiBaseUrl, {
      reqheaders: {
        authorization: `token ${githubApiToken}`,
      },
    })
      .persist()
      .get('/users/hiteshjain48')
      .reply(200, { login: 'hiteshjain48' }); // Mock a successful user response

    nock(githubApiBaseUrl, {
      reqheaders: {
        authorization: `token ${githubApiToken}`,
      },
    })
      .persist()
      .get('/users/unknown')
      .reply(404); // Mock a 404 response for not found user
  });

  // Test the searchUsers function
  it('should return an empty array when searching for users with no results', async () => {
    const users = await searchUsers('nonexistentuser');
    expect(users).to.be.an('array');
    expect(users).to.have.lengthOf(0);
  });

  // Test the getUser function
  it('should return user data when a user exists', async () => {
    const user = await getUser('hiteshjain48');
    expect(user).to.be.an('object');
    expect(user.login).to.equal('hiteshjain48');
  });

  it('should handle a not found user gracefully', async () => {
    try {
      await getUser('unknown');
    } catch (error) {
      expect(error.message).to.equal('User not found');
    }
  });

  // Test the getUserRepos function
  it('should return an array of user repos', async () => {
    const repos = await getUserRepos('username');
    expect(repos).to.be.an('object');
  });
});
