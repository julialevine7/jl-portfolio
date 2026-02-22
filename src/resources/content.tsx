import { About, Blog, Gallery, Home, Newsletter, Person, Social, Work } from "@/types";
import { Line, Row, Text } from "@once-ui-system/core";

const person: Person = {
  firstName: "Julia",
  lastName: "Levine",
  name: `Julia Levine`,
  role: "Data & Intelligence",
  avatar: "/images/avatar.png",
  email: "julialevine77@gmail.com",
  location: "America/New_York",
  languages: ["English", "Spanish"],
};

const newsletter: Newsletter = {
  display: false,
  title: <>Subscribe to {person.firstName}'s Newsletter</>,
  description: <>My weekly newsletter about creativity and engineering</>,
};

const social: Social = [
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://www.linkedin.com/in/julia-levine-62a9b2225/",
    essential: true,
  },
  {
    name: "GitHub",
    icon: "github",
    link: "https://github.com/julialevine7",
    essential: true,
  },
  {
    name: "Email",
    icon: "email",
    link: `mailto:${person.email}`,
    essential: true,
  },
];

const home: Home = {
  path: "/",
  image: `/api/og/generate?title=${encodeURIComponent("Julia Levine — Data & Intelligence")}`,
  label: "Home",
  title: `Julia Levine — Data & Intelligence`,
  description: `Data scientist by trade, builder and creative by habit.`,
  headline: (
    <>
      Builds that make{" "}
      <Text as="span" size="l" weight="strong" style={{ fontStyle: "italic" }}>
        data
      </Text>{" "}
      make{" "}
      <Text as="span" size="l" weight="strong" color="accent-400" style={{ fontStyle: "italic" }}>
        sense
      </Text>
    </>
  ),
  featured: {
    display: false,
    title: <></>,
    href: "",
  },
  subline: <>Data scientist by trade, builder and creative by habit.</>,
};

