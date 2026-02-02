function FeaturedCampaigns() {
    return (
        <section className="featured-campaigns">
            <h2>Featured DreamJars</h2>
            <div className="feature-campaign-grid">
                {/* example campaign cards */}
                {[1, 2, 3].map((id) => (
                    <div key={id} className="feature-campaign-card">
                        <div className="campaign-image">Image {id}</div>
                        <h3> Dream Title {id} </h3>
                        <p>by Dreamer {id}</p>
                        <div className="progress-bar">
                            <div className="progress" style={{ width: '50%' }}></div>
                        </div>
                        <button className="featureview-btn">View DreamJar</button>
                        </div>
                ))}
            </div>
        </section>
    );
}

export default FeaturedCampaigns;