# R.O.S.I.E. – Routine Optimization & Scheduling Intelligent Engine

## About
R.O.S.I.E. is a web application that leverages AI to help roommates manage chores in a shared living space. Traditional methods of chore assignment often result in mutiny or resentment, creating a negative atmosphere among roommates. 

R.O.S.I.E. addresses this common problem by introducing a light-hearted, gamified approach to chore management. By allowing users to outsource chore assignments to AI, we transform completing mundane tasks into a fun and engaging community effort. Completing chores is rewarded with a token economy that can be used to redeem perks. Now the challenge becomes claiming the perks before your roommates do!

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Overview](#overview)
- [Future Enhancements](#future-enhancements)
- [Environment Variables](#environment-variables)
- [Installation](#installation)
- [Deployment](#deployment)
- [Deployment](#deployment)

## Features
- AI-generated suggestions for chores and perks
- Dark and light mode toggle
- Responsive design with Tailwind CSS
- Real-time updates with Vite's Hot Module Replacement (HMR)

## Technologies Used
- **Frontend**: React, TypeScript, Vite, Tailwind CSS
- **Backend**: Node.js, Express, PostgreSQL
- **AI Integration**: OpenAI API
- **Database**: PostgreSQL with Supabase

## Overview
The challenge with managing chores in a shared living environment is that it can be difficult to get everyone to do their fair share.

This app takes a light-hearted and friendly approach to this problem by gamifying the process:
Each roommate in a shared household can:
- query AI to generate a random chore and store its custom image in a shared database
- create a chore that need to be done and assign that chore a reward token value
- see all the chores that are available to be done/claimed
- complete chores to claim tokens
- spend tokens to claim prized perks 

- create perks that can be claimed and assign the perk a redeem value
- see all the perks that are available to be claimed
- claim a perk with available tokens

## Future Enhancements
- leverage AI to randomly assign chores to roommates and generate required sub-tasks for each chore to ensure consistency & completion
- user can auction off assigned chores for greater token value to other roommates
- other roommates can bid on the chores and accept the due date terms and the original assignee can accept the lowest bidder
- user can forfeit a perk to refill balance 
- leverage AI to generate rare bonus chores/perks for bonus tokens 

## Environment Variables
- PG_URI=your_postgres_connection_string
- SUPABASE_URL=your_supabase_url
- SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
- OPENAI_API_KEY=your_openai_api_key

## Installation

## Deployment

## Known Issues

### Prerequisites
- Node.js (version >= 14)
- PostgreSQL (for local development)

