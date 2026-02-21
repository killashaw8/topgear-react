# TopGear React — Project Overview

## Summary
- A React + TypeScript single-page app for a car marketplace ("TopGear") with product browsing, cart, orders, user accounts, and help/FAQ flows.
- Client talks to a backend via REST (Axios) and realtime socket.io, with auth stored in cookies/localStorage.
- Built with Vite, styled via MUI + Emotion, styled-components, and SCSS.

## Tech Stack
- Frontend: React 18, TypeScript, React Router v6, Vite.
- State: Redux Toolkit (slices for home/products/orders), React Context for auth/global state.
- UI: MUI (core/lab/icons), Emotion, styled-components, SCSS.
- Data/API: Axios services layer, env-driven API base `VITE_API_URL`.
- Realtime: socket.io-client with websocket transport.
- UX: Swiper for product galleries, SweetAlert2 for alerts, Moment for date handling.
- Tooling/Deploy: Vite build, `serve` in prod, PM2 deploy script.

## Core Features
- Home page with featured sections: trending products, popular products, top users, ad block.
- Products listing with search, sort, pagination, category filters, and add-to-cart.
- Product detail page with image carousel, views, showroom info, add-to-cart.
- Shopping cart dropdown with quantity controls, total + shipping, order creation.
- Orders page with tabs (Paused/Process/Finished) and user summary card.
- Auth modal (signup/login) and profile settings (avatar, profile fields).
- Help page with Terms, FAQ accordion, and contact form.

## Architecture & Data Flow
- Routing: `Routes` in `src/app/App.tsx` for Home, Products, Orders, User, Help.
- Redux slices:
  - Home page: popular/trend/top users.
  - Products page: showroom, chosen product, list.
  - Orders page: paused/process/finished orders.
- Services layer: `MemberService`, `ProductService`, `OrderService` encapsulate API calls.
- Auth: stored in cookies + localStorage; ContextProvider syncs member data.
- Realtime: Socket provider creates client with reconnect behavior.

## Build & Deployment
- Vite dev/build/preview scripts; production served via `serve -s dist -l 8009`.
- Deployment script uses `pm2` and rebuilds on master.

## Portfolio One-Liner
TopGear is a React + TypeScript marketplace SPA featuring product discovery, cart/checkout,
order management, user profiles, and realtime updates, built with Vite, Redux Toolkit,
MUI, and socket.io.
