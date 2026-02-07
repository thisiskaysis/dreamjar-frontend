import { useState } from "react";
import useCampaigns from "../../hooks/use-campaigns.js";
import BrowseCampaignCard from "../../components/Browse/BrowseCampaignCard.jsx";
import SearchBar from "../../components/Browse/SearchBar.jsx";
import "./BrowseCampaignPage.css";

function BrowseCampaignPage() {
  const { campaigns, isLoading, error } = useCampaigns();

  // Search / Filter / Sort state
  const [searchText, setSearchText] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [sortOption, setSortOption] = useState("");

  // Dynamically compute campaigns to display
  const getDisplayCampaigns = () => {
    let result = [...campaigns];

    // 1️⃣ Filter by search text
    if (searchText) {
      result = result.filter(
        (c) =>
          c.title.toLowerCase().includes(searchText.toLowerCase()) ||
          c.child_name.toLowerCase().includes(searchText.toLowerCase()),
      );
    }

    // 2️⃣ Filter by category
    if (categoryFilter) {
      result = result.filter((c) => c.category === categoryFilter);
    }

    // 3️⃣ Sort
    if (sortOption) {
      switch (sortOption) {
        case "newest":
          result.sort(
            (a, b) => new Date(b.date_created) - new Date(a.date_created),
          );
          break;
        case "endingSoon":
          result.sort((a, b) => {
            const aTime = a.deadline
              ? new Date(a.deadline).getTime()
              : Infinity;
            const bTime = b.deadline
              ? new Date(b.deadline).getTime()
              : Infinity;
            return aTime - bTime;
          });
          break;
        case "goalAsc":
          result.sort((a, b) => a.goal - b.goal);
          break;
        case "goalDesc":
          result.sort((a, b) => b.goal - a.goal);
          break;
        case "raisedAsc":
          result.sort((a, b) => a.total_raised - b.total_raised);
          break;
        case "raisedDesc":
          result.sort((a, b) => b.total_raised - a.total_raised);
          break;
        default:
          break;
      }
    }

    return result;
  };

  const displayCampaigns = getDisplayCampaigns();

  if (isLoading) return <p className="loading">Loading campaigns...</p>;
  if (error) return <p className="error">Error loading campaigns</p>;

  return (
    <div className="browse-page">
      <h1>Browse Campaigns</h1>

      {/* Search / Filter / Sort bar */}
      <SearchBar
        searchText={searchText}
        setSearchText={setSearchText}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
        sortOption={sortOption}
        setSortOption={setSortOption}
      />

      {displayCampaigns.length === 0 ? (
        <p className="no-campaigns">No campaigns available at the moment.</p>
      ) : (
        <div className="browse-grid">
          {displayCampaigns.map((campaign) => (
            <BrowseCampaignCard key={campaign.id} campaign={campaign} />
          ))}
        </div>
      )}
    </div>
  );
}

export default BrowseCampaignPage;
