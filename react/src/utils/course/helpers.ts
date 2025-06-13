import type { MOOCsData, StatsData } from "../../types";

// Helper function to calculate total courses (including individual courses in bundles)
export const getTotalCourses = (data: MOOCsData): number => {
  return data.items.reduce((total, item) => {
    if (item.type === "Bundle" && item.courses) {
      return total + item.courses.length;
    }
    return total + 1; // Individual course
  }, 0);
};

// Helper function to calculate completed courses
export const getCompletedCourses = (data: MOOCsData): number => {
  return data.items.reduce((total, item) => {
    if (item.status === "Completed") {
      if (item.type === "Bundle" && item.courses) {
        return total + item.courses.length;
      }
      return total + 1;
    }
    return total;
  }, 0);
};

// Helper function to calculate in-progress courses
export const getInProgressCourses = (data: MOOCsData): number => {
  return data.items.filter((item) => item.status === "In Progress").length;
};

// Helper function to get all stats
export const getCourseStats = (data: MOOCsData): StatsData => {
  return {
    totalCourses: getTotalCourses(data),
    completedCourses: getCompletedCourses(data),
    inProgressCourses: getInProgressCourses(data),
    specializations: data.items.length
  };
};

// Helper function to truncate course title
export const truncateCourseTitle = (title: string, maxLength = 65): string => {
  const cleanTitle = title.replace(" ⏳", "");
  return cleanTitle.length > maxLength
    ? `${cleanTitle.substring(0, maxLength)}...`
    : cleanTitle;
};

// Helper function for image error fallback
export const getAvatarFallback = (name: string): string => {
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&size=160&background=random`;
};
