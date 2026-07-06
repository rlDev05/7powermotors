export const premiumEase = [0.16, 1, 0.3, 1] as const;

export const revealContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.08,
    },
  },
};

export const revealUp = {
  hidden: { opacity: 0, y: 28, filter: 'blur(10px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.72, ease: premiumEase },
  },
};

export const revealLeft = {
  hidden: { opacity: 0, x: -28, filter: 'blur(10px)' },
  visible: {
    opacity: 1,
    x: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.72, ease: premiumEase },
  },
};

export const revealRight = {
  hidden: { opacity: 0, x: 28, filter: 'blur(10px)' },
  visible: {
    opacity: 1,
    x: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.72, ease: premiumEase },
  },
};

export const mediaReveal = {
  hidden: { opacity: 0, scale: 1.035, filter: 'blur(12px)' },
  visible: {
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.88, ease: premiumEase },
  },
};
