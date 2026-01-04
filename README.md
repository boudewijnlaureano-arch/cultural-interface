# Cultural Interface Comparison

An interactive visualization comparing American and Chinese social media design patterns for Human-Computer Interaction research.

## Project Overview

This project demonstrates how cultural differences influence user interface design through a side-by-side comparison of two mobile social media interfaces.
You can click on content cards, profile pictures, or navigation icons to view explanations of cultural design principles backed by academic research.

## Features

- **Dual-Phone Layout**: Synchronized scrolling between American and Chinese interface styles
- **Interactive Explanations**: Click elements to reveal cultural design insights
- **Research-Based**: All explanations cite academic sources (Dong & Lee 2008, Liljenberg et al. 2019, etc.)
- **Visual Density Comparison**: See how information density differs between Western and Chinese apps

## Technology Stack

- **React 19** with TypeScript
- **Vite** for development and building
- **Tailwind CSS 4** for styling
- **shadcn/ui** component library

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm


### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd cultural-interface
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

The application will open at `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

## Project Structure

```
src/
├── components/          # React components
│   ├── ContentCard.tsx  # Reusable social media post cards
│   ├── NavBar.tsx       # Bottom navigation
│   ├── PromoBanner.tsx  # Chinese-style promotional banner
│   ├── QuickActions.tsx # Quick access icons
│   └── ...
├── hoverInfo.ts         # Cultural design explanations and research references
├── App.tsx              # Main application with dual-phone layout
└── ...
```


## License

This project is for educational purposes.
