# Quick AI 🚀

Quick AI is a premium, AI-powered content creation and image processing platform. Built with a stunning dark-space glassmorphic UI, it provides a suite of advanced AI tools to supercharge your productivity.

## ✨ Features

- 📝 **AI Article Writer**: Generate high-quality, engaging articles on any topic.
- 🏷️ **Blog Title Generator**: Find the perfect, catchy title for your blog posts.
- 🎨 **AI Image Generation**: Create stunning visuals from text prompts.
- 🖼️ **Background Removal**: Effortlessly remove backgrounds from your images.
- ✂️ **Object Removal**: Seamlessly erase unwanted objects from photos.
- 📄 **Resume Reviewer**: Get your resume analyzed by AI to land your dream job.

## 💻 Tech Stack

**Frontend:**
- React (Vite)
- Tailwind CSS (v4)
- Framer Motion (for premium 3D continuous animations)
- Clerk (Authentication)

**Backend:**
- Node.js & Express
- Groq API (`llama-3.1-8b-instant`) for fast, robust AI processing

## 🚀 Getting Started

### Prerequisites
Make sure you have Node.js installed on your machine.

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/pushkar189/Quick_Ai.git
   cd Quick_Ai
   ```

2. **Install dependencies for both client and server**
   ```bash
   # In the server directory
   cd server
   npm install

   # In the client directory
   cd ../client
   npm install
   ```

3. **Environment Variables**
   Create a `.env` file in both the `client` and `server` directories with your respective API keys (Clerk, Groq, MongoDB, etc.).

4. **Run the application**
   ```bash
   # Start the backend server
   cd server
   npm start

   # Start the frontend development server
   cd client
   npm run dev
   ```

## 🎨 Design Philosophy
This project was meticulously designed with a "Pro Developer" aesthetic in mind. It utilizes:
- **Glassmorphism**: Frosted glass panels over a deep space background.
- **Micro-interactions**: Hover effects, glowing borders, and seamless page transitions.
- **Dynamic 3D Assets**: Floating, continuously animated AI graphics (Core, Document, and Vision lenses) that replace boring static icons.

---
*Built with ❤️ for the future of AI.*
