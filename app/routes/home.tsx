import Navbar from "~/components/Navbar";
import type { Route } from "./+types/home";
import ResumeCard from "~/components/ResumeCard";
import { Link, useNavigate } from "react-router";
import { resumes } from "~/constants/index";
import { useEffect } from "react";
import { usePuterStore } from "~/lib/puter";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Analyzer" },
    { name: "description", content: "Smart feedback analysis powered by AI for your job applications" },
  ];
}

export default function Home() {
  const{ auth } = usePuterStore()
  const navigate = useNavigate();

    useEffect(() => {
        if(!auth.isAuthenticated) navigate('auth?next=/');
    }, [auth.isAuthenticated])
    

  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover">
      <Navbar />

        {/* <div className="absolute top-0 left-2 w-82 h-82 bg-purple-300 rounded-full mix-blend-multiply filter blur-2xl opacity-60 animate-blob"></div>
        <div className="absolute top-0 right-1 w-82 h-82 bg-yellow-300 rounded-full mix-blend-multiply filter blur-2xl opacity-60 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-82 h-82 bg-pink-300 rounded-full mix-blend-multiply filter blur-2xl opacity-60 animate-blob animation-delay-4000"></div>
        <div className="absolute -bottom-8 right-20 w-82 h-82 bg-violet-300 rounded-full mix-blend-multiply filter blur-2xl opacity-60 animate-blob animation-delay-4000"></div> */}
      <section className="main-section">
        <div className="page-heading py-12">
          <h1>Track Your Applications & Resume Ratings</h1>
          <h2>Review your submissions & check AI-powered feedback</h2>
        </div>
      

        {resumes.length > 0 ? (
          <div className="resumes-section">
            {resumes.map((resume: Resume) => (
              <ResumeCard key={resume.id} resume={resume} />
            ))}
          </div>
          ) : (
          <div className="no-resumes">
            <p>No resumes found. Upload your resume to get started!</p>
            <Link to="/upload" className="primary-button w-fit">
              Upload Resume
            </Link>
          </div>
        )}

      </section>
    </main>
  );
}
