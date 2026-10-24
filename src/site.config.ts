import type { SvgComponent } from "astro/types"
import GitHub from "@/assets/icons/github.svg"
import GoogleScholar from "@/assets/icons/google-scholar.svg"
import Hackaday from "@/assets/icons/hackaday.svg"
import LinkedIn from "@/assets/icons/linkedin.svg"
import Orcid from "@/assets/icons/orcid.svg"
import RSS from "@/assets/icons/rss.svg"

/**
 * The editable content for the site lives here.
 * Change these values to make the landing page and site metadata your own.
 */
export const SITE = {
  title: "3urdparty",
  description:
    "Robots, robotic algorithms, thoughts, findings, and project updates.",
  locale: "en-US",
  dir: "ltr",
  defaultPageImage: "/static/opengraph-image.png",
  defaultPostImage: "/static/1200x630.png",
} as const

export const NAVIGATION = [
  { href: "/posts", label: "Posts" },
  { href: "/projects", label: "Projects" },
  { href: "/publications", label: "Publications" },
  { href: "/credentials", label: "Credentials" },
] as const

export const SOCIALS: { href: string; label: string; icon: SvgComponent }[] = [
  { href: "https://github.com/3urdparty", label: "GitHub", icon: GitHub },
  {
    href: "https://www.linkedin.com/in/mustafa-yousif-694080193/",
    label: "LinkedIn",
    icon: LinkedIn,
  },
  {
    href: "https://orcid.org/orcid-search/search?searchQuery=Mustafa%20Yousif%20Elagib",
    label: "ORCID",
    icon: Orcid,
  },
  {
    href: "https://scholar.google.com/scholar?q=%22Mustafa%20Yousif%20Elagib%22",
    label: "Google Scholar",
    icon: GoogleScholar,
  },
  { href: "https://hackaday.io/3urdparty", label: "Hackaday", icon: Hackaday },
  { href: "/rss.xml", label: "RSS", icon: RSS },
]

export const DICTIONARY_ENTRY = {
  word: "3urd·par·ty",
  pronunciation: "/ˌθɜːrd ˈpɑːrti/",
  partOfSpeech: "noun · adjective",
  origin:
    "from 3urd, a username, + party; a place for robots, projects, and ideas.",
  definitions: [
    {
      text: "a builder of robots and robotic algorithms",
      example: "built by 3urd",
    },
    {
      text: "thoughts, findings, and updates from current projects",
      example: "notes from the workshop",
    },
  ],
} as const

export const ABOUT = {
  label: "About me",
  heading: "I build robots.",
  paragraphs: [
    "I share thoughts, findings, and updates from current projects. I’m interested in maths, robotics, economics, history, and learning science. I train Brazilian jiu-jitsu in my free time.",
  ],
  details: [
    { label: "Focus", value: "Robotics and robotic algorithms" },
    {
      label: "Interests",
      value: "Maths, history, economics, and learning science",
    },
  ],
  links: [
    { href: "/projects", label: "See my work" },
    { href: "/posts", label: "Read my notes" },
  ],
} as const

export const siteConfig = {
  site: SITE,
  navigation: NAVIGATION,
  socials: SOCIALS,
  dictionaryEntry: DICTIONARY_ENTRY,
  about: ABOUT,
  sortPostsByUpdatedDate: false,
  comments: {
    repo: "3urdparty/personal",
    repoId: "R_kgDOVTpGKQ",
    category: "General",
    categoryId: "",
  },
} as const

export default siteConfig
