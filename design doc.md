# partykit-game

A turn-based multiplayer web game that combines strategy, urban management, and light economic simulation. Players will navigate a shared 3D city, acquire properties, manage their needs, and generate wealth through asynchronous turns.

## 🏗️ Project Structure

All code lives in a single `client/` directory, including game logic, UI, and networking.

## 🎮 Gameplay Overview

### Objective

Players aim to build wealth by acquiring properties, managing their needs, and investing in city dynamics.

### Players

- Designed for **2–4 players**, playing asynchronously.
- Each player has a limited number of **Action Points (AP)** per turn.

### Turn Flow

1. Start with a **dice roll** → receive AP (2 AP per pip).
2. Spend AP to:
   - Move on the city grid.
   - Purchase property.
   - Improve or sell assets.
   - Satisfy character needs (rest, fun, food).
3. Submit turn via backend.

### Dispute Resolution

If multiple players attempt to buy the same property in one turn, the game enters a bidding phase where players can secretly bid cash to win the property.

## 🗺️ World Design

The game features a **65x65 tile-based city grid** divided into quadrants, each with different property types and common events.

## 🏢 Property System

Players can buy adjacent tiles only, with various building types that generate income or fulfill needs.

## 💬 Needs Management

Players must manage four needs: Hunger, Fun, Rest, and Health. Failing to maintain these needs may result in penalties.

## 📈 Stock Market

Players can buy and sell stocks influenced by in-game events and player actions.

## ⚙️ Technology Stack

- **Frontend**: React 18, TypeScript, Vite
- **3D**: React Three Fiber (Three.js)
- **Multiplayer Backend**: PartyKit

## 📦 Future Features

- Persistent login with local storage or auth provider.
- Player profiles and historical stats.
- Event log replay per game session.

## 📝 Setup Instructions

To set up the project:

1. Clone the repository.
2. Navigate to the `client/` directory.
3. Run `npm install` to install dependencies.
4. Run `npm run dev` to start the development server.

## 🎨 Assets

The game utilizes 3D models from Kenney Kits, including city, building, and road assets in GLB/FBX/OBJ formats.
