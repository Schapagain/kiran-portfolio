/*
$color-white: #f5f5f5;
$color-primary: #61a65e;
$color-secondary: #7c7fb7;
$color-tertiary: #a65e61;
$color-bg: azure;
*/

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.defaults({
  toggleActions: "restart pause resume pause",
  scroller: ".main-container",
});

gsap.to(".title-text .name", { top: "0rem", delay: 0.5, duration: 0.5 });
gsap.to(".title-text .subtitle", { opacity: 1, delay: 1 });

const bioGraphicTimeline = gsap.timeline();
bioGraphicTimeline
  .to("#Table", { opacity: 1 })
  .to("#Laptop", { opacity: 1, translateX: 0 }, "<")
  .addLabel("plant-mug")
  .to("#Plant,#Mug", { opacity: 1 })
  .to("#Person", { opacity: 1 })
  .addLabel(".halo")
  .to("#Halo", { opacity: 1 });

ScrollTrigger.create({
  animation: bioGraphicTimeline,
  trigger: ".start-screen",
  start: "10% top",
  end: "120% top",
  scrub: true,
  // markers: true,
  pin: ".graphic-wrapper",
  pinType: "fixed",
});

gsap.to(".main-container", {
  scrollTrigger: {
    trigger: ".bio",
    end: "center center",
    scrub: true,
  },
  backgroundColor: "#61a65e",
});

// const greenToPurple = gsap.fromTo(
//   ".main-container",
//   {
//     immediateRender: false,
//     backgroundColor: "#61a65e",
//   },
//   { immediateRender: false, backgroundColor: "#7c7fb7" }
// );

// ScrollTrigger.create({
//   animation: greenToPurple,
//   trigger: ".projects",
//   end: "center center",
//   scrub: true,
// });

// create
let mm = gsap.matchMedia();

// add a media query. When it matches, the associated function will run
mm.add("(max-width: 992px)", () => {
  console.log("MATCHED");
  bioGraphicTimeline.to(".graphic-wrapper", { opacity: 0 }, "halo");
  return () => {
    // optional
    // custom cleanup code here (runs when it STOPS matching)
  };
});

// add a media query. When it matches, the associated function will run
mm.add("(min-width: 993px)", () => {
  console.log("MATCHED");
  bioGraphicTimeline.to(
    ".graphic-wrapper",
    {
      translateX: "-100%",
    },
    "plant-mug"
  );
  return () => {
    // optional
    // custom cleanup code here (runs when it STOPS matching)
  };
});

// later, if we need to revert all the animations/ScrollTriggers...
// mm.revert();
