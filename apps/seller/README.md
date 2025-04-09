# ReviewSnap: Seller Dashboard

ReviewSnap is a powerful review management platform that helps businesses
collect, analyze, and leverage customer feedback to drive growth.

![ReviewSnap Banner](https://via.placeholder.com/1200x300/000000/FFCC00?text=ReviewSnap+Seller+Dashboard)

## Overview

The Seller Dashboard allows business owners to:

- Create customizable review templates
- Collect customer feedback
- Manage reviews in a central dashboard
- Bookmark important reviews for follow-up

## Features

- **Review Collection**: Collect customer reviews with customizable forms to
  gather valuable feedback
- **Customizable Templates**: Create branded review forms with your own
  questions
- **Review Management**: Manage all your customer reviews in one convenient
  dashboard
- **Bookmark System**: Save important reviews for later reference
- **Spam Protection**: Advanced AI filters to detect and remove fake or spam
  reviews automatically
- **Instant Notifications**: Get alerted immediately when new reviews come in,
  especially negative ones
- **Customer Engagement**: Respond to reviews directly from the platform to
  improve customer satisfaction
- **Review Analytics**: Powerful insights and trends from your reviews to help
  improve your business
- **Review Widgets**: Beautiful, customizable widgets to showcase your best
  reviews on your website

## Getting Started

First, run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the
result.

## App Structure

- `/app/page.tsx` - Landing page for new users
- `/app/dashboard` - Main seller dashboard
- `/app/template` - Template management
- `/app/template/create` - Create new review templates
- `/app/template/[id]` - View and edit specific templates
- `/app/embed` - Generate embeddable review widgets
- `/app/actions` - Server actions for API functionality

## Authentication

The app uses NextAuth for authentication with Prisma adapter. Authentication
flows are handled in the `(auth)` directory.

## Tech Stack

- **Framework**: Next.js 14.2.8
- **Authentication**: NextAuth.js
- **Database**: Prisma with database from `@repo/database`
- **UI Components**: Custom components with `@repo/ui` package
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **Icons**: Lucide React

## Environment Setup

Make sure to set up your `.env` file with the following variables:

```
DATABASE_URL=your_database_url
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
```

## Deployment

The app is designed to be deployed on Vercel:

```bash
pnpm build
```

For production deployment, use:

```bash
pnpm start
```

## Learn More

To learn more about the technologies used in this project:

- [Next.js Documentation](https://nextjs.org/docs)
- [NextAuth.js](https://next-auth.js.org/)
- [Prisma](https://www.prisma.io/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)

## License

[MIT](LICENSE)
