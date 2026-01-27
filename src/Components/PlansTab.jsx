import "./PlansTab.css";

const PlansTab = ({
  myPlans,
  getCurrentDayReading,
  userProgress,
  reflections,
  markComplete,
  addReflection,
}) => {
  if (myPlans.length === 0) {
    return (
      <section className="plans plans--empty">
        <h3 className="plans__empty-title">No active plans yet</h3>
        <p className="plans__empty-text">
          Start a plan from Discover or create your own!
        </p>
      </section>
    );
  }

  return (
    <section className="plans">
      {myPlans.map((plan) => {
        const currentReading = getCurrentDayReading(plan);
        const currentDay = currentReading?.day || 1;
        const progressKey = `${plan.id}-${currentDay}`;
        const isComplete = userProgress[progressKey];

        return (
          <article key={plan.id} className="plan">
            {/* Header */}
            <header className="plan__header">
              <div>
                <h3 className="plan__title">{plan.name}</h3>
                <p className="plan__description">{plan.description}</p>
              </div>
              <button className="plan__invite">Invite</button>
            </header>

            {/* Today's Reading */}
            <div className="plan__reading">
              <button
                className={`plan__check ${
                  isComplete ? "plan__check--done" : ""
                }`}
                onClick={() => markComplete(plan.id, currentDay)}
              >
                ✓
              </button>

              <div className="plan__content">
                <div className="plan__day">
                  Day {currentDay}: {currentReading?.reading}
                </div>

                {/* Intro */}
                <div className="plan__intro">
                  <h4 className="plan__intro-title">
                    Today’s Reading Overview
                  </h4>
                  <p className="plan__intro-text">
                    {currentReading?.intro ||
                      "Read today's passage and reflect on what God is teaching you."}
                  </p>
                </div>

                {/* Reflection */}
                <div className="plan__reflection">
                  <label className="plan__reflection-label">
                    Share your reflection
                  </label>
                  <textarea
                    className="plan__reflection-input"
                    rows={3}
                    value={reflections[progressKey] || ""}
                    onChange={(e) =>
                      addReflection(plan.id, currentDay, e.target.value)
                    }
                    placeholder="What did you learn today? How will you apply it?"
                  />
                </div>
              </div>
            </div>

            {/* Completion Message */}
            {isComplete && (
              <div className="plan__complete">
                ✓ Great job! You’ve completed today’s reading.
              </div>
            )}

            {/* Progress */}
            <div className="plan__progress">
              <div className="plan__progress-text">
                <span>Progress</span>
                <span>
                  {currentDay} of {plan.dailyReadings.length} days
                </span>
              </div>
              <div className="progress">
                <div
                  className="progress__bar"
                  style={{
                    width: `${(currentDay / plan.dailyReadings.length) * 100}%`,
                  }}
                />
              </div>
            </div>
          </article>
        );
      })}
    </section>
  );
};

export default PlansTab;
