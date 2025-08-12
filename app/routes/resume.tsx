import { Link, useNavigate, useParams } from "react-router"
import type { Route } from "../+types/root";
import { useEffect, useState } from "react";
import { usePuterStore } from "~/lib/puter";
import Summary from "~/components/Summary";
import ATS from "~/components/ATS";
import Details from "~/components/Details";
import SkeletonLoader from "../components/SkeletonLoader";
import SkeletonImage from "../components/SkeletonImage";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Analyzer | Review" },
    { name: "description", content: "Detailed overview of your resume" },
  ];
}

const resume = () => {
    const { auth, fs, kv, ai, isLoading } = usePuterStore();
    const { id } = useParams()
    const [imageUrl, setImageUrl] = useState<string | null>('');
    const [resumeUrl, setResumeUrl] = useState<string | null>('');
    const [feedback, setFeedback] = useState<Feedback | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if(!isLoading && !auth.isAuthenticated) navigate(`auth?next=/resume/${id}`);
    }, [isLoading])

    useEffect(() => {
        const loadResume = async () => {
            const resume = await kv.get(`resume:${id}`);
            if (!resume) {
                console.error("Resume not found");
                return;
            }

            const data = JSON.parse(resume);

            const resumeBlob = await fs.read(data.resumePath)
            if(!resumeBlob) return

            const pdfBlob = new Blob([resumeBlob], { type: 'application/pdf' });
            const resumeUrl = URL.createObjectURL(pdfBlob);
            setResumeUrl(resumeUrl);

            

            const imageBlob = await fs.read(data.imagePath);
            if(!imageBlob) return
            const imageUrl = URL.createObjectURL(imageBlob);
            setImageUrl(imageUrl);

            setFeedback(data.feedback || '');
        }
        loadResume()
    }, [id]);
  return (
    <main className="!pt-0 bg-gray-50 overflow-hidden">
        <nav className="resume-nav">
            <Link to='/' className="back-button">
                <img src="/icons/back.svg" alt="Back" className="w-3.5 h-3.5" />
                <span className="text-gray-800 text-sm font-semibold hidden sm:inline">Back to Homepage</span>
            </Link>
        </nav>
        <div className="flex flex-row w-full max-lg:flex-col-reverse">
            <section className="feedback-section bg-[url('/images/bg-small.svg)] bg-cover h-fit sticky top-0">
                <p className="text-xl font-semibold inline-flex lg:hidden">Your Resume</p>
                {(!imageUrl || !resumeUrl) ? (
                    <SkeletonImage />
                ) : (
                    <div className="gradient-border max-sm:m-0 h-[90%] max-w-xl:h-fit w-fit">
                        <a href={resumeUrl} target='_blank' rel='noreferrer'>
                            <img 
                                src={imageUrl}
                                alt="Resume Image"
                                className="w-full h-full object-contain rounded-2xl"
                            />
                        </a>
                    </div>
                )}
            </section>
            <section className="feedback-section">
                <h2 className="text-3xl !text-black font-semibold">
                    Resume Review
                </h2>
                {feedback === null ? (
                    <SkeletonLoader />
                ) : feedback ? (
                    <div className="flex flex-col gap-6 animate-in fade-in duration-1500">
                        <Summary feedback={feedback} />
                        <ATS score={feedback.ATS.score} suggestions={feedback.ATS.tips}/>
                        <Details feedback={feedback} />
                    </div>
                ) : (
                    <img src="/images/resume-scan-2.gif" className="w-full" />
                )}
            </section>
        </div>
    </main>
  )
}

export default resume