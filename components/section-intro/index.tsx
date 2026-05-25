import { SectionIntroProps } from '@/types/section';
import './style.css';

export const SectionIntro = ({ description, gradientText, title }: SectionIntroProps) => {
    return (
        <div className='section-intro'>
            <h1 className="section-heading">
                {title}
                <br />
                <span>
                    {gradientText}
                </span>
            </h1>
            <p className='description'>{description}</p>
        </div>
    )
}