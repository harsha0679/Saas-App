# 🚀 Converso – AI-Powered Learning Companion

Converso is an AI-powered learning platform that allows users to create personalized AI learning companions and interact with them through real-time voice conversations.

Users can choose a subject, topic, teaching style, and voice to create their own learning companions. They can start interactive learning sessions, revisit their previous sessions, and bookmark their favorite companions.

🌐 **Live Demo:** [https://saas-app-five-topaz.vercel.app/](https://saas-app-five-topaz.vercel.app/)

---

## ✨ Features

- **User Authentication:** Secure user authentication and account management using Clerk.
- **AI Learning Companions:** Create personalized AI companions based on different subjects and topics.
- **Voice Conversations:** Interact with AI companions through real-time voice conversations using Vapi.
- **Customizable Learning:** Choose different teaching styles, voices, subjects, and topics.
- **Companions Library:** Browse, search, and filter available learning companions.
- **Session History:** Keep track of previous learning sessions.
- **My Journey:** View your created companions and learning history.
- **Bookmarks:** Save your favorite companions for quick access.
- **Subscription Plans:** Manage access to companion creation limits using Clerk Billing.
- **Responsive UI:** Designed to provide a smooth experience across different screen sizes.

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| Next.js | Full-stack React framework |
| React.js | User interface |
| TypeScript | Type safety |
| Tailwind CSS | Styling |
| shadcn/ui | UI components |
| Supabase | Database and data management |
| Clerk | Authentication and billing |
| Vapi AI | Real-time voice conversations |
| Vercel | Deployment |

## 📸 Application Overview

The application includes the following sections:

1. **Home Page** – Explore available AI learning companions.
2. **Companions Library** – Browse and filter learning companions.
3. **Create Companion** – Build personalized AI companions.
4. **Companion Session** – Start voice-based learning conversations.
5. **My Journey** – View your companions and previous sessions.
6. **Bookmarks** – Access saved companions.

## ⚙️ Getting Started

Follow these instructions to run Converso locally.

### 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

### 2. Navigate to the project directory

```bash
cd YOUR_PROJECT_FOLDER
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure environment variables

Create a `.env.local` file in the root directory.

Add your service credentials:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

# Supabase Database
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=

# Vapi AI
NEXT_PUBLIC_VAPI_WEB_TOKEN=
```

**Note:** Use the exact environment variable names configured in your project's source code. Never commit your actual secret keys or tokens to GitHub.

### 5. Configure external services

Before running the application, configure:

- **Clerk:** Set up authentication and configure your billing plans and features.
- **Supabase:** Create your project and configure the required database tables.
- **Vapi:** Create an assistant and configure the voice conversation settings.

### 6. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🗄️ Database Structure

Converso uses Supabase to store application data.

The main database tables include:

| Table | Description |
|---|---|
| `companions` | Stores AI companion details and configurations |
| `session_history` | Stores user learning session records |
| `bookmarks` | Stores users' bookmarked companions |

### Main Relationships

- Each companion has a unique ID.
- Each learning session references a companion through `companion_id`.
- Each session is associated with a user through `user_id`.
- Bookmarks connect users with their saved companions.

## 💳 Subscription Management

Clerk Billing is used to manage subscription-based access.

The application supports configurable companion creation limits based on subscription features.

Example:

- Free tier: Limited companion creation.
- Higher-tier plans: Increased companion creation limits.
- Pro plan: Unlimited companion creation, according to the configured permissions.

## 📁 Project Structure

```text
converso/
│
├── app/
│   ├── (root)/
│   ├── companions/
│   ├── my-journey/
│   ├── bookmarks/
│   └── layout.tsx
│
├── components/
│   ├── ui/
│   └── ...
│
├── lib/
│   ├── actions/
│   ├── supabase.ts
│   └── utils.ts
│
├── public/
│
├── types/
│
├── .env.local
├── next.config.ts
├── package.json
└── README.md
```

*The structure above is illustrative; adjust it to match your actual repository.*

## 🚀 Deployment

The application is deployed using Vercel.

To deploy your own instance:

1. Push your project to GitHub.
2. Import the repository into Vercel.
3. Configure the required environment variables.
4. Deploy the application.
5. Configure the production URLs and authentication settings in Clerk and Vapi.

## 🎯 Learning Outcomes

Building Converso helped me gain practical experience with:

- Developing full-stack applications using Next.js.
- Implementing authentication using Clerk.
- Integrating Supabase for database operations.
- Building server actions and asynchronous data fetching.
- Integrating AI-powered voice conversations using Vapi.
- Implementing subscription-based feature restrictions.
- Managing application state and TypeScript types.
- Deploying production applications using Vercel.

## 🔮 Future Improvements

- Conversation transcript storage and retrieval.
- Advanced learning analytics and progress tracking.
- More AI-powered learning features.
- Additional subscription tiers.
- Improved companion recommendations.

## 👨‍💻 Author

**Harshavardhan**

B.Tech – Computer Science Engineering (Data Science)

Interested in Full-Stack Development, AI Integration, and building scalable web applications.

---

⭐ If you find this project interesting, feel free to explore the live application and share your feedback!

**Live Application:** https://saas-app-five-topaz.vercel.app/
