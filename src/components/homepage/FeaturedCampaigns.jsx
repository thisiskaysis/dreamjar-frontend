function FeaturedCampaigns() {
  // Example static campaigns
  const campaigns = [
    {
      id: 1,
      title: "Emma’s Art Project",
      child: "Emma",
      goal: 500,
      raised: 320,
      image: "/child1.jpg",
    },
    {
      id: 2,
      title: "Liam’s Science Kit",
      child: "Liam",
      goal: 400,
      raised: 250,
      image: "/child2.jpg",
    },
    {
      id: 3,
      title: "Sophia’s Dance Shoes",
      child: "Sophia",
      goal: 300,
      raised: 300,
      image: "/child3.jpg",
    },
    {
      id: 4,
      title: "Noah’s Lego Set",
      child: "Noah",
      goal: 450,
      raised: 180,
      image: "/child4.jpg",
    },
  ];

  return (
    <section className="featured-campaigns py-16 px-6">
      <h2 className="text-4xl font-bold text-center mb-12">Featured Campaigns</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {campaigns.map((c) => {
          const percentage = Math.min((c.raised / c.goal) * 100, 100);
          return (
            <div key={c.id} className="glass-panel flex flex-col">
              <img
                src={c.image}
                alt={c.title}
                className="rounded-xl object-cover w-full h-48 mb-4"
              />
              <h3 className="font-bold text-xl mb-1">{c.title}</h3>
              <p className="text-sm mb-2">
                Goal: ${c.goal} • Raised: ${c.raised}
              </p>
              <div className="w-full bg-white h-2 rounded-full overflow-hidden mb-2">
                <div
                  className="bg-purple-700 h-2 rounded-full"
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
              <a
                href={`/campaign/${c.id}`}
                className="mt-auto text-center bg-purple-700 text-white py-2 px-4 rounded-xl hover:scale-105 transition-transform"
              >
                Donate
              </a>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default FeaturedCampaigns;
