function DonationCard({ campaign }) {

    const {
        amount,
        date_donated,
        donor_name,
        comment
    } = donation;

    return (
        <div className="donation-card">
            <div className="donation-content">
                <h1>Donations</h1>
                <h2 className="donation-title">{title}</h2>
                <p className="donation-child">By {child_name}</p>
                <span className="donation-category">{category}</span>
                <div className="donation-progress-bg">
                    <div className="donation-progress" style={{ width: `${percentage_raised}%` }} />
                </div>
                <p className="donation-progress-text"><strong>${total_raised}</strong> raised of ${goal}</p>
                <p className="donation-deadline">{remainingText}</p>
                <p className="donation-description">{description}</p>
                <button className="dj-button">Support This Dream ✨</button>
            </div>
        </div>
    );
}

export default DonationCard;