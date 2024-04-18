import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.defaults({
  toggleActions: "restart pause resume pause",
  scroller: ".main-container",
});

gsap.to(".title-text .name", { top: "0rem", delay: 0.5, duration: 0.5 });
gsap.to(".title-text .subtitle", { opacity: 1, delay: 1 });

const bioGraphicTimeline = gsap.timeline({
  scrollTrigger: {
    trigger: ".bio",
    start: "top center",
  },
});

bioGraphicTimeline
  .to("#Table", { opacity: 1, duration: 0.5 })
  .to("#Laptop", { opacity: 1, translateX: 0, duration: 0.5 })
  .to("#Plant", { opacity: 1, duration: 0.5 })
  .to("#Mug", { opacity: 1, duration: 0.5 })
  .to("#Person", { opacity: 1, duration: 0.5 })
  .to("#Halo", { opacity: 1, duration: 0.5 });

gsap.from(".projects", {
  scrollTrigger: {
    trigger: ".bio",
    start: "17% top",
    scrub: true,
    pin: true,
  },
  xPercent: 100,
});
