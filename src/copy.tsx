import React from "react";
import {
  Linkedin,
  Github,
  Mail,
  Instagram,
  hk1,
  hk2,
  hk3,
  hk4,
  hk5,
  hk6,
  art1,
  art2,
  art3,
  art4,
  Resume,
  HTN
} from "static";

const landing = {
  pages: 3,
  sections: [
    {
      header: "Travel",
      redirect: "travel",
      images: [hk1, hk2, hk3, hk4],
      text: "Not all those who wander are lost"
    },
    {
      header: "Art",
      redirect: "art",
      images: [art1, art2, art3, art4],
      text: "We don’t make mistakes, just happy little accidents"
    }
  ]
};

const experiencesList = [
  {
    title: "Canoo",
    role: "Software Tools and Automation",
    location: "Torrance, California",
    time: "Sept - Dec 2019",
    link: "https://canoo.com",
    details: [
      "Increased productivity by creating software release management tool with React, Typescript, Python, and Flask to monitor and control builds for 10+ vehicle components.",
      "Sped up software release generation by 2x with asyncio in Python 3",
      "Enhanced code quality and coverage by adding linter, unit tests in Jenkins CI/CD pipelines for all software tools"
    ]
  },
  {
    title: "Hack the North",
    role: "Frontend Developer",
    location: "Waterloo, Ontario",
    time: "Jan - Dec 2019",
    link: "https://hackthenorth.com",
    details: [
      "Created delightful web experiences with React, Typescript, and Styled Components for one of the world’s largest hackathons, with more than 30k unique visitors and 3M requests per month",
      "Improved maintainability and customizability by creating a themeable React component library for all Hack the North projects"
    ]
  },
  {
    title: "StackAdapt",
    role: "Software Engineering",
    location: "Toronto, Ontario",
    time: "Jan - Apr 2019",
    link: "https://stackadapt.com",
    details: [
      "Implemented customization and productivity features on web platform that manages 3000+ ad campaigns with Ruby on Rails, React, and Redux ",
      "Increased ad bidding effectiveness for 1000+ bid requests per minute by adding logic in Go application to allow users to dynamically control the bidding frequency",
      "Designed user preset system based on user type for hundreds of active users"
    ]
  },
  {
    title: "Monogram",
    role: "Software Developer",
    location: "Kitchener, Ontario",
    time: "May - Aug 2018",
    link: "https://monogramcc.com/",
    details: [
      "Improved performance for Qt desktop application and various content-creating software plugins by refactoring legacy code",
      "Boosted responsiveness and maintainability by developing USB serial communication interface in Node",
      "Ensured 95% test coverage by writing effective unit tests"
    ]
  },
  {
    title: "Jam3",
    role: "Software Developer",
    location: "Toronto, Ontario",
    time: "Sep – Dec 2017",
    link: "https://jam3.com/",
    details: [
      "Built responsive, pixel-perfect campaign websites for Facebook Messenger Kids and Youtube AdBlitz 2018 with React and Angular",
      "Collaborated with 3D designer to creaste interactive AR Masks using Spark AR Studio for Coca-Cola",
      "Expedited company administrative workflow by creating a seat-planner application with the MEAN stack"
    ]
  }
];

const links = [
  {
    name: "instagram",
    img: (className: string) => <Instagram className={className} />,
    link: "https://www.instagram.com/hong.json/"
  },
  {
    name: "linkedin",
    img: (className: string) => <Linkedin className={className} />,
    link: "https://www.linkedin.com/in/jason-hong/"
  },
  {
    name: "github",
    img: (className: string) => <Github className={className} />,
    link: "https://github.com/Jhong098"
  },
  {
    name: "email",
    img: (className: string) => <Mail className={className} />,
    link: "mailto:jhong098@gmail.com"
  }
];

const resume = {
  name: "resume",
  link: Resume
};

const travel = [
  {
    img: hk1,
    desc: "Hong Kong, 2016"
  },
  {
    img: hk2,
    desc: "Hong Kong, 2016"
  },
  {
    img: hk3,
    desc: "Hong Kong, 2016"
  },
  {
    img: hk4,
    desc: "Hong Kong, 2016"
  },
  {
    img: hk5,
    desc: "Hong Kong, 2016"
  },
  {
    img: hk6,
    desc: "Hong Kong, 2016"
  }
];

const art = [
  {
    img: art1,
    desc: "The Studio, 2015"
  },
  {
    img: art2,
    desc: "Vases, 2015"
  },
  {
    img: art3,
    desc: "Skull, 2014"
  },
  {
    img: art4,
    desc: "Hand with Reflecting Sphere, 2014"
  }
];

const projects = [
  {
    title: "Hack the North Website",
    time: "2019",
    img: HTN,
    desc: "2019 website for the largest hackathon in Canada.",
    techs: ["React", "TypeScript", "Styled Components"],
    link: "https://hackthenorth.com",
    github: "https://github.com/hackthenorth/hackthenorth.com"
  },
  {
    title: "Hack the North Website1",
    time: "2019",
    img: HTN,
    desc: "2019 website for the largest hackathon in Canada.",
    techs: ["React", "TypeScript", "Styled Components"],
    link: "https://hackthenorth.com",
    github: "https://github.com/hackthenorth/hackthenorth.com"
  },
  {
    title: "Hack the North Website2",
    time: "2019",
    img: HTN,
    desc: "2019 website for the largest hackathon in Canada.",
    techs: ["React", "TypeScript", "Styled Components"],
    link: "https://hackthenorth.com",
    github: "https://github.com/hackthenorth/hackthenorth.com"
  }
];

const footer = {
  text: "Built with ☕+💗"
};

const email = "jhong098@gmail.com";

const navLinks = ["experience", "projects", "hobbies"];

export {
  landing,
  links,
  projects,
  footer,
  experiencesList,
  travel,
  art,
  resume,
  email,
  navLinks
};
