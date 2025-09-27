# Aroma Edge

A premium, visually-driven e-commerce store for artisanal coffee beans, built on Cloudflare's edge network for ultimate performance.

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/14sam/generated-app-20250927-062634)

## About The Project

Aroma Edge is a visually stunning, premium e-commerce platform designed for an artisanal coffee beans company. The application provides a seamless and delightful user experience, from browsing the product catalog to a simplified checkout process. The frontend is built with React, Vite, and shadcn/ui, emphasizing a clean, modern aesthetic with fluid animations and micro-interactions. The backend is powered by Cloudflare Workers and Hono, ensuring global low-latency access.

## Key Features

*   **Stunning Visuals**: A beautiful, modern UI that impresses users with a clean, minimalist, and premium aesthetic.
*   **Interactive Polish**: Smooth animations, hover states, and micro-interactions for a delightful user experience.
*   **Dynamic Product Catalog**: Browse a grid of coffee products with sophisticated filtering options.
*   **Slide-Out Shopping Cart**: A non-intrusive sheet component to manage cart items without leaving the page.
*   **Responsive Perfection**: Flawless layouts across all device sizes, from mobile to desktop.
*   **Edge Performance**: Built on Cloudflare Workers for a globally fast and responsive application.

## Technology Stack

This project is built with a modern, high-performance tech stack:

*   **Frontend**:
    *   [React](https://reactjs.org/)
    *   [Vite](https://vitejs.dev/)
    *   [React Router](https://reactrouter.com/)
    *   [Tailwind CSS](https://tailwindcss.com/)
    *   [shadcn/ui](https://ui.shadcn.com/)
    *   [Framer Motion](https://www.framer.com/motion/) for animations
    *   [Zustand](https://zustand-demo.pmnd.rs/) for state management
*   **Backend**:
    *   [Cloudflare Workers](https://workers.cloudflare.com/)
    *   [Hono](https://hono.dev/)
*   **Language**: [TypeScript](https://www.typescriptlang.org/)

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

You need to have [Bun](https://bun.sh/) installed on your machine.

### Installation

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/your-username/aroma_edge.git
    cd aroma_edge
    ```

2.  **Install dependencies:**
    ```sh
    bun install
    ```

### Running the Application

To start the development server for both the frontend and the backend worker:

```sh
bun run dev
```

The application will be available at `http://localhost:3000`.

## Project Structure

The project is organized into three main directories:

*   `src/`: Contains the entire React frontend application, including pages, components, hooks, and state management.
*   `worker/`: Contains the Cloudflare Worker backend code, built with Hono. This is where API routes and business logic reside.
*   `shared/`: Contains TypeScript types and interfaces that are shared between the frontend and backend to ensure type safety.

## Available Scripts

In the project directory, you can run:

*   `bun run dev`: Runs the app in development mode.
*   `bun run build`: Builds the app for production.
*   `bun run lint`: Lints the codebase.
*   `bun run deploy`: Deploys the application to Cloudflare Workers.

## Deployment

This application is designed for seamless deployment to the Cloudflare network.

1.  **Login to Cloudflare:**
    Make sure you have the Wrangler CLI authenticated with your Cloudflare account.
    ```sh
    bunx wrangler login
    ```

2.  **Deploy the application:**
    Run the deploy script. This will build the project and deploy it.
    ```sh
    bun run deploy
    ```

Alternatively, you can deploy your own version of this project with a single click.

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/14sam/generated-app-20250927-062634)

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.