# Roomies

## Overview
Roomies is a web application built with React, TypeScript, and Vite that utilizes AI to generate suggestions and images.

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


## Upcoming Features
- leverage AI to randomly assign chores to roommates and generate required sub-tasks for each chore to ensure consistency & completion
- user can auction off assigned chores for greater token value to other roommates
- other roommates can bid on the chores and accept the due date terms and the original assignee can accept the lowest bidder
- user can forfeit a perk to refill balance 
- leverage AI to generate rare bonus chores/perks for bonus tokens 

## Features
- AI-generated suggestions for chores and perks
- Responsive design with Tailwind CSS
- Real-time updates with Vite's Hot Module Replacement (HMR)

## Technologies Used
- **Frontend**: React, TypeScript, Vite, Tailwind CSS
- **Backend**: Node.js, Express, PostgreSQL
- **AI Integration**: OpenAI API
- **Database**: PostgreSQL with Supabase

## Installation

### Prerequisites
- Node.js (version >= 14)
- PostgreSQL (for local development)

