import { Link } from "react-router-dom"; // for linking to campaigns

function DonationsList({ donations }) {
  const sortedDonations = [...donations].sort(
    (a, b) => new Date(b.date_donated) - new Date(a.date_donated)
  );
  const totalDonations = sortedDonations.length;
  const totalDonated = sortedDonations.reduce((sum, d) => sum + d.amount, 0);

  if (!donations.length) {
    return <p className="text-gray-500 text-center">You haven't made any donations yet.</p>;
  }

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Stats Panel */}
      <div className="flex justify-center gap-6 mb-4">
        <div className="stat-panel">
          <p className="stat-text">Total Donations</p>
          <p className="text-2xl font-bold">{totalDonations}</p>
        </div>
        <div className="stat-panel">
          <p className="stat-text">Total Donated</p>
          <p className="text-2xl font-bold">${totalDonated}</p>
        </div>
      </div>

      {/* Donations List */}
      <section className="flex flex-col items-center gap-4 w-full max-w-2xl">
        {sortedDonations.map((donation) => (
          <Link
            key={donation.id}
            to={`/dreamjars/${donation.campaign}`}
            className="stat-panel w-full hover:shadow-lg transition-shadow"
          >
            <p className="font-semibold text-center">{donation.campaign.title}</p>
            <p className="text-sm text-gray-600 text-center">
              Child: {donation.campaign.child_name}
            </p>
            <p className="text-lg font-bold text-center">Amount: ${donation.amount}</p>
            {donation.comment && (
              <p className="italic text-gray-500 text-center">"{donation.comment}"</p>
            )}
            <p className="text-gray-500 text-sm text-center">
              Donated on {new Date(donation.date_donated).toLocaleDateString()}
            </p>
          </Link>
        ))}
      </section>
    </div>
  );
}

export default DonationsList;