const about: About = {
  path: "/about",
  label: "About",
  title: `About Me`,
  description: `Meet ${person.name}, ${person.role}`,
  tableOfContent: {
    display: true,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  calendar: {
    display: false,
    link: "https://cal.com",
  },
  intro: {
    display: true,
    title: "Introduction",
    description: (
      <>
        I'm a data-minded problem solver who likes building things that are both
        useful and interesting. I studied Cognitive Science and Politics,
        Philosophy, and Economics at the University of Pennsylvania with a minor
        in Data Science, and I now work in financial crimes intelligence at PwC
        — where I develop AI testing agents and dig into large-scale datasets to
        surface risk. Outside of work, I'm drawn to creative projects that blend
        data, design, and code. I enjoy 2D and 3D design, play bass guitar, and
        am always looking for the next thing to learn or build.
      </>
    ),
  },
  work: {
    display: true,
    title: "Work Experience",
    experiences: [
      {
        company: "PwC",
        timeframe: "Aug 2025 – Present",
        role: "Business Intelligence Associate, Financial Crimes Unit",
        achievements: [
          <>
            Specialist in developing AI Testing Agents (Red Flag Typology
            Classifier, Data Quality Testing) as part of the Agentic AI Center
            of Excellence for internal and client use — focused on governance and
            usability of AI implementations.
          </>,
          <>
            Leveraging SQL for large dataset analytics and direct user
            enforcement at a major tech client.
          </>,
          <>
            Identified potential for reducing client user friction by 26.5%
            based on updated sanctions policies.
          </>,
          <>
            Highlighted screening efficiency issues and identified heavy-hitter
            examples to be addressed by the third-party screening vendor.
          </>,
        ],
        images: [],
      },
      {
        company: "PwC",
        timeframe: "Jun 2024 – Aug 2024",
        role: "Data & Analytics Tech Intern, Financial Crimes Unit",
        achievements: [
          <>
            Used R, SQL, and Python to develop monitoring techniques to detect
            "red flag" transactions.
          </>,
          <>
            Crafted a machine learning algorithm proposal to predict suspicious
            transactions and prevent fraudulent activity.
          </>,
        ],
        images: [],
      },
      {
        company: "Prudential Financial",
        timeframe: "Jun 2023 – Aug 2023",
        role: "Risk Management Intern",
        achievements: [
          <>
            Used data analytics to inform risk processes related to Compliance
            and Audit functions.
          </>,
          <>
            Contributed to the ORM platform turnover, organizing Business Unit
            information for a cleaner transfer.
          </>,
        ],
        images: [],
      },
      {
        company: "Spectrum Networks NY1",
        timeframe: "Jun 2022 – Aug 2022",
        role: "Political News Intern",
        achievements: [
          <>
            Assisted production for "Inside City Hall," researching past
            elections and preparing informative material to predict outcomes for
            upcoming New York races.
          </>,
          <>
            Wrote script blocks for live shows based on the latest political
            news developments.
          </>,
        ],
        images: [],
      },
      {
        company: "Long Island University at C.W. Post",
        timeframe: "Jun 2019 – Nov 2020",
        role: "Independent Researcher",
        achievements: [
          <>
            Conducted biomedical research on celiac disease progression,
            performing data analysis using GraphPad Prism 8.
          </>,
          <>
            Regeneron Science Talent Search Semi-Finalist (top 300
            internationally).
          </>,
        ],
        images: [],
      },
    ],
  },
  studies: {
    display: true,
    title: "Studies",
    institutions: [
      {
        name: "University of Pennsylvania",
        description: (
          <>
            B.A. in Cognitive Science (Computation & Cognition) and Politics,
            Philosophy, and Economics (Choice & Behavior). Minor in Data Science
            and Analytics. Graduated May 2025.
          </>
        ),
      },
    ],
  },
  technical: {
    display: true,
    title: "Technical skills",
    skills: [
      {
        title: "Data & Analytics",
        description: (
          <>
            Proficient in R, Python, and SQL for data wrangling, statistical
            analysis, and machine learning. Experience building AI agents and
            testing frameworks. Working proficiency in Java and MATLAB.
          </>
        ),
        tags: [
          { name: "Python", icon: "python" },
          { name: "R", icon: "r" },
          { name: "SQL", icon: "document" },
          { name: "Git", icon: "git" },
        ],
        images: [],
      },
      {
        title: "Visualization",
        description: (
          <>
            RShiny interactive web apps, ggplot2, Leaflet mapping, and Python
            visualization libraries (matplotlib, seaborn, plotly). Also
            experienced with Tableau and GraphPad Prism for research-grade
            charts.
          </>
        ),
        tags: [
          { name: "Tableau", icon: "tableau" },
          { name: "RShiny", icon: "r" },
          { name: "plotly", icon: "python" },
        ],
        images: [],
      },
      {
        title: "Design & Creative",
        description: (
          <>
            2D and 3D design with Fusion360, Autodesk Maya, and the Adobe
            Creative Suite. I like bringing a visual eye to data-driven work.
          </>
        ),
        tags: [
          { name: "Adobe Suite", icon: "adobe" },
          { name: "Fusion360", icon: "grid" },
        ],
        images: [],
      },
    ],
  },
};

const work: Work = {
  path: "/work",
  label: "Work",
  title: `Projects – ${person.name}`,
  description: `Data and dev projects by ${person.name}`,
};

const gallery: Gallery = {
  path: "/gallery",
  label: "Gallery",
  title: `Photo gallery – ${person.name}`,
  description: `A photo collection by ${person.name}`,
  images: [
    {
      src: "/images/gallery/horizontal-1.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-4.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/horizontal-3.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-1.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/vertical-2.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/horizontal-2.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/horizontal-4.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-3.jpg",
      alt: "image",
      orientation: "vertical",
    },
  ],
};

export { person, social, newsletter, home, about, work, gallery };
