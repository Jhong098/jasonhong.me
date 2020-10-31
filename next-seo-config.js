const title = "Jason Hong | Software Developer";
const description = "Computer Engineering student, traveller, artist.";

const SEO = {
  title,
  description,
  canonical: "https://jasonhong.me",
  openGraph: {
    type: "website",
    locale: "en_IE",
    url: "https://jasonhong.me",
    title,
    description,
    // images: [
    //   {
    //     url: 'https://jasonhong.me/static/images/og.jpg',
    //     alt: title,
    //     width: 1280,
    //     height: 720
    //   }
    // ]
  },
  twitter: {
    handle: "@jadoretech",
    site: "@jadoretech",
    cardType: "summary_large_image",
  },
};

export default SEO;
