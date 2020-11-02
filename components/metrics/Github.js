import useSWR from 'swr';
import format from 'comma-number';

import fetcher from 'lib/fetcher';

import MetricCard from './Card';

const GitHub = () => {
  const { data } = useSWR('/api/github', fetcher);

//   const stars = format(data?.stars);
  const followers = format(data?.followers);
  const link = 'https://github.com/Jhong098';

  return <MetricCard header="GitHub Followers" link={link} metric={followers} />;
};

export default GitHub;
