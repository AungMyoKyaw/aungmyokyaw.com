import type { ProfileData } from "../../types";

export const PROFILE_DATA: ProfileData = {
  name: "Aung Myo Kyaw",
  image: "https://avatars.githubusercontent.com/u/9404824?v=4",
  title: "Tech Lead | Curious Programmer | Lifelong Learner",
  socialLinks: [
    {
      href: "https://www.linkedin.com/in/aungmyokyaw/",
      iconClass: "fab fa-linkedin",
      label: "LinkedIn Profile",
      id: "linkedin"
    },
    {
      href: "https://github.com/AungMyoKyaw",
      iconClass: "fab fa-github",
      label: "GitHub Profile",
      id: "github"
    },
    {
      href: "https://www.coursera.org/learner/aungmyokyaw",
      iconClass: "fas fa-graduation-cap",
      label: "Coursera Profile",
      id: "coursera"
    }
  ]
};

export const API_ENDPOINTS = {
  MOOCS_DATA: "https://moocs.aungmyokyaw.com/moocsData.json",
  GITHUB_REPO: "https://github.com/AungMyoKyaw/MOOCs"
};

export const LOADING_STAGES = [
  { stage: "Connecting to server...", progress: 20 },
  { stage: "Fetching learning data...", progress: 50 },
  { stage: "Processing certificates...", progress: 75 },
  { stage: "Finalizing portfolio...", progress: 90 },
  { stage: "Ready!", progress: 100 }
];

export const ANIMATION_DURATIONS = {
  CARD_HOVER: 500,
  LOADING_STAGE: 400,
  LOADING_STAGE_REDUCED: 100,
  FINAL_LOADING: 600,
  RIPPLE_EFFECT: 600
};

export const DEMO_DATA = {
  total: 1,
  items: [
    {
      courseTitle: "Demo Course - Portfolio Showcase",
      status: "Completed" as const,
      type: "Course" as const,
      certificateLink: "#"
    }
  ]
};
