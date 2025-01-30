
# Whisper Blog - CRUD with Prisma and Next.js
![Image](https://github.com/user-attachments/assets/fb4c5b3f-abc5-42b4-8848-2165cd33d424)
## Introduction

This project is a simple blog application built with Next.js and Prisma. It allows users to perform CRUD (Create, Read, Update, Delete) operations on blog posts. The application is designed to be a starting point for developers looking to build a full-stack application with Next.js and Prisma.
Demo: [`https://whisper-blog-sigma.vercel.app`](https://whisper-blog-sigma.vercel.app)

## Features

- User authentication and authorization
- Role-based access control (Admin, User)
- Admin page for managing categories, users, and posts
- Create, read, update, and delete blog posts
- Responsive design with Tailwind CSS
- Docker support for containerized development
- Prisma ORM for database management
- API routes for handling server-side logic

## Technologies Used

- **Next.js**: A React framework for building server-side rendered applications.
- **Prisma**: An ORM (Object-Relational Mapping) tool for working with databases in a type-safe manner.
- **Supabase**: An open-source Firebase alternative for strorage and database management.
- **TypeScript**: A typed superset of JavaScript that compiles to plain JavaScript.
- **NextAuth.js**: is a complete open-source authentication solution for Next.js applications.
- **Tailwind CSS**: A utility-first CSS framework for rapidly building custom user interfaces.
- **Docker**: A platform for developing and running applications in containers.
- **Vercel**: cloud platform for static sites and serverless functions. It allows developers to build and deploy web projects with ease

## Installation

To get started with this project, follow these steps:

1. **Clone the repository**:
    ```sh
    git clone https://github.com/your-username/blog-crud-prisma.git
    cd blog-crud-prisma
    ```

2. **Install dependencies**:
    ```sh
    npm install
    ```

3. **Set up environment variables**:
    Create a [`.env`](.env ) file in the root directory and add the necessary environment variables. Refer to `.env.example` for the required variables.

4. **Run database migrations**:
    ```sh
    npx prisma migrate dev
    ```

5. **Start the development server**:
    ```sh
    npm run dev
    ```

6. **Open the application**:
    Open your browser and navigate to `http://localhost:3000` to see the application in action.

## Docker

To run the application using Docker, follow these steps:

1. **Build the Docker image**:
    ```sh
    docker-compose build
    ```

2. **Run the Docker container**:
    ```sh
    docker-compose up
    ```

3. **Open the application**:
    Open your browser and navigate to `http://localhost:3000` to see the application in action.



## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
