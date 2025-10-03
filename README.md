<h1 align="center" style="color:#4CAF50; font-size: 40px;">🌟 AI-Powered Interview Taker & Feedback System 🌟</h1>
<h3 align="center" style="color:gray;">Empowering Your Career Journey with AI-Driven Guidance</h3>

<p align="center" style="font-size: 16px;">
AI Interview Taker is a web app that lets students and job seekers practice interviews with an intelligent AI, providing instant feedback and personalized suggestions.
</p>
<li><a href="https://ai-recruiterr.netlify.app/">LIVE DEMO</a></li>

<hr>

<h2>📚 Table of Contents</h2>

<ul>
  <li><a href="#about">About the Project</a></li>
  <li><a href="#structure">Folder & File Structure</a></li>
  <li><a href="#tech">Tech Stack</a></li>
  <li><a href="#dependencies">All Dependencies</a></li>
  <li><a href="#setup">How to Use This Project</a></li>
  <li><a href="#features">Key Features</a></li>
  <li><a href="#enhancements">Future Enhancements</a></li>
  <li><a href="#contact">Contact Me</a></li>
  <li><a href="#creator">Created By</a></li>
  <li><a href="#screenshots">Preview</a></li>
</ul>

<hr>

<h2 id="about">🧭 About the Project</h2>

<p>
AI Interview Taker is a web app that lets students and job seekers practice interviews with an intelligent AI, providing instant feedback and personalized suggestions. It securely manages user data via Google Auth and Supabase while offering a clean, interactive dashboard. The platform leverages OpenAI, Gemini AI, and Vapi to simulate realistic interviews, helping users confidently prepare for any role.
</p>

<ul>
  <li>Conduct AI-driven mock interviews for various roles.</li>
  <li>Instant feedback and suggestions from AI for improvement.</li>
  <li>Secure login and signup with Google Auth.</li>
  <li>Dashboard to track performance and feedback.</li>
  <li>Data storage and management for user sessions and results.</li>
</ul>

<hr>

<h2 id="structure">🗂️ Folder & File Structure</h2>

<pre>
INTERVIEWER/
├── .next/
├── app/
│   ├── (main)/
│   │   ├── layout.js
│   │   ├── provider.js
│   │   ├── _components/
│   │   │   └── AppSidebar.jsx
│   │   ├── all-interview/
│   │   │   └── page.jsx
│   │   ├── dashboard/
│   │   │   └── page.jsx
│   │   │   ├── _components/
│   │   │   │   ├── CreateOptions.jsx
│   │   │   │   ├── InterviewCard.jsx
│   │   │   │   ├── LatestInterviewList.jsx
│   │   │   │   └── WelcomeContainer.jsx
│   │   │   ├── create-interview/
│   │   │   │   ├── _components/
│   │   │   │   │   ├── FormContainer.jsx
│   │   │   │   │   ├── InterviewLink.jsx
│   │   │   │   │   ├── QuestionList.jsx
│   │   │   │   │   └── QuestionListContainer.jsx
│   │   │   │   └── page.jsx
│   │   │   └── page.jsx
│   │   └── scheduled-interview/
|   |       └── page.jsx
│   │       └── [interview_Id]/
│   │           └── Details/
│   │               ├── _components/
│   │               │   ├── CandidateFeedbackDialog.jsx
│   │               │   ├── CandidateList.jsx
│   │               │   └── InterviewDetailContainer.jsx
│   │               └── page.jsx
│   ├── api/
│   │   ├── ai-feedback/
│   │   │   └── route.jsx
│   │   ├── ai-model/
│   │   │   └── route.jsx
│   │   └── vapi-jwt/
│   ├── auth/
│   │     └── page.jsx
│   ├── interview/
│   │   ├── _components/
│   │   │   └── InterviewHeader.jsx
│   │   ├── [interview_Id]/
│   │   │   ├── completed/
│   │   │   │   └── page.jsx
│   │   │   └── start/
│   │   │       └── page.jsx
│   │   └── page.jsx
│   ├── Layout.jsx
├──   globals.css
├──    layout.js
├──    page.js
├──    provider.jsx
├── components/
│   └── ui/
│       ├── button.jsx
│       ├── dialog.jsx
│       ├── dropdown-menu.jsx
│       ├── input.jsx
│       ├── progress.jsx
│       ├── select.jsx
│       ├── separator.jsx
│       ├── sheet.jsx
│       ├── sidebar.jsx
│       ├── skeleton.jsx
│       ├── sonner.jsx
│       ├── textarea.jsx
│       └── tooltip.jsx
├── context/
│   ├── InterviewDataContext.jsx
│   └── userDetailContext.jsx
├── hooks/
│   ├── use-mobile.js
│   └── useUser.js
├── lib/
│   └── utils.js
├── node_modules/
├── public/
│   ├── ai.jpeg
│   ├── check.png
│   ├── himanshu.jpeg
│   ├── interview.png
│   ├── interviewcomplete copy.png
│   ├── Login.png
│   └── logo.png
├── services/
│   ├── Constants.jsx
│   └── supabaseClient.js
├── .env.local
├── .gitignore
├── components.json
├── jsconfig.json
├── netlify.toml
├── next.config.mjs
├── package-lock.json
├── package.json
├── postcss.config.mjs
└── README.md
</pre>

