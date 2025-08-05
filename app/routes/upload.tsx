import { useState, type FormEvent } from "react";
import Navbar from "~/components/Navbar"
import type { Route } from "../+types/root";
import FileUploader from "~/components/FileUploader";
import { usePuterStore } from "~/lib/puter";
import { useNavigate } from "react-router";
import { convertPdfToImage } from "~/lib/pdf2img";
import { generateUUID } from "~/lib/utils";
import { prepareInstructions } from "~/constants";
// import { aw } from "node_modules/react-router/dist/development/route-data-DjzmHYNR.mjs";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Analyzer | Upload" },
    { name: "description", content: "Upload your resume for an ATS score" },
  ];
}

const upload = () => {
    const { fs, kv, ai, auth, isLoading } = usePuterStore();
    const navigate = useNavigate();
    const [isProcessing, setIsProcessing] = useState(false);
    const [statusText, setStatusText] = useState("");
    const [file, setFile] = useState<File | null>(null);
    const handleFileSelect = (file: File | null) => {
        setFile(file);
    }

    const handleAnalyzeResume = async ({ companyName, jobTitle, jobDescription, file} : handleAnalyzeResume) => {
        setIsProcessing(true);
        setStatusText("Uploading your resume...");
        const uploadedFile = await fs.upload([file])
        if(!uploadedFile) {
            // setIsProcessing(false);
            setStatusText("Failed to upload resume. Please try again.");
            navigate('/upload');
            return;
        }

        setStatusText('Converting your resume to image...');
        const imageFile = await convertPdfToImage(file)
        if(!imageFile.file) {
            // setIsProcessing(false);
            setStatusText("Failed to convert resume to image. Please try again.");
            navigate('/upload');
            return;
        }

        setStatusText('Uploading the image...');
        const uploadedImage = await fs.upload([imageFile.file])
        if(!uploadedImage) {
            // setIsProcessing(false);
            setStatusText("Failed to upload resume image. Please try again.");
            navigate('/upload');
            return;
        }

        setStatusText('Preparing data for analysis...');
        const generatedId = generateUUID();
        const data = {
            id: generatedId,
            resumePath: uploadedFile.path,
            imagePath: uploadedImage.path,
            companyName, jobTitle, jobDescription,
            feedback: '',
        }

        await kv.set(`resume:${generatedId}`, JSON.stringify(data));

        setStatusText('Analyzing your resume...');

        const feedback = await ai.feedback(
            uploadedFile.path,
            prepareInstructions({jobTitle, jobDescription})
        )

        if(!feedback) {
            // setIsProcessing(false);
            setStatusText("Failed to analyze resume. Please try again.");
            navigate('/upload');
            return;
        }

        const feedbackData = typeof feedback.message.content === 'string' ? feedback.message.content : feedback.message.content[0].text;

        data.feedback = JSON.parse(feedbackData);
        await kv.set(`resume:${generatedId}`, JSON.stringify(data));
        setIsProcessing(false);
        setStatusText('Analysis complete! Redirecting you to your resume...');

        console.log('Resume data:', data);
        navigate(`/resume/${generatedId}`);

        console.log('Feedback:', data.feedback);
    }

    const handleFileUpload = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.currentTarget.closest('form')
        if(!form) return
        const formData = new FormData(form);

        const companyName = formData.get('company-name') as string;
        const jobTitle = formData.get('job-title') as string;
        const jobDescription = formData.get('job-description') as string;

        if(!file) return

        handleAnalyzeResume({
            companyName,
            jobTitle,
            jobDescription,
            file
        });
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