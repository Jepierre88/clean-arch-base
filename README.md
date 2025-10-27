
# 🧹 Clean Architecture Base for React/Next.js

Welcome to a modern, scalable and maintainable boilerplate for React/Next.js projects, designed with Clean Architecture principles.

## 🚀 Why Clean Architecture?

Clean Architecture separates your code into clear layers (Domain, Use Cases, Infrastructure, Presentation), making your app:
- **Easy to test**
- **Highly maintainable**
- **Ready for growth and change**
- **Decoupled from frameworks and databases**

## 🏗️ Project Structure

```
src/
	app/                # Next.js app entrypoints
	di/                 # Dependency injection setup
	domain/             # Pure business logic (entities, repositories, usecases)
	infraestructure/    # Data sources, repository implementations
	presentation/       # UI components
```

## 🔄 Example Flow

1. **Presentation**: UI triggers an action (e.g., fetch users)
2. **UseCase**: Business logic orchestrates the request
3. **Repository**: Abstracts data access
4. **Infrastructure**: Connects to real data sources
5. **DI Container**: Wires everything together

## 📝 Quick Start

Clone, install and run:

```bash
git clone https://github.com/tuusuario/clean-arch-base.git
cd clean-arch-base
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and start building!

## 📚 Learn More

- [Clean Architecture by Uncle Bob](https://8thlight.com/blog/uncle-bob/2012/08/13/the-clean-architecture.html)
- [Next.js Documentation](https://nextjs.org/docs)
- [tsyringe (DI for TypeScript)](https://github.com/microsoft/tsyringe)

## ✨ Contribute & Feedback

Pull requests and suggestions are welcome! Star the repo if you find it useful.

---

Ready to build robust React apps with Clean Architecture? Fork and start coding!

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
