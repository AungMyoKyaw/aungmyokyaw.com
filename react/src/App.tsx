import React from "react";

// Data Definition
const profileData = {
  name: "Aung Myo Kyaw",
  image: "https://avatars.githubusercontent.com/u/9404824?v=4",
  title: "Curious Programmer | Lifelong Learner",
  socialLinks: [
    {
      href: "https://www.linkedin.com/in/aungmyokyaw/",
      iconClass: "fab fa-linkedin",
    },
    {
      href: "https://github.com/AungMyoKyaw",
      iconClass: "fab fa-github",
    },
    {
      href: "https://www.coursera.org/learner/aungmyokyaw",
      iconClass: "fas fa-graduation-cap",
    },
  ],
};

const educationData = {
  degree: "Bachelor of Engineering",
  university: "University located in Myanmar",
  graduationYear: "2016",
};

const skillsData = ["I can think", "I can wait", "I can fast"];

const moocsData = {
  total: 1000,
  specializationTitle: "JavaScript Fundamentals Specialization",
  specializationLink: "specialization-certificate-link",
  courses: [
    {
      title: "JavaScript Basics",
      certificateLink: "certificate-link-1",
    },
    {
      title: "Advanced JavaScript",
      certificateLink: "certificate-link-2",
    },
  ],
  allMoocsLink: "all-moocs-link",
};

const blogPostsData = [
  {
    title: "Building Scalable Web Apps",
    link: "recent-blog-post-link-1",
  },
  {
    title: "Intro to Machine Learning",
    link: "recent-blog-post-link-2",
  },
];

// ProfileHeader Component
const ProfileHeader: React.FC<{ profile: typeof profileData }> = ({
  profile,
}) => (
  <header id="profile-header" className="text-center mb-10 sm:mb-16">
    <img
      src={profile.image}
      alt={profile.name}
      className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-full mx-auto mb-4 border-4 border-gray-100 shadow-md"
    />
    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">
      {profile.name}
    </h1>
    <p className="text-base sm:text-lg md:text-xl mt-2 text-gray-500">
      {profile.title}
    </p>
    <div className="flex justify-center space-x-4 sm:space-x-6 mt-4 sm:mt-6">
      {profile.socialLinks.map((link, index) => (
        <a
          key={index}
          href={link.href}
          target="_blank"
          className="text-gray-500 hover:text-gray-800 transition duration-300"
          rel="noreferrer"
        >
          <i className={`${link.iconClass} fa-xl sm:fa-2x`}></i>
        </a>
      ))}
    </div>
  </header>
);

// EducationSection Component
const EducationSection: React.FC<{ education: typeof educationData }> = ({
  education,
}) => (
  <section id="education-section" className="mb-10 sm:mb-16">
    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 border-b-2 border-gray-200 pb-2 mb-4 sm:mb-6">
      Education
    </h2>
    <div className="bg-gray-50 p-4 sm:p-6 rounded-lg shadow-md">
      <p className="text-lg sm:text-xl font-medium">{education.degree}</p>
      <p className="text-gray-600">
        {education.university}, {education.graduationYear}
      </p>
    </div>
  </section>
);

// SkillsSection Component
const SkillsSection: React.FC<{ skills: string[] }> = ({ skills }) => (
  <section id="skills-section" className="mb-10 sm:mb-16">
    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 border-b-2 border-gray-200 pb-2 mb-4 sm:mb-6">
      Skills
    </h2>
    <div className="flex flex-wrap gap-2 sm:gap-4">
      {skills.map((skill, index) => (
        <span
          key={index}
          className="bg-gray-100 text-gray-800 px-3 py-1 sm:px-4 sm:py-2 rounded-full text-base sm:text-lg font-medium shadow-sm"
        >
          {skill}
        </span>
      ))}
    </div>
  </section>
);

// MOOCsSection Component
const MOOCsSection: React.FC<{ moocs: typeof moocsData }> = ({ moocs }) => (
  <section id="moocs-section" className="mb-10 sm:mb-16">
    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 border-b-2 border-gray-200 pb-2 mb-4 sm:mb-6">
      Completed MOOCs
    </h2>
    <p className="text-gray-700 text-base sm:text-lg mt-2">
      Total Completed MOOCs: {moocs.total}
    </p>
    <div className="space-y-6">
      <div className="bg-gray-50 p-4 sm:p-6 rounded-lg shadow-md">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
          <h3 className="text-xl sm:text-2xl font-semibold text-gray-900">
            {moocs.specializationTitle}
          </h3>
          <a
            href={moocs.specializationLink}
            target="_blank"
            className="text-gray-700 hover:underline mt-2 sm:mt-0"
            rel="noreferrer"
          >
            View Certificate
          </a>
        </div>
        <div className="space-y-4">
          {moocs.courses.map((course, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white rounded-lg p-4 border border-gray-200"
            >
              <p className="text-base sm:text-lg font-medium">{course.title}</p>
              <a
                href={course.certificateLink}
                target="_blank"
                className="text-gray-700 hover:underline mt-2 sm:mt-0"
                rel="noreferrer"
              >
                View Certificate
              </a>
            </div>
          ))}
        </div>
        <div className="mt-4 text-center">
          <a
            href={moocs.allMoocsLink}
            target="_blank"
            className="inline-block text-sm sm:text-base text-gray-600 hover:text-gray-800 underline transition duration-300 font-medium"
            rel="noreferrer"
          >
            View All Courses
          </a>
        </div>
      </div>
    </div>
  </section>
);

// BlogSection Component
const BlogSection: React.FC<{ blogPosts: typeof blogPostsData }> = ({
  blogPosts,
}) => (
  <section id="blog-section" className="mb-10 sm:mb-16">
    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 border-b-2 border-gray-200 pb-2 mb-4 sm:mb-6">
      Recent Blog Posts
    </h2>
    <ul className="space-y-4">
      {blogPosts.map((post, index) => (
        <li
          key={index}
          className="p-4 rounded-lg bg-gray-50 shadow-md hover:shadow-lg transition-shadow duration-300"
        >
          <a
            href={post.link}
            target="_blank"
            className="text-lg sm:text-xl text-gray-700 hover:underline"
            rel="noreferrer"
          >
            {post.title}
          </a>
        </li>
      ))}
    </ul>
  </section>
);

// Main App Component
const App: React.FC = () => (
  <div className="bg-white text-gray-800 font-sans min-h-screen flex flex-col">
    <div className="container mx-auto p-4 sm:p-6 max-w-screen-lg flex-grow">
      <ProfileHeader profile={profileData} />
      <EducationSection education={educationData} />
      <SkillsSection skills={skillsData} />
      <MOOCsSection moocs={moocsData} />
      <BlogSection blogPosts={blogPostsData} />
    </div>
  </div>
);

export default App;
