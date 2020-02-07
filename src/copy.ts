import { Art, Me, Temple, linkedin, github, mail, resume, Canoo } from "static";

const landing = {
  pages: 4,
  sections: [
    {
      header: "Experience",
      redirect: "experience",
      image: Canoo,
      text: "werk."
    },

    {
      header: "Me",
      redirect: "about",
      image: Me,
      text:
        "The man who comes back through the Door in the Wall will never be quite the same as the man who went out. He will be wiser but less sure, happier but less self-satisfied, humbler in acknowledging his ignorance yet better equipped to understand the relationship of words to things, of systematic reasoning to the unfathomable mystery which it tries, forever vainly, to comprehend."
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

export { landing, links, footer };
