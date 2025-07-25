import { Link } from "react-router"
import ScoreCircle from "./ScoreCircle"

const ResumeCard = ({resume}: {resume : Resume}) => {
  return (
    <Link to={`/resume/${resume.id}`} className="resume-card animate-in fade-in duration-150">
        <div className="flex flex-row gap-2 justify-between min-h-[110px] max-sm:flex-col items-center max-md:justify-center max-md:items-center">
            <div className="flex flex-col gap-2">
                <h2 className="!text-black font-bold break-words">
                    {resume.companyName || "Company Name Not Specified"}
                </h2>
                <h3 className="text-lg text-gray-500 break-words">
                    {resume.jobTitle || "Job Title Not Specified"}
                </h3>
            </div>
            <div className="flex shrink-0">
                <ScoreCircle score={resume.feedback.overallScore} />
            </div>
        </div>

        <div className="gradient-border animate-in fade-in duration-1000">
            <div className="w-full h-full">
                <img src={resume.imagePath} alt='resume' className="w-full h-[250px] max-sm:h-[100px] object-cover object-top"/>
            </div>
        </div>
    </Link>
  )
}

export default ResumeCard