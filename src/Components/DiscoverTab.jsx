import "./DiscoverTab.css";

const DiscoverTab = ({ featuredPlans, startPlan }) => {
  return (
    <section className="discover">
      <header className="discover__header">
        <h2 className="discover__title">Featured Reading Plans</h2>
        <p className="discover__subtitle">
          Choose a plan to start your Bible reading journey
        </p>
      </header>

      <div className="discover__grid">
        {featuredPlans.map((plan) => (
          <article key={plan.id} className="plan-card">
            <div className="plan-card__header">
              <h3 className="plan-card__title">{plan.name}</h3>
              <span className="plan-card__tag">{plan.category}</span>
            </div>
            <p className="plan-card__desc">{plan.description}</p>
            <button
              className="button button--secondary"
              onClick={() => startPlan(plan)}
            >
              Start Plan
            </button>
          </article>
        ))}
      </div>
    </section>
  );
};

export default DiscoverTab;
