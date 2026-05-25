import './style.css';
import { SectionTitleProps } from "@/types/section";

export const SectionTitle = ({ icon, title, className = '', action }: SectionTitleProps) => {
    return (
        <div className={`section-title-box relative ${className}`}>
            <h2 className="section-title">{icon} {title}</h2>
            {!!action && 
            <div className='section-action'>
                {action}
            </div>}
        </div>
    )
}