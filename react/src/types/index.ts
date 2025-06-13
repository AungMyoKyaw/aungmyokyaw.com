// Core API Types
export interface MOOCItem {
  courseTitle: string;
  type: "Course" | "Bundle";
  status: "In Progress" | "Completed";
  certificateLink: string;
  courses?: { title: string; certificateLink: string }[];
}

export interface MOOCsData {
  total: number;
  items: MOOCItem[];
  moreLink?: string;
}

// Profile Types
export interface ProfileData {
  name: string;
  image: string;
  title: string;
  socialLinks: SocialLink[];
}

export interface SocialLink {
  href: string;
  iconClass: string;
  label: string;
  id: string;
}

// UI Component Types
export interface LoadingState {
  isLoading: boolean;
  progress: number;
  stage: string;
}

export interface AccessibilityPreferences {
  prefersReducedMotion: boolean;
  highContrast: boolean;
}

export interface RevealState {
  revealedItems: Set<number>;
  registerElement: (element: HTMLElement | null, index: number) => void;
}

// Component Props Types
export interface MOOCCardProps {
  mooc: MOOCItem;
  index: number;
}

export interface ProfileHeaderProps {
  profile: ProfileData;
}

export interface StatsData {
  totalCourses: number;
  completedCourses: number;
  inProgressCourses: number;
  specializations: number;
}
