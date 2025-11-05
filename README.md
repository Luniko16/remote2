# AI Resume

This is a Next.js application built in Firebase Studio that allows users to create professional, ATS-friendly resumes with the help of generative AI powered by Google Gemini.

## Project Overview

The application is a multi-step resume builder that guides the user through entering their personal information, work experience, education, and skills. It provides a live preview of the resume, which updates in real-time. Users can choose from different templates, customize styles, and leverage AI to enhance their content. Finally, the completed resume can be exported in PDF, Word (.docx), or HTML formats.

## Core Technologies & Architecture

The application is built on a modern, robust tech stack designed for performance, scalability, and a great developer experience.

### 1. Frontend Framework & UI

-   **Next.js (with App Router):** The foundation of our application. We use the App Router for its server-centric routing model, which improves performance by leveraging React Server Components.
-   **React & TypeScript:** We use React to build our interactive user interface and TypeScript to ensure our code is type-safe, readable, and less prone to errors.
-   **Tailwind CSS:** A utility-first CSS framework that allows for rapid and consistent styling directly within the HTML.
-   **ShadCN UI:** A collection of beautifully designed and accessible UI components (like Buttons, Cards, Inputs, and Toasts) that are built on top of Tailwind CSS. This allows for a consistent and professional look and feel.

### 2. State Management & Data Persistence

-   **React Hooks (`useState`, `useEffect`):** We use standard React hooks to manage the application's state, such as the current step in the builder and all the resume data.
-   **Custom Hook (`useResumeData`):** A dedicated custom hook was created to centralize all the logic for managing the resume data.
-   **Browser `localStorage`:** To provide a seamless user experience, all resume data is automatically saved to the browser's `localStorage`. This ensures that if the user closes their tab or refreshes the page, their progress is not lost.

### 3. Generative AI Features

The AI capabilities are powered by **Google Gemini** and managed through **Genkit**, an open-source framework for building production-ready AI applications.

-   **Genkit Flows:** We created several "flows" to handle specific AI tasks:
    -   `generateAiSummary`: Takes the user's job title, skills, and experience to generate a professional summary.
    -   `enhanceExperienceDescription`: Rewrites a user's work experience description to be more impactful, using action verbs and quantifiable achievements.
    -   `analyzeJobDescription`: Compares the user's resume against a job description to find matching and missing keywords, helping to optimize it for Applicant Tracking Systems (ATS).

### 4. Resume Export Functionality

We implemented three different export options, each using a specialized approach:

-   **PDF Export (Client-Side):**
    -   **`html2canvas`**: This library takes a "screenshot" of the resume preview component in the browser.
    -   **`jspdf`**: This library takes the resulting image and places it into a PDF file, which is then downloaded. This approach ensures a high-fidelity, "what-you-see-is-what-you-get" export.

-   **Word (.docx) Export (Server-Side):**
    -   **Next.js Server Action:** A server action was created to handle the conversion process securely on the server, avoiding browser limitations.
    -   **`html-to-docx`**: This library, running on the server, converts the HTML of the resume into a valid DOCX file buffer.
    -   **`file-saver`**: The server action returns the generated file to the client, which then uses `file-saver` to trigger the download in the browser.

-   **HTML Export (Client-Side):**
    -   This function gathers the resume's HTML content and the necessary CSS styles, packages them into a single `.html` file, and uses `file-saver` to download it.

This setup provides a powerful and feature-rich resume-building experience. I hope this explanation is helpful for you and your team!
