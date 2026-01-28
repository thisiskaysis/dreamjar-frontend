import ProgressBar from "../components/ProgressBar/ProgressBar.jsx";
import ProgressJar from "../components/ProgressJar/ProgressJar.jsx";

function CampaignPage() {
    return (
        <div>
    <h1>This is the Campaign page, to show a single campaign.</h1>
    <div className="jar-container">
        <ProgressJar /></div>
        <ProgressBar />
        </div>
    );
}

export default CampaignPage;