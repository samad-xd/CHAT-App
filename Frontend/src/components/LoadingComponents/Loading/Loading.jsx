import './Loading.css';

export default function Loading() {
    return (
        <div className="loading">
            <div className="loader">
                <li className="ball"></li>
                <li className="ball"></li>
                <li className="ball"></li>
            </div>
        </div>
    );
}