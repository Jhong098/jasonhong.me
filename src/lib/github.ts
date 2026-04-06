export interface GitCommit {
  sha: string;
  message: string;
  date: string;
  url: string;
}

export async function getRecentCommits(count = 10): Promise<GitCommit[]> {
  try {
    const res = await fetch(
      `https://api.github.com/repos/Jhong098/jasonhong.me/commits?per_page=${count}`,
      { headers: { Accept: 'application/vnd.github.v3+json' } }
    );
    if (!res.ok) return [];
    const data = await res.json();
    return data.map((item: any) => ({
      sha: item.sha.slice(0, 7),
      message: item.commit.message.split('\n')[0],
      date: item.commit.author.date,
      url: item.html_url,
    }));
  } catch {
    return [];
  }
}
