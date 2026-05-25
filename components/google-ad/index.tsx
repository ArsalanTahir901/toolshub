import { icons } from '../icons';
import './style.css';

export const GoogleAd = () => {
    return (
        <div className="ad-banner" role="complementary" aria-label="Advertisement">
            {icons.announcement} Advertisement - Google AdSense Unit (728x90)
            <span>Replace with &lt;ins className=&quot;adsbygoogle&quot;&gt; tag</span>
        </div>
    )
}