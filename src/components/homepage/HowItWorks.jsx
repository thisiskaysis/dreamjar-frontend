function HowItWorks() {
  const steps = [
    {
      emoji: "1️⃣",
      title: "Choose a Child",
      description: "Browse campaigns and pick the dream you want to support.",
    },
    {
      emoji: "2️⃣",
      title: "Donate",
      description: "Contribute easily and securely to help their dream grow.",
    },
    {
      emoji: "3️⃣",
      title: "Watch the Magic",
      description: "See how your support brings their dreams to life!",
    },
  ];

  return (
    <section className="how-it-works py-16 px-6 bg-[#f7f0ff] text-center">
      <h2 className="text-4xl font-bold mb-12">How It Works</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
        {steps.map((step, i) => (
          <div key={i} className="glass-panel flex flex-col items-center p-6">
            <div className="text-5xl mb-4">{step.emoji}</div>
            <h3 className="font-bold mb-2">{step.title}</h3>
            <p>{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default HowItWorks;
