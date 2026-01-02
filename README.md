# Nagarik Sewa

## Project Overview

**Version:** 0.0.0
**Frontend:** React 18, Vite 5, TypeScript 5
**Styling:** TailwindCSS, shadcn/ui components, Radix UI
**Dependencies:** React Router, React Hook Form, TanStack React Query, Recharts, and more
**Dev Tools:** ESLint, TypeScript, PostCSS, Autoprefixer

**Description:**
Many citizens in Nepal struggle to access government services due to fragmented information, unclear procedures, and reliance on middlemen. This project is a web-based platform that acts as a mediator between government offices and common citizens by providing step-by-step procedures, required documents, office location, office portals, and eligibility checks. It ensures that citizens do not have to visit offices repeatedly due to lack of information and also eases the work of government employees. Additionally, it blocks the path of middlemen and encourages transparency.

## Features

1. **Eligibility Criteria**: Determines if a user is eligible to obtain the intended document based on predefined rules. For example, in the citizenship section, a user applying by descent must have a father who is a Nepalese citizen.
2. **Required Documents**: Lists all necessary documents with checkboxes for users to track their preparation.
3. **Office Mapping**: Users enter their district and municipality/VDC to locate the nearest office, including contact details and vital information.
4. **Online/Offline Path Guidance**: Provides clear step-by-step instructions on forms, office visits, and online application links if available.
5. **Estimated Time and Cost**: Shows the minimum number of days required for processing and applicable government fees for the service.

## Installation

1. Clone the repository:

```bash
git clone https://github.com/prazzx/-Nagarik-Sewa.git
cd nagarik-sewa
```

2. Install dependencies using npm:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and navigate to:

```
http://localhost:8080/
```

## Usage

* Navigate through the platform to check eligibility for government documents.
* Track required documents using the checklist feature.
* Find your nearest government office and view step-by-step instructions.
* Check estimated processing time and fees.

## Project Structure

```
D:/nagarik-sewa/
│  package.json
│  vite.config.ts
│  tsconfig.json
│  index.html
│
└─src/
   ├─components/        # Reusable UI components
   ├─pages/             # Pages of the app
   ├─services/          # API and business logic
   ├─styles/            # Tailwind CSS and custom styles
   └─utils/             # Utility functions
```

## Tech Stack

* **Frontend:** React 18, TypeScript, Vite
* **Styling:** TailwindCSS, Radix UI, shadcn/ui
* **State & Data:** React Hook Form, TanStack React Query, Recharts
* **Linting & Build:** ESLint, PostCSS, Autoprefixer

## Contribution

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit changes: `git commit -m 'Add some feature'`
4. Push to branch: `git push origin feature/your-feature`
5. Create a Pull Request.

## License

This project is developed by Prajwal Yadav and is not AI-generated.

---

**Note:** This README reflects the project as of version 0.0.0 and
