# EduDocs – AI-Powered Document Generator

EduDocs is a full-stack web application that allows educators to generate high-quality PDF documents using AI for different phases of the teaching process: **Pre-Class**, **In-Class**, and **Post-Class**. Users can generate, download, and manage their documents seamlessly.

---

# Deployed Link – https://doc-generator-zeta.vercel.app

## Features

* Generate AI-based documents
* Convert content to styled PDFs via Puppeteer
* Upload and store PDFs on Cloudinary
* View history of previously generated documents
* Download PDFs whenever required
* Beautiful responsive UI with TailwindCSS + ShadCN
* Prisma + PostgreSQL backend

---

## 💻 Tech Stack

**Frontend:**

* Next.js 15 (App Router)
* React, TypeScript
* TailwindCSS, ShadCN UI

**Backend:**

* API Routes (Node.js)
* Prisma ORM
* PostgreSQL
* Puppeteer & Chrome AWS Lambda (PDF generation)

**Third-Party Services:**

* Cloudinary (PDF hosting)
* GROQ AI (Document content generation)

---

##  Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/TanishValesha/doc-generator.git
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file with:

```env
# Database
DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DATABASE

# AI Key
GROQ_API_KEY=your_groq_api_key

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
CLOUDINARY_UPLOAD_PRESET=your_preset

# App URL
NEXT_PUBLIC_URL=http://localhost:3000

NODE_ENV=development
```

### 4. Prisma Setup

```bash
npx prisma generate
npx prisma migrate dev --name init
```

### 5. Start the Development Server

```bash
npm run dev
```

---

## Prisma Schema

```prisma
model Document {
  id         String   @id @default(cuid())
  filename   String
  topic      String
  type       String
  difficulty String
  url        String
  createdAt  DateTime @default(now())
}
```

---

## API Overview

### POST `/api/generate/pre-class`

```json
{
  "topic": "Algebra Basics",
  "filename": "intro_to_algebra",
  "difficulty": "Beginner"
}
```
**Response**: PDF blob

### POST `/api/generate/in-class`
### POST `/api/generate/post-class`

(Similar structure)

### GET `/api/generated-docs`
**Response**: Fetches all the previously generated documents

---

## License

MIT License — Feel free to use and modify.

---

## Author & Credits

Made by [Tanish Valesha](https://linktr.ee/tanishvalesha)

Thanks to:

* [Groq](https://groq.com)
* [Cloudinary](https://cloudinary.com)
* [ShadCN](https://ui.shadcn.com)
* [Vercel](https://vercel.com)

---

## Future Improvements

* Add user authentication
* Folder structure for documents
* Analytics dashboard
* AI fine-tuning for more customized content
