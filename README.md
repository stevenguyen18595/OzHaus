# OzHaus

A project that provides housing reports based on data from existing government public APIs and AI.

## Tech Stack

### Backend
- **Framework**: C# .NET 10 Web API
- **Features**: 
  - RESTful API endpoints
  - Government API integration service
  - AI service for property insights
  - CORS enabled for frontend communication

### Frontend
- **Framework**: React 19
- **Build Tool**: Vite
- **State Management**: TanStack React Query (formerly React Query)
- **Styling**: Tailwind CSS
- **Features**:
  - Housing report display
  - Real-time data fetching with caching
  - Responsive design
  - Loading and error states

## Project Structure

```
OzHaus/
├── backend/                    # .NET 10 Web API
│   ├── Controllers/           # API controllers
│   ├── Services/              # Business logic services
│   ├── Models/                # Data models
│   └── Program.cs             # Application entry point
│
├── frontend/                   # React + Vite
│   ├── src/
│   │   ├── components/        # React components
│   │   ├── App.jsx           # Main app component
│   │   └── main.jsx          # App entry point
│   ├── index.html
│   └── package.json
│
└── README.md
```

## Prerequisites

- [.NET 10 SDK](https://dotnet.microsoft.com/download/dotnet/10.0)
- [Node.js](https://nodejs.org/) (v18 or higher)
- npm (comes with Node.js)

## Getting Started

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Restore dependencies:
   ```bash
   dotnet restore
   ```

3. Run the backend API:
   ```bash
   dotnet run
   ```

   The API will be available at `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

   The frontend will be available at `http://localhost:5173`

## Available API Endpoints

### Housing Report
- **GET** `/api/housing/report`
  - Returns housing data with AI-generated insights
  - Response includes property details: address, price, type, bedrooms, bathrooms, and AI insights

## Development

### Backend Development

- Build the project:
  ```bash
  dotnet build
  ```

- Run in watch mode:
  ```bash
  dotnet watch run
  ```

### Frontend Development

- Build for production:
  ```bash
  npm run build
  ```

- Preview production build:
  ```bash
  npm run preview
  ```

- Lint code:
  ```bash
  npm run lint
  ```

## Future Enhancements

- Integration with real Australian government housing APIs
- Integration with AI services (OpenAI, Azure AI, etc.)
- User authentication and personalized reports
- Historical data analysis
- Property comparison features
- Map visualization of properties
- Advanced filtering and search capabilities

## License

This project is open source and available under the MIT License.

