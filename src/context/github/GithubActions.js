const GITHUB_API_TOKEN = process.env.REACT_APP_API_TOKEN;

export const searchUsers = async (text) => {
  const params = new URLSearchParams({
      q: text
  })
  // ? The URLSearchParams contains key value pairs allows to parse query parameters 
  const response = await fetch(`https://api.github.com/search/users?${params}`, {
      headers: {
          Authorization: `token ${GITHUB_API_TOKEN}`,
      },
  });
  //? items is an object of the response from server. we are interested only in items object
  const {items} = await response.json();
  return items;
}

export const getUser = async (login) => {

  const response = await fetch(`https://api.github.com/users/${login}`, {
      headers: {
          Authorization: `token ${GITHUB_API_TOKEN}`,
      },
  });
  
  if(response.status === 404) {
      window.location = '/notfound'
      console.log("not found");
  }
  else {
      const data = await response.json();
      return data;
  }
}

// Get user repo
export const getUserRepos = async (login) => {
   
  const params = new URLSearchParams({
      sort: 'created_at',
      per_page: 10,
  })
  const response = await fetch(`https://api.github.com/users/${login}/repos?${params}`, {
      headers: {
          Authorization: `token ${GITHUB_API_TOKEN}`,
      },
  });
  const data = await response.json();
  return data;
}
