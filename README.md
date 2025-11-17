# Scenario Simulator

A modern, interactive mapping application built with React, TypeScript, and ArcGIS that allows users to create and manipulate geographic scenarios.

## Features

- **Interactive Map**: Built on ArcGIS for powerful mapping capabilities
- **Drawing Tools**: Create points, lines, polygons, and ellipses on the map
- **Measurement Tools**: Measure distances and areas on the map
- **Search Functionality**: Find locations and addresses
- **Base Map Gallery**: Choose from different map styles
- **Layer Management**: Control visibility of different map layers
- **Persistent State**: Map configurations and drawings are saved between sessions

## Technologies Used

- React 19
- TypeScript
- Vite
- ArcGIS JavaScript API
- Zustand for state management
- TailwindCSS for styling
- Radix UI for accessible components
- React Query for data fetching
- JSON Server for mock API

## Getting Started

### Prerequisites

- Node.js (latest LTS version recommended)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```

### Running the Application

Start both the development server and the mock API server:

```
npm start
```

This will concurrently run:
- The Vite development server at http://localhost:5173 (or another port if 5173 is in use)
- The JSON Server mock API at http://localhost:8080

### Building for Production

```
npm run build
```

## Usage

1. **Navigation**: Use the zoom controls or mouse wheel to navigate the map
2. **Drawing**: Select a drawing tool and click on the map to create shapes
3. **Measurement**: Use the measurement tool to calculate distances or areas
4. **Base Maps**: Click the base map gallery to change the map style
5. **Layers**: Toggle different map layers on/off using the layers control

## Project Structure

- `src/features/Map`: Core mapping functionality
  - `components`: UI components including widgets and shared elements
  - `contexts`: React contexts for map functionality
  - `stores`: Zustand state management
  - `constants`: Configuration constants
  - `hooks`: Custom React hooks
  - `utils`: Utility functions

## License

This project is proprietary and confidential.
