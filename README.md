# AI Decision Orchestrator

A sophisticated multi-agent pipeline for structured architectural analysis and strategic decision-making. This application utilizes a chain of specialized AI agents to decompose complex technical queries into actionable recommendations.

## 🚀 Overview

The **AI Decision Orchestrator** transforms vague technical requirements into high-confidence architectural blueprints. By utilizing a "Pipeline-as-Code" visual philosophy (inspired by Azure DevOps), it provides transparency into the "thinking" process of the AI agents.

### 🤖 The Agent Pipeline

The system orchestrates four distinct specialized agents:

1.  **Analyzer Agent**: Deconstructs the initial query to extract core goals, technical constraints, and business context.
2.  **Planner Agent**: Generates multiple distinct architectural approaches and strategic implementation paths.
3.  **Evaluator Agent**: Performs a rigorous trade-off analysis for each approach, assessing Pros, Cons, Complexity, and Cost.
4.  **Reporter Agent**: Synthesizes all data into a final executive recommendation with a confidence score and technical justification.

## 🛠️ Technology Stack

### Frontend
- **Framework**: React 18 (Vite)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion (`motion/react`)
- **Icons**: Lucide React

### Backend
- **Framework**: ASP.NET Core (C#)
- **AI Engine**: Google Gemini Pro API
- **Serialization**: System.Text.Json (with Pascal/camelCase interoperability)
- **Networking**: RESTful API design with structured JSON orchestration

## ✨ Key Features

- **Azure DevOps Style Pipeline**: A high-fidelity visual progress tracker showing real-time agent execution status.
- **Dynamic Trade-off Matrix**: Interactive comparison of multiple architectural options with sentiment-coded pros and cons.
- **Confidence Scoring**: Transparent metrics showing the AI's certainty based on the depth of analysis.
- **Robust Error Handling**: Advanced JSON sanitization and extraction logic to ensure reliable communication with LLMs.

## 🏁 Getting Started

### Prerequisites
- Node.js (v18+)
- .NET 8.0 SDK
- Google Gemini API Key

### Configuration
1.  Define your Gemini API key in the environment configuration:
    ```env
    GEMINI_API_KEY=your_api_key_here
    ```

### Running the Application
1.  **Start the Dev Server**:
    ```bash
    npm run dev
    ```
    This launches both the ASP.NET Core backend and the Vite frontend proxy.

## 📂 Project Structure

```text
├── backend/
│   ├── Agents/          # Specialized LLM agent logic
│   ├── Controllers/     # API Endpoints
│   ├── Models/          # Concrete C# Data Models
│   └── Services/        # Gemini API integration
├── src/
│   ├── components/      # UI Components (Pipeline, Reports)
│   ├── App.tsx          # Orchestration Logic
│   └── main.tsx         # Entry Point
└── package.json         # Fullstack scripts
```
