# Next.js Boilerplate Guidelines

## Commands
- `npm run dev` - Run development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Code Style
- **TypeScript**: Use strict typing; components should have explicit prop types
- **Imports**: Group by 1) React/Next, 2) external packages, 3) internal modules
- **Components**: Use functional components with explicit return types
- **File Structure**: Pages in `/app` directory, shared components in `/components`
- **Naming**: PascalCase for components, camelCase for functions/variables
- **CSS**: Use Tailwind with className strings; group responsive classes
- **Error Handling**: Use try/catch in async functions; display user-friendly errors
- **State Management**: Use React hooks for local state
- **API Calls**: Use API routes in `/app/api` with proper error handling
- **Path Aliases**: Use `@/*` for imports from project root

## Notes
- TypeScript errors are ignored in production builds (not recommended)
- Project uses Next.js App Router and React 19
- TailwindCSS v4 is used for styling