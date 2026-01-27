import "./HomeTab.css";

const HomeTab = ({ getActivePlan, streak, streakGoal, myPlans }) => {
  return (
    <section className="home">
      <div className="home__card">
        <h2 className="home__title">Welcome back!</h2>
        <p className="home__subtitle">Keep growing in your faith journey</p>

        {getActivePlan() ? (
          <div className="home__continue">
            <div>
              <p className="home__plan-name">{getActivePlan().name}</p>
              <p className="home__plan-hint">Continue where you left off</p>
            </div>
            <button className="button button--primary">Continue</button>
          </div>
        ) : (
          <div className="home__empty">
            <p className="home__empty-text">
              Start your first plan to begin reading
            </p>
            <button className="button button--primary">Explore Plans</button>
          </div>
        )}
      </div>

      <div className="home__stats">
        <div className="stat-card stat-card--orange">
          <h3 className="stat-card__title">Reading Streak</h3>
          <p className="stat-card__value">
            {streak} / {streakGoal}
          </p>
          <div className="progress">
            <div className="progress__bar" />
          </div>
        </div>

        <div className="stat-card stat-card--green">
          <h3 className="stat-card__title">Active Plans</h3>
          <p className="stat-card__value">{myPlans.length}</p>
        </div>
      </div>
    </section>
  );
};

export default HomeTab;