<hr>

<h2 id="tech">🧰 Tech Stack</h2>

<table>
  <tr><th>Part</th><th>Technology</th></tr>
  <tr><td>Frontend</td><td>Next.js, React (Vite), Tailwind CSS, shadcn/ui</td></tr>
  <tr><td>Backend</td><td>Node.js, Express.js, Supabase (PostgreSQL)</td></tr>
  <tr><td>AI Integration</td><td>OpenAI, Gemini AI, Vapi</td></tr>
  <tr><td>Authentication</td><td>Google Auth</td></tr>
  <tr><td>Deployment</td><td>Netlify (Frontend)</td></tr>
</table>

<hr>

<h2 id="dependencies">📦 All Dependencies</h2>

<h3>🎨  Core Packages</h3>

<table>
  <tr><th>Package</th><th>Version</th></tr>
  <tr><td>@google/generative-ai</td><td>^0.24.1</td></tr>
  <tr><td>@radix-ui/react-dialog</td><td>^1.1.15</td></tr>
  <tr><td>@radix-ui/react-dropdown-menu</td><td>^2.1.16</td></tr>
  <tr><td>@radix-ui/react-progress</td><td>^1.1.7</td></tr>
  <tr><td>@radix-ui/react-select</td><td>^2.2.6</td></tr>
  <tr><td>@radix-ui/react-separator</td><td>^1.1.7</td></tr>
  <tr><td>@radix-ui/react-slot</td><td>^1.2.3</td></tr>
  <tr><td>@radix-ui/react-tooltip</td><td>^1.2.8</td></tr>
  <tr><td>@supabase/ssr</td><td>^0.7.0</td></tr>
  <tr><td>@supabase/supabase-js</td><td>^2.58.0</td></tr>
  <tr><td>@vapi-ai/web</td><td>^2.4.0</td></tr>
  <tr><td>ai</td><td>^5.0.60</td></tr>
  <tr><td>axios</td><td>^1.12.2</td></tr>
  <tr><td>class-variance-authority</td><td>^0.7.1</td></tr>
  <tr><td>clsx</td><td>^2.1.1</td></tr>
  <tr><td>date-fns</td><td>^4.1.0</td></tr>
  <tr><td>jsonwebtoken</td><td>^9.0.2</td></tr>
  <tr><td>lucide-react</td><td>^0.544.0</td></tr>
  <tr><td>next</td><td>15.5.3</td></tr>
  <tr><td>next-themes</td><td>^0.4.6</td></tr>
  <tr><td>open</td><td>^10.2.0</td></tr>
  <tr><td>openai</td><td>^5.23.2</td></tr>
  <tr><td>postcss</td><td>^8.5.6</td></tr>
  <tr><td>react</td><td>19.1.0</td></tr>
  <tr><td>react-dom</td><td>19.1.0</td></tr>
  <tr><td>react-icons</td><td>^5.5.0</td></tr>
  <tr><td>react-router-dom</td><td>^7.9.3</td></tr>
  <tr><td>sonner</td><td>^2.0.7</td></tr>
  <tr><td>tailwind-merge</td><td>^3.3.1</td></tr>
  <tr><td>uuid</td><td>^13.0.0</td></tr>
  <tr><td>@tailwindcss/postcss</td><td>^4.1.13</td></tr>
  <tr><td>tailwindcss</td><td>^4.1.13</td></tr>
  <tr><td>tw-animate-css</td><td>^1.3.8</td></tr>
</table>


<hr>

<h2 id="setup">⚙️ How to Use This Project</h2>

<h3>📋 Prerequisites</h3>
<ul>
  <li>Node.js (v18 or higher)</li>
  <li>MongoDB (local or cloud instance)</li>
  <li>Gemini API key</li>
  <li>Cloudinary account for image uploads</li>
  <li>Email service credentials (e.g., Nodemailer)</li>
</ul>

<h3>🧩 Backend</h3>
<h2 id="setup">⚙️ How to Use This Project</h2>

<h3>📋 Prerequisites</h3>
<ul>
  <li>Node.js (v18 or higher)</li>
  <li>Supabase account (for database & authentication)</li>
  <li>Gemini API key</li>
  <li>OpenAI / OpenRouter API key</li>
  <li>Vapi API key</li>
  <li>Google account for authentication</li>
</ul>

