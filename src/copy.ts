import { createRef } from "react";
import { Art, Me, Temple } from "static/img";

const state = {
  sections: 4,
  pages: 4,
  zoom: 75,
  paragraphs: [
    {
      offset: 1,
      factor: 1.75,
      header: "Art",
      image: Art,
      aspect: 1.51,
      text:
        "Two thousand pharmacologists and bio-chemists were subsidized. Six years later it was being produced commercially."
    },
    {
      offset: 2,
      factor: 2.0,
      header: "Me",
      image: Me,
      aspect: 1.5,
      text:
        "The man who comes back through the Door in the Wall will never be quite the same as the man who went out. He will be wiser but less sure, happier but less self-satisfied, humbler in acknowledging his ignorance yet better equipped to understand the relationship of words to things, of systematic reasoning to the unfathomable mystery which it tries, forever vainly, to comprehend."
    },
    {
      offset: 3,
      factor: 2.25,
      header: "Travel",
      image: Temple,
      aspect: 1.5037,
      text:
        "The substance can take you to heaven but it can also take you to hell. Or else to both, together or alternately. Or else (if you're lucky, or if you've made yourself ready) beyond either of them. And then beyond the beyond, back to where you started from — back to here, back to New Rotham sted, back to business as usual. Only now, of course, business as usual is completely different."
    }
  ],
  stripes: [
    { offset: 0, color: "#000", height: 13 },
    { offset: 6.3, color: "#000", height: 20 }
  ],
  top: createRef()
};

export default state;
