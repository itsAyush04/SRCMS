# File Structure Documentation

## 📁 Detailed File Walkthrough

### Root Configuration Files

#### `package.json`
**Purpose**: Node.js project configuration and dependency management
**Key Functions**:
- Defines project metadata (name, version, description)
- Lists all frontend dependencies and their versions
- Contains build scripts and development commands
- Specifies the project as ES module type

**Dependencies Breakdown**:
- `react` & `react-dom`: Core React library for UI rendering
- `react-router-dom`: Client-side routing and navigation
- `lucide-react`: Icon library for consistent UI elements
- `typescript`: Type safety and enhanced development experience
- `tailwindcss`: Utility-first CSS framework for styling
- `vite`: Fast build tool and development server

#### `tsconfig.json` & Related Files
**Purpose**: TypeScript configuration for type checking and compilation
**Files**:
- `tsconfig.json`: Main configuration file that references other configs
- `tsconfig.app.json`: Application-specific TypeScript settings
- `tsconfig.node.json`: Node.js environment TypeScript settings

**Key Settings**:
- Target ES2020 for modern JavaScript features
- Strict type checking enabled
- JSX transformation for React components
- Module resolution for bundler compatibility

#### `tailwind.config.js`
**Purpose**: Tailwind CSS configuration
**Functions**:
- Defines content sources for CSS purging
- Configures theme extensions and customizations
- Specifies plugin integrations

#### `vite.config.ts`
**Purpose**: Vite build tool configuration
**Functions**:
- Configures React plugin for JSX support
- Optimizes dependencies for faster builds
- Excludes problematic packages from optimization

### Source Code Structure (`src/`)

#### `src/main.tsx`
**Purpose**: Application entry point
**Functions**:
- Renders the root React component
- Enables React StrictMode for development warnings
- Imports global CSS styles
- Mounts the application to the DOM

#### `src/App.tsx`
**Purpose**: Main application component and routing configuration
**Key Functions**:
- Sets up React Router for navigation
- Defines all application routes and their corresponding components
- Provides consistent layout structure with header
- Manages global application state and context

**Route Structure**:
- `/` → HomePage (landing page)
- `/submit` → ComplaintForm (complaint submission)
- `/track` → TrackComplaint (status tracking)
- `/dashboard` → Dashboard (personnel interface)

#### `src/index.css`
**Purpose**: Global CSS styles and Tailwind imports
**Functions**:
- Imports Tailwind CSS base, components, and utilities
- Defines global CSS variables and custom styles
- Sets up consistent typography and spacing

### Components (`src/components/`)

#### `src/components/Header.tsx`
**Purpose**: Navigation header component
**Key Functions**:
- **Responsive Navigation**: Desktop and mobile menu systems
- **Active Route Highlighting**: Visual indication of current page
- **Brand Identity**: Railway logo and government branding
- **User Interface**: Profile access and authentication status
- **Mobile Optimization**: Hamburger menu for small screens

**State Management**:
- `isMenuOpen`: Controls mobile menu visibility
- `useLocation`: Tracks current route for active styling

**Features**:
- Smooth transitions and hover effects
- Accessibility-compliant navigation
- Government of India branding standards
- Responsive breakpoints for all device sizes

### Pages (`src/pages/`)

#### `src/pages/HomePage.tsx`
**Purpose**: Landing page and system overview
**Key Functions**:
- **Hero Section**: System introduction and primary CTAs
- **Statistics Display**: Key performance metrics and achievements
- **Feature Showcase**: Main system capabilities with visual icons
- **Process Flow**: Step-by-step complaint handling workflow
- **Navigation Hub**: Quick access to all major functions

**Data Structures**:
- `features`: Array of system capabilities with icons and descriptions
- `stats`: Performance metrics with icons and values
- Process flow steps with numbered progression

#### `src/pages/ComplaintForm.tsx`
**Purpose**: Multi-modal complaint submission interface
**Key Functions**:
- **Form Management**: Comprehensive complaint data collection
- **File Upload System**: Multi-format document and media support
- **Real-time Validation**: Input validation and error handling
- **AI Integration Notice**: Transparency about automated processing
- **Progress Indication**: Visual feedback during submission

