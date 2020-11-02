export default async (_, res) => {
    const rootURL = "https://api.github.com/users/Jhong098"
    const userResponse = await fetch(rootURL);
    const userReposResponse = await fetch(
      `${rootURL}/repos`
    );
  
    const user = await userResponse.json();
    const repositories = await userReposResponse.json();
  
    const mine = repositories.filter((repo) => !repo.fork);
    const stars = mine.reduce((accumulator, repository) => {
      return accumulator + repository['stargazers_count'];
    }, 0);
  
    return res.status(200).json({
      followers: user.followers,
      stars
    });
  };
  