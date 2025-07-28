import { useState, type FormEvent } from "react";
import Navbar from "~/components/Navbar"
import type { Route } from "../+types/root";
import FileUploader from "~/components/FileUploader";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Analyzer | Upload" },
    { name: "description", content: "Upload your resume for an ATS score" },
  ];
}

const upload = () => {
    const [isProcessing, setIsProcessing] = useState(false);
    const [statusText, setStatusText] = useState("");
    const [file, setFile] = useState<File | null>(null);
    const handleFileSelect = (file: File | null) => {
        setFile(file);
    }

    const handleFileUpload = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.currentTarget.closest('form')
        if(!form) return
        const formData = new FormData(form);

        const companyName = formData.get('company-name') as string;
        const jobTitle = formData.get('job-title') as string;
        const jobDescription = formData.get('job-description') as string;
    }

  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover">
        <Navbar />
        <section className="main-section">
            <div className="page-heading">
                <h1>
                    Smart Feedback For Your Dream Job
                </h1>
                {isProcessing ? (
                    <>
                        <h2>{statusText}</h2>
                        <img src={'/images/resume-scan.gif'} className="w-full" />
                    </>
                    ) : (
                        <h2>Drop your resume for an ATS score and improvements score</h2>
                        
                    )}
            </div>
            {!isProcessing && (
                <form id="upload-form" onSubmit={handleFileUpload} className="flex flex-col gap-4 mt-6">
                    <div className="form-div">
                        <label htmlFor="company-name" className="">Company Name</label>
                        <input type="text" id="company-name" name="company-name" placeholder="Company Name" />
                    </div>
                    <div className="form-div">
                        <label htmlFor="job-title" className="">Job Title</label>
                        <input type="text" id="job-title" name="job-title" placeholder="Job Title" />
                    </div>
                    <div className="form-div">
                        <label htmlFor="job-description" className="">Job Description</label>
                        <textarea rows={5} id="job-description" name="job-description" placeholder="Job Description" />
                    </div>
                    <div className="form-div">
                        <label htmlFor="upload" className="">Upload Resume</label>
                        <FileUploader onFileSelect={handleFileSelect}/>
                    </div>

                    <button className="primary-button" type="submit">
                        Anaylze Resume
                    </button>
                </form>    
            )}
        </section>
    </main>
  )
}

export default upload