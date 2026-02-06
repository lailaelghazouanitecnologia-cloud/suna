export interface MockThread {
  id: string;
  name: string;
  updatedAt: string;
  agentIcon?: string;
  agentColor?: string;
}

export interface MockMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  createdAt: string;
}

export const mockUser = {
  name: "Alex Chen",
  email: "alex@example.com",
  avatar: "",
  plan: "Pro",
};

export const mockThreads: MockThread[] = [
  { id: "t1", name: "Analyze Q4 sales data and build dashboard", updatedAt: "2 min ago" },
  { id: "t2", name: "Create landing page for new product launch", updatedAt: "1 hour ago" },
  { id: "t3", name: "Research competitor pricing strategies", updatedAt: "3 hours ago" },
  { id: "t4", name: "Debug authentication flow in mobile app", updatedAt: "Yesterday" },
  { id: "t5", name: "Write API documentation for v2 endpoints", updatedAt: "Yesterday" },
  { id: "t6", name: "Design system tokens migration plan", updatedAt: "2 days ago" },
  { id: "t7", name: "Optimize database queries for reports", updatedAt: "3 days ago" },
  { id: "t8", name: "Setup CI/CD pipeline for staging", updatedAt: "1 week ago" },
];

export const mockMessages: Record<string, MockMessage[]> = {
  t1: [
    { id: "m1", role: "user", content: "Can you analyze the Q4 sales data from our Postgres database and build a dashboard showing revenue trends, top products, and regional breakdown?", createdAt: "10:32 AM" },
    { id: "m2", role: "assistant", content: "I'll analyze the Q4 sales data and build a comprehensive dashboard. Let me start by connecting to your database and pulling the relevant data.\n\nI've found 3 tables: `orders`, `products`, and `regions`. The Q4 data spans October through December with **12,847 transactions** totaling **$2.4M in revenue**.\n\nHere's what I'm seeing:\n\n- **Revenue trend**: 18% increase from Q3, with December being the strongest month\n- **Top products**: Enterprise Plan ($890K), Pro Plan ($720K), Starter Plan ($410K)\n- **Regional breakdown**: North America 45%, Europe 32%, APAC 23%\n\nI'm building the dashboard now with interactive charts for each metric. Would you like me to add any specific visualizations?", createdAt: "10:33 AM" },
    { id: "m3", role: "user", content: "Yes, add a cohort retention chart and export the whole thing as a PDF report", createdAt: "10:35 AM" },
    { id: "m4", role: "assistant", content: "Done! I've added a cohort retention heatmap showing month-over-month retention rates. The data reveals strong retention at **87% M1** dropping to **62% M6**.\n\nThe full PDF report has been generated with all 4 dashboard sections. You can download it from the files panel.", createdAt: "10:36 AM" },
  ],
  t2: [
    { id: "m5", role: "user", content: "I need a landing page for our new AI product. Clean, modern, with a hero section, features grid, pricing table, and CTA.", createdAt: "9:15 AM" },
    { id: "m6", role: "assistant", content: "I'll create a modern landing page with those sections. Here's my approach:\n\nThe hero section uses a large heading with a gradient text effect, a subtitle, and two CTAs (primary + secondary). Below that, a features grid with 6 cards in a 3-column layout, each with an icon, title, and description.\n\nThe pricing section has 3 tiers side by side with the middle one highlighted. Finally, a full-width CTA section with a background gradient.\n\nLet me build this out — I'm writing the HTML and Tailwind CSS now.", createdAt: "9:16 AM" },
  ],
};

export const mockModes = [
  { id: "research", name: "Research", icon: "search" },
  { id: "code", name: "Code", icon: "code" },
  { id: "slides", name: "Slides", icon: "presentation" },
  { id: "sheets", name: "Sheets", icon: "table" },
  { id: "docs", name: "Docs", icon: "file-text" },
  { id: "canvas", name: "Canvas", icon: "pen-tool" },
] as const;
