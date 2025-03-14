export interface WordPressSite {
  id: string
  name: string
  url: string
  apiUrl: string
  status: 'active' | 'inactive' | 'error'
  credentials?: {
    clientId: string
    clientSecret: string
  }
}

export interface WordPressConnectionCredentials {
  url: string
  username: string
  applicationPassword?: string
  token?: string
  authType: "application_password" | "jwt"
}

// Site Health Metrics
export interface SiteHealthMetrics {
  uptime: number // percentage
  speed: number // in ms
  overallStatus: "good" | "warning" | "critical"
  lastChecked: Date
  issues: {
    good: number
    warning: number
    critical: number
  }
}

// Traffic Analytics
export interface TrafficAnalytics {
  totalVisits: number
  uniqueUsers: number
  referralSources: {
    source: string
    count: number
  }[]
  timeframe: "day" | "week" | "month"
  data: {
    date: string
    visitors: number
    pageviews: number
  }[]
}

// Storage Usage
export interface StorageUsage {
  total: number // in MB
  media: number
  database: number
  plugins: number
  themes: number
  other: number
}

// SEO Health
export interface SEOHealth {
  score: number // 0-100
  issues: {
    severity: "good" | "warning" | "error"
    message: string
  }[]
  metrics: {
    pageSpeed: number
    missingMetaTags: number
    brokenLinks: number
    seoFriendlyUrls: number
  }
}

// Security Overview
export interface SecurityOverview {
  score: number // 0-100
  loginAttempts: number
  blockedAttacks: number
  vulnerabilities: number
  lastScan: Date
  issues: {
    severity: "low" | "medium" | "high" | "critical"
    message: string
  }[]
}

// WordPress Post type
export interface WordPressPost {
  id: number
  title: {
    rendered: string
    raw: string
  }
  content: {
    rendered: string
    raw: string
  }
  excerpt: {
    rendered: string
    raw: string
  }
  status: 'publish' | 'draft' | 'private' | 'trash'
  type: 'post' | 'page'
  author: number
  categories: number[]
  tags: number[]
  date: string
  modified: string
  slug: string
  link: string
}

// WordPress Page type
export interface WordPressPage extends Omit<WordPressPost, "categories" | "tags" | "sticky"> {
  parent: number
  menu_order: number
}

// WordPress User type
export interface WordPressUser {
  id: number
  name: string
  email: string
  roles: string[]
  avatarUrl?: string
  registered: string
  status: 'active' | 'inactive'
}

// WordPress Plugin type
export interface WordPressPlugin {
  plugin: string
  status: string
  name: string
  plugin_uri: string
  author: string
  author_uri: string
  description: {
    raw: string
    rendered: string
  }
  version: string
  network_only: boolean
  requires_wp: string
  requires_php: string
  textdomain: string
}

// WordPress Theme type
export interface WordPressTheme {
  stylesheet: string
  template: string
  name: string
  theme_uri: string
  description: string
  author: string
  author_uri: string
  version: string
  status: string
  tags: string[]
  text_domain: string
}

// Content Overview
export interface ContentOverview {
  posts: number
  pages: number
  users: number
  comments: number
  categories: number
  tags: number
}

// Recent Activity
export interface RecentActivity {
  id: number
  type: "post" | "page" | "comment" | "user" | "plugin" | "theme"
  title: string
  user: string
  timestamp: Date
  action: "create" | "update" | "delete"
}

// LMS Course
export interface WordPressCourse {
  id: number
  title: {
    rendered: string
  }
  content: {
    rendered: string
    protected: boolean
  }
  excerpt: {
    rendered: string
  }
  status: string
  date: string
  modified: string
  author: number
  featured_media: number
  link: string
  slug: string
  // LMS specific fields
  course_duration?: string
  enrolled_students?: number
  price?: string
  sale_price?: string
  categories?: number[]
  difficulty_level?: string
  instructor?: number
}

// LMS Student
export interface WordPressStudent extends WordPressUser {
  enrolled_courses?: number[]
  completed_courses?: number[]
  progress?: {
    course_id: number
    progress_percentage: number
    last_activity: string
  }[]
}

// LMS Lesson
export interface WordPressLesson {
  id: number
  title: {
    rendered: string
  }
  content: {
    rendered: string
    protected: boolean
  }
  status: string
  course_id: number
  lesson_order: number
  lesson_type: "video" | "text" | "quiz" | "assignment"
  duration: string
}

// LMS Quiz
export interface WordPressQuiz {
  id: number
  title: {
    rendered: string
  }
  description?: string
  course_id: number
  time_limit?: number // in minutes
  passing_grade?: number // percentage
  max_attempts?: number
  questions?: {
    id: number
    type: "multiple-choice" | "true-false" | "essay" | "fill-blank"
    question_text: string
    options?: string[]
    correct_answer?: string | string[]
    points: number
  }[]
}

export interface WordPressCategory {
  id: number
  name: string
  slug: string
  description: string
  parent: number
  count: number
}

export interface WordPressTag {
  id: number
  name: string
  slug: string
  description: string
  count: number
}

export interface WordPressMedia {
  id: number
  title: {
    rendered: string
  }
  source_url: string
  media_type: 'image' | 'video' | 'audio' | 'application'
  mime_type: string
  alt_text: string
  caption: {
    rendered: string
  }
}

