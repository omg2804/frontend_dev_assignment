# Frontend Dev Assignment – Solve Ease

A modern, responsive **Next.js** application built as part of the Solve Ease Frontend Intern assignment. It showcases a workers listing page with **filters, pagination, API integration, and optimized performance**.

---

## Features

- **Workers Listing Page** with cards displaying name, service, and price/day
- **Service & Price Filters**: filter workers by type of service or maximum price per day (including GST)
- **Pagination**:
  - Shows 9 workers per page
  - Sliding window of 5 pages with Previous/Next navigation
- **API Integration**: Workers data served via `/api/workers`
- **Skeleton Loading & Error Handling**: Friendly loading UI and error messages
- **Image Optimization**: Lazy loading and priority loading for first 10 workers
- **Responsive Design**: Works on mobile, tablet, and desktop
- **Dark Mode Support**: Automatic dark/light styling
- **Performance Optimizations**:
  - Memoization to prevent unnecessary re-renders
  - Smooth transitions and hover effects

---

## Technologies Used

- **Next.js 13 (App Router)**
- **React 18**
- **TypeScript**
- **Tailwind CSS**
- **Next/Image** for optimized image rendering
- **API Routes** for serving workers data
- **ESLint & Prettier** for clean code

---

## Setup Instructions

1. Clone the repository:

```bash
git clone <repository-url>
cd frontend_dev_assignment

2.Install dependencies:
npm install

3.Run the development server:
npm run dev

4.Open http://localhost:3000 in your browser.

Notes

The app currently fetches data from the API, but fallback to local JSON is included.
Filters, pagination, and API fetching are fully integrated.
All prices displayed include GST (pricePerDay * 1.18).

Author

Om Gaikwad
Final Year B.Tech – Indian Institute of Information Technology, Pune
