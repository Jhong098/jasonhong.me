import { Art, Temple, linkedin, github, mail, resume, Canoo } from "static";

const landing = {
  pages: 3,
  sections: [
    {
      header: "Experience",
      redirect: "experience",
      image: Canoo,
      text: "werk."
    },
    {
      header: "Travel",
      redirect: "travel",
      image: Temple,
      text:
        "The substance can take you to heaven but it can also take you to hell. Or else to both, together or alternately. Or else (if you're lucky, or if you've made yourself ready) beyond either of them. And then beyond the beyond, back to where you started from — back to here, back to New Rotham sted, back to business as usual. Only now, of course, business as usual is completely different."
    },
    {
      header: "Art",
      redirect: "art",
      image: Art,
      text:
        "Two thousand pharmacologists and bio-chemists were subsidized. Six years later it was being produced commercially."
    }
  ]
};

const experience = [
  {
    title: "Canoo",
    desc: "lorem ipsum",
    img: Canoo
  },
  {
    title: "Hack the North",
    desc: "lorem ipsum",
    img: ""
  }
];

const links = [
  {
    name: "linkedin",
    img: linkedin,
    link: "https://www.linkedin.com/in/jason-hong/"
  },
  {
    name: "github",
    img: github,
    link: "https://github.com/Jhong098"
  },
  {
    name: "email",
    img: mail,
    link: "mailto:jhong098@gmail.com"
  },
  {
    name: "resume",
    img: resume,
    link: ""
  }
];

const footer = {
  text: "Built with ☕+💗"
};

export { landing, links, footer, experience };
