import { toolsArray } from '@/features/tools/registry';
import './style.css';

export const Stats = () => {
    return (
        <div className="stats">
            <div className="stat">
                <div className="stat-num">50K+</div>
                <div className="stat-label">Daily Users</div>
            </div>
            <div className="stat">
                <div className="stat-num">{toolsArray.length}</div>
                <div className="stat-label">Free Tools</div>
            </div>
            <div className="stat">
                <div className="stat-num">100%</div>
                <div className="stat-label">No Data Stored</div>
            </div>
        </div>
    )
}