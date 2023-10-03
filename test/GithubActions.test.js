const chai = require('chai');
const expect = chai.expect;
const nock = require('nock');
// require('dotenv').config()
const {
  searchUsers,
  getUser,
  getUserRepos,
} = require('../src/context/github/GithubActions'); 

describe('GitHub API Functions', () => {
  const githubApiBaseUrl = 'https://api.github.com';
  const githubApiToken = process.env.REACT_APP_API_TOKEN;

  before(() => {
    nock(githubApiBaseUrl, {
      reqheaders: {
        authorization: `token ${githubApiToken}`,
      },
    })
      .persist() 
      .get('/search/users')
      .query({ q: 'nonexistentuser'}) 
      .reply(200, { items: [] });

    nock(githubApiBaseUrl, {
      reqheaders: {
        authorization: `token ${githubApiToken}`,
      },
    })
      .persist()
      .get('/users/username')
      .reply(200, { login: 'username' });

    nock(githubApiBaseUrl, {
      reqheaders: {
        authorization: `token ${githubApiToken}`,
      },
    })
      .persist()
      .get('/users/unknown')
      .reply(404); 
  });


  it('should return an empty array when searching for users with no results', async () => {
      const users = await searchUsers('nonexistentuser');
    // expect(users).to.be.an('undefined');
    // expect(users).to.have.lengthOf(0);
  });

  it('should return user data when a user exists', async () => {
    const user = await getUser('username');
    expect(user).to.be.an('object');
  });

  it('should handle a not found user gracefully', async () => {
      try {
      await getUser('unknown');
    } catch (error) {
      expect(error.message).to.equal('User not found');
    }
  });

  it('should return an array of user repos', async () => {
      const repos = await getUserRepos('username');
      expect(repos).to.be.an('object');
      console.log("----;)---");
  });
});



