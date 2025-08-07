import ScoreGauge from "./ScoreGauge";
import ScoreBadge from "./ScoreBadge";


const Category = ({ title, score }: { title: string; score: number }) => {
    const textColor = score > 70 ? 'text-green-600' : score > 49 ? 'text-yellow-600' : 'text-red-600';
    return (
        <div className="resume-summary">
            <div className="category">
                <div className="flex flex-row items-center justify-center space-x-1.5 sm:space-x-3">
                    <p className="text-xl">{title}</p>
                    <ScoreBadge score={score} />
                </div>
                <p className="text-xl">
                    <span className={textColor}>{score}</span>/100
                </p>
            </div>
        </div>
    );
}

const Summary = ({ feedback } : {feedback :Feedback}) => {
  return (
    <div className="bg-gray-50 shadow-md rounded-xl w-full">
        <div className="flex sm:flex-row flex-col items-center p-4 gap-6">
            <ScoreGauge score={feedback.overallScore} />

            <div className="flex flex-col gap-2">
                <h2 className="font-semibold">Resume Score</h2>
                <p className="text-sm text-gray-500">This score is calculated based on the variables listed below:</p>
            </div>
        </div>
        
        <Category title='Tone & Style' score={feedback.toneAndStyle.score}/>
        <Category title='Content' score={feedback.content.score}/>
        <Category title='Structure' score={feedback.structure.score}/>
        <Category title='Skills' score={feedback.skills.score}/>

    </div>

  )
}

export default Summary