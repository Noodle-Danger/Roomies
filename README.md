# R.O.S.I.E. – Routine Optimization & Scheduling Intelligent Engine

## About
R.O.S.I.E. is a web application that leverages AI to help roommates manage chores in a shared living space. Traditional methods of chore assignment often result in conflict or resentment, creating a negative atmosphere among housemates.

R.O.S.I.E. addresses this common problem by introducing a light-hearted, gamified approach to chore management. By allowing users to outsource chore assignments to AI, we transform completing mundane tasks into a fun and engaging community effort. Completing chores is rewarded with a token economy that can be used to redeem perks. Now the challenge becomes claiming the perks before your roommates do!

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![REST API](https://img.shields.io/badge/REST_API-009688?style=for-the-badge&logo=fastapi&logoColor=white)
![OpenAI](https://img.shields.io/badge/OpenAI-412991?style=for-the-badge&logo=openai&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/postgresql-336791?style=for-the-badge&logo=postgresql&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)
![Vite](https://img.shields.io/badge/vite-20232A?style=for-the-badge&logo=vite&logoColor=61DAFB)

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Demo](#demo)
- [Installation and Setup](#installation-and-setup)
- [Roadmap and Future Enhancements](#roadmap-and-future-enhancements)
- [Contributions](#contributions)


## Overview
Managing chores in a shared living environment can often lead to uneven workloads and conflict. R.O.S.I.E. offers a light-hearted, structured alternative by gamifying household responsibilities:
- Generate random chores using AI and store custom images in a shared database
- Create and assign token values to chores
- Complete chores to earn tokens
- Redeem tokens for perks
- Create and manage perks with associated token costs
- View available chores and perks in a shared dashboard

## Features
- AI suggests chore ideas & bonus perks
- Token economy: earn for chores, spend on rewards
- Light/dark mode toggle
- Fully responsive UI styled with Tailwind CSS
- Real-time updates with Vite's Hot Module Replacement (HMR)

## Demo

## Installation and Setup
### Environment Variables
``` js 
PG_URI=your_postgres_connection_string
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
OPENAI_API_KEY=your_openai_api_key
```
### Prerequisites
- Node.js (version >= 14)
- PostgreSQL (for local development)

## Roadmap and Future Enhancements
- AI-driven chore allocation and structured subtasks
- Chore auctions: monetize chores among roommates
- Bonus/rare AI‑generated chores/perks
- Benefit returns: trade in perks for tokens
- Integration with calendars (Google, Apple)
- Social features (leaderboards, history, achievements)



## Contributions
Contributions welcome! 

Please open issues for feature requests and submit pull requests for enhancements.