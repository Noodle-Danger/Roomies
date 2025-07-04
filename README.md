# R.O.S.I.E. – Routine Optimization & Scheduling Intelligent Engine

_Transforming household chores from mundane tasks into an engaging community experience_

![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-336791?style=for-the-badge&logo=postgresql&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)

![OpenAI](https://img.shields.io/badge/OpenAI-412991?style=for-the-badge&logo=openai&logoColor=white)
![Jest](https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white)

## 🏠 About the Project

R.O.S.I.E. tackles one of the most common sources of tension in shared living spaces: fairly managing household chores. Instead of relying on traditional methods that often lead to resentment and conflict, R.O.S.I.E. introduces a gamified, AI powered approach that makes completing chores fun and rewarding.

The application transforms routine household management into an engaging token based economy where roommates can earn rewards for completing tasks and spend their tokens on desirable perks. By outsourcing the often contentious task of chore assignment to AI, R.O.S.I.E. removes bias and creates a neutral, fair system that encourages participation.

## ✨ Core Features

### 🤖 AI Powered Content Generation

- **Smart Chore Suggestions**: AI generates unique chore ideas that don't duplicate existing tasks
- **Custom Image Creation**: Each chore and perk gets a custom anime style illustration
- **Intelligent Prompting**: The system ensures generated content is contextually appropriate and unique

### 🎮 Gamification Elements

- **Token Economy**: Complete chores to earn tokens, spend tokens on perks
- **Visual Feedback**: Real-time balance updates with color coded changes
- **Achievement Tracking**: Comprehensive chore history and perk inventory
- **Competition Element**: Race to claim the best perks before your roommates

### 🎨 Modern User Experience

- **Dark/Light Mode Toggle**: Seamless theme switching for user preference
- **Responsive Design**: Beautiful interface that works across different screen sizes
- **Smooth Animations**: Loading spinners and transitions provide polished user feedback
- **Intuitive Layout**: Clean, organized interface with clear visual hierarchy

### 📊 Comprehensive Management

- **Chore Board**: View all available tasks with token values and custom images
- **Reward Repo**: Browse available perks with quantities and costs
- **Chore Journal**: Track your completed tasks and earned tokens
- **Victory Vault**: View your claimed perks and achievements

## 🛠 Technical Architecture

### Frontend Stack

- **React 19** with TypeScript for type safe component development
- **Vite** for fast development and optimized builds
- **Tailwind CSS 4.0** for utility first styling with custom design system
- **Context API + useReducer** for centralized state management using Immer for immutable updates
- **Custom Hooks** for clean separation of concerns and reusable logic

### Backend Infrastructure

- **Node.js** with Express for RESTful API endpoints
- **PostgreSQL** for robust relational data storage
- **Supabase** for database hosting and file storage management
- **OpenAI API Integration** for AI text and image generation
- **CORS Configuration** for secure cross origin requests

### Database Design

The application uses a well structured relational database with four main entities:

- **Users**: Store user information and token balances
- **Chores**: Track tasks with completion status and associated metadata
- **Perks**: Manage rewards with quantity tracking and token costs
- **User_Perks**: Junction table for tracking claimed rewards per user

### AI Integration Strategy

R.O.S.I.E. leverages OpenAI's APIs in sophisticated ways:

- **Text Generation**: Uses GPT-4o-mini for generating contextually appropriate chore and perk suggestions
- **Image Creation**: Employs DALL-E for creating custom anime style illustrations
- **Uniqueness Validation**: Queries existing database content to ensure AI generated suggestions don't duplicate existing items
- **Error Handling**: Robust fallback mechanisms for AI service interruptions

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed on your development machine:

- **Node.js** (version 14 or higher)
- **PostgreSQL** (for local development)
- **Git** (for version control)

### Environment Configuration

Create a `.env` file in your project root with the following variables:

```env
PG_URI=your_postgres_connection_string
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
OPENAI_API_KEY=your_openai_api_key
```

### Installation Process

1. **Clone the Repository**

   ```bash
   git clone [repository-url]
   cd roomies
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Database Setup**

   ```bash
   # Connect to your PostgreSQL database
   npm run db

   # Run your database migrations/setup scripts here
   ```

4. **Start Development Environment**
   ```bash
   # This command runs the server and client concurrently
   npm start
   ```

The application will be available at `http://localhost:3000` with the API server running on `http://localhost:8080`.

### Development Commands

- `npm run dev` - Start the Vite development server
- `npm run serve` - Start the Express backend server
- `npm run build` - Build the application for production
- `npm run test` - Run the Jest test suite
- `npm run lint` - Run ESLint for code quality checks

## 🏗 Project Structure

The codebase follows a clean, modular architecture that separates concerns effectively:

### Frontend Organization

```
src/
├── Components/          # Reusable UI components
│   ├── Layout/         # Page layout components
│   ├── _tests_/        # Component test files
│   └── [Component].tsx # Individual components
├── actions/            # Redux style action creators
├── context/            # React Context and state management
├── hooks/              # Custom React hooks
├── constants/          # Shared constants and styles
├── types.ts            # TypeScript type definitions
└── apiFetch.ts         # API communication layer
```

### Backend Organization

```
server/
├── controllers/        # Business logic handlers
├── models/            # Database connection and queries
├── routes/            # API endpoint definitions
└── server.js          # Express application entry point
```

## 🧪 Testing Strategy

The project includes comprehensive testing across multiple layers:

### Frontend Testing

- **Component Tests**: React Testing Library for component behavior validation
- **Integration Tests**: Full user flow testing with mocked API responses
- **Error Handling Tests**: Ensuring graceful degradation when services fail

### Backend Testing

- **Route Testing**: Supertest for API endpoint validation
- **Database Integration**: Testing database operations with test fixtures
- **Error Scenarios**: Comprehensive error handling validation

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode during development
npm test -- --watch
```

## 🎯 Future Enhancements

The development roadmap includes several exciting features to enhance the user experience:

### Advanced AI Features

- **Smart Chore Assignment**: AI automatically assigns chores to roommates based on historical data and preferences
- **Auction System**: Allow users to auction off assigned chores to other roommates
- **Bonus Content**: AI generated rare bonus chores and perks for special occasions

### Enhanced Gamification

- **Bidding System**: Roommates can bid on chores with competitive token offerings
- **Streak Bonuses**: Reward consistent participation with bonus multipliers
- **Seasonal Events**: Special themed content during holidays or events

### Social Features

- **Achievement System**: Unlock badges and titles for various accomplishments
- **Leaderboards**: Friendly competition tracking across different metrics
- **Social Sharing**: Share achievements and funny chore completions

### Quality of Life Improvements

- **Mobile Application**: Native mobile apps for iOS and Android
- **Push Notifications**: Reminders for due chores and available perks
- **Calendar Integration**: Sync with external calendar applications

---

_Making chores fun, one token at a time! 🏠✨_