```bash
<h3>🧩 Project Setup</h3>
``` bash
<pre><code># Clone the repository
git clone https://github.com/yourusername/ai-interview.git
cd ai-interview

# Install dependencies
npm install

# Create a .env file in the root directory with the following:
NEXT_PUBLIC_SUPABASE_URL=your key
NEXT_PUBLIC_SUPABASE_ANON_KEY=your key
OPENROUTER_API_KEY=your key
GEMINI_API_KEY=your key
NEXT_PUBLIC_HOST_URL=your key
NEXT_PUBLIC_VAPI_PUBLIC_API_KEY=your key

# Run the development server
npm run dev
</code></pre>

<h3>🌐 Open Your Browser</h3>
<p>Visit <a href="http://localhost:3000">http://localhost:3000</a> to see the app running locally.</p>
```
<h3>⚡ Notes</h3>
<ul>
  <li>Supabase handles authentication and database storage; make sure your keys are correct in the .env file.</li>
  <li>The frontend is powered by Next.js, TailwindCSS, and shadcn/ui.</li>
  <li>AI interview logic is integrated using Gemini AI, OpenAI, and Vapi.</li>
  <li>For production deployment, configure Netlify environment variables with the same keys used in .env.</li>
</ul>
<hr> 
<h2 id="features">✨ Key Features</h2>
 <ul>
 <li><strong>🎤 AI-Powered Interviews:</strong> Conduct mock interviews for any role with intelligent AI-generated questions.</li>
  <li><strong>📝 Instant Feedback:</strong> Receive detailed suggestions and performance analysis on your dashboard.</li>
  <li><strong>🔒 Secure Authentication:</strong> Google Auth ensures safe and seamless login/signup.</li>
  <li><strong>💾 Data Management:</strong> All interview data and user sessions are stored securely in Supabase.</li>
  <li><strong>📊 Performance Dashboard:</strong> Track your progress, feedback, and improvements over time.</li>
  <li><strong>🤖 Multi-AI Integration:</strong> Combines Gemini AI, OpenAI, and Vapi for realistic interview simulation.</li>
  <li><strong>⚡ Quick Setup:</strong> Easy to configure .env variables and deploy on Netlify.</li>
  <li><strong>🎯 Role-Specific Practice:</strong> Prepare for interviews tailored to specific roles or positions.</li>

  </ul> 
        <hr> 
        <h2 id="enhancements">🚀 Future Enhancements</h2>
         <ul>
            <li><strong>🌐 Multi-Language Support:</strong> Enable interviews and feedback in multiple languages for global users.</li>
            <li><strong>📹 Video Interview Recording:</strong> Record user responses to simulate real-life interview scenarios.</li>
            <li><strong>📈 Advanced Analytics:</strong> Provide detailed charts and insights on user performance trends over time.</li>
            <li><strong>💬 Live Chat with AI Mentor:</strong> Real-time guidance and suggestions during mock interviews.</li>
            <li><strong>📄 Resume & Cover Letter Integration:</strong> AI-generated resume and cover letter suggestions based on performance.</li>
            <li><strong>🔔 Notifications & Reminders:</strong> Notify users about scheduled interviews or practice sessions.</li>
            <li><strong>🤝 Collaborative Practice:</strong> Allow group interview practice or peer feedback sessions.</li>
            <li><strong>🎓 Personalized Learning Paths:</strong> Suggest targeted skills or topics to improve based on interview results.</li>
         </ul>
            <hr> 
            <h2 id="contact">📬 Contact Me</h2>
             <ul>
              <li><strong>Name:</strong> Himanshu Gupta</li>
               <li><strong>Email:</strong>  <a href="himanshu561hi@gmail.com">Send me an email</a> </li>
                <li><strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/himanshu561hi/">LINKEDIN</a></li>
                 <li><strong>GitHub:</strong> <a href="https://github.com/himanshu561hi">GITHUB</a></li>
                 <li><strong>Portfolio:</strong> <a href="https://himanshu561hi.netlify.app/">PORTFOLIO</a></li>
                  </ul> 
                  <hr>
                   <h2 id="creator">👨‍💻 Created By</h2> 
                   <p><strong>Himanshu Gupta</strong><br>B.Tech 3rd year Student | HIET Ghaziabad<br>Passionate about building AI-driven solutions to empower career growth 🚀</p>
                    <p align="center">⭐ If you found this project helpful, give it a star!</p>
                <h3>📝 Note</h3>
                <p>
                  This AI Interview Taker project is <strong>completely built by me(Himanshu Gupta)</strong>, taking references and guidance from the 
                  <strong>Tube Guruji</strong> YouTube channel.<br><br>
                  The features implemented here are also being integrated into our main project 
                  <strong>AI Career Coach</strong>, which we are currently working on to make it a more powerful and complete platform 🚀.
                </p>
<hr>
