import { Easing } from "framer-motion";

export const MOTION_DURATION = 0.8;
export const MOTION_DELAY = 0.3;
export const MOTION_EASE = "easeOut";

export const fadeInUp = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: {
    duration: MOTION_DURATION,
    ease: MOTION_EASE as Easing,
  },
};