**State Management**:
- `formData`: Complete complaint information object
- `files`: Array of uploaded files with metadata
- `isSubmitting`: Loading state during form processing

**Form Sections**:
1. **Personal Information**: Name, email, phone, PNR
2. **Journey Details**: Train number, station, date
3. **Complaint Details**: Category, priority, description
4. **Supporting Documents**: File uploads and media capture

**Features**:
- Multi-step form validation
- File type and size restrictions
- Auto-save functionality (planned)
- Accessibility compliance
- Mobile-optimized input fields

#### `src/pages/TrackComplaint.tsx`
**Purpose**: Complaint status tracking and progress monitoring
**Key Functions**:
- **Token-based Search**: Complaint lookup by unique identifier
- **Status Visualization**: Progress timeline with visual indicators
- **Real-time Updates**: Live status changes and notifications
- **Detailed Information**: Comprehensive complaint and resolution data
- **Action Interface**: User interaction options (comments, downloads)

**State Management**:
- `tokenId`: User-entered tracking identifier
- `complaint`: Complete complaint object with history
- `isLoading`: Search operation status

**Data Display**:
- Status overview cards with color coding
- Priority and urgency scoring visualization
- Timeline component with chronological updates
- Officer assignment and contact information

#### `src/pages/Dashboard.tsx`
**Purpose**: Personnel management interface and analytics
**Key Functions**:
- **Statistics Overview**: Key performance indicators and metrics
- **Complaint Management**: Active complaint queue and assignment
- **Analytics Interface**: Trend analysis and predictive insights
- **Filtering and Search**: Advanced complaint filtering options
- **Export Functionality**: Data export for reporting

**State Management**:
- `selectedTab`: Active dashboard section
- Tab-based navigation for different views

**Dashboard Sections**:
1. **Overview**: Statistics cards and priority distribution
2. **Active Complaints**: Sortable table with AI scoring
3. **Analytics**: Trend charts and predictive analysis

**Features**:
- Real-time data updates
- Interactive charts and graphs
- Bulk action capabilities
- Role-based access control
- Export to multiple formats

### Type Definitions (`src/vite-env.d.ts`)
**Purpose**: TypeScript environment declarations
**Functions**:
- Provides type definitions for Vite-specific features
- Enables proper TypeScript support for build tools
- Ensures type safety across the development environment

## 🔄 Data Flow Architecture

### 1. User Interaction Flow
```
User Input → Form Validation → State Update → API Call → Response Handling → UI Update
```

### 2. Complaint Processing Flow
```
Submission → Tokenization → AI Analysis → Categorization → Priority Assignment → Personnel Assignment
```

### 3. Tracking Flow
```
Token Input → Database Query → Status Retrieval → Timeline Generation → Real-time Updates
```

### 4. Dashboard Flow
```
Authentication → Data Fetching → Analytics Processing → Visualization → Real-time Updates
```

## 🎨 Design System

### Color Palette
- **Primary Blue**: `#1e3a8a` (Railway official color)
- **Secondary Orange**: `#f97316` (Accent and highlights)
- **Success Green**: `#059669` (Positive actions)
- **Warning Yellow**: `#eab308` (Caution states)
- **Error Red**: `#dc2626` (Critical alerts)
- **Neutral Gray**: `#6b7280` (Text and borders)

### Typography Scale
- **Headings**: Font weights 600-800, sizes 1.5rem-3rem
- **Body Text**: Font weight 400, size 1rem, line height 1.5
- **Captions**: Font weight 500, size 0.875rem
- **Labels**: Font weight 600, size 0.75rem

### Spacing System
- **Base Unit**: 0.25rem (4px)
- **Component Spacing**: 1rem, 1.5rem, 2rem
- **Section Spacing**: 3rem, 4rem, 6rem
- **Container Max Width**: 1280px (7xl)

### Component Patterns
- **Cards**: White background, subtle shadow, rounded corners
- **Buttons**: Consistent padding, hover states, loading indicators
- **Forms**: Clear labels, validation states, helpful error messages
- **Tables**: Sortable headers, row hover effects, pagination
- **Modals**: Backdrop blur, smooth animations, focus management

This documentation provides a comprehensive understanding of each file's purpose, functionality, and role within the larger system architecture.