import "./CommunityTab.css";

const CommunityTab = ({
  friends,
  sampleFriends,
  addFriend,
  churches,
  sampleChurches,
  joinChurch,
  searchQuery,
  setSearchQuery,
  setShowAddFriend,
}) => {
  return (
    <section className="community">
      {/* Friends Section */}
      <div className="community__card">
        <header className="community__header">
          <h2 className="community__title">Friends</h2>
          <button
            className="community__action"
            onClick={() => setShowAddFriend(true)}
          >
            Add Friend
          </button>
        </header>

        {friends.length === 0 ? (
          <div className="community__empty">
            <p className="community__empty-text">
              Connect with friends to encourage each other
            </p>
            <button
              className="button button--primary"
              onClick={() => setShowAddFriend(true)}
            >
              Find Friends
            </button>
          </div>
        ) : (
          <div className="community__list">
            {friends.map((friend) => (
              <div key={friend.id} className="friend">
                <div className="friend__info">
                  <p className="friend__name">{friend.name}</p>
                  <p className="friend__plan">{friend.currentPlan}</p>
                </div>
                <div className="friend__streak">{friend.streak}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Churches Section */}
      <div className="community__card">
        <header className="community__header">
          <h2 className="community__title">Churches</h2>
        </header>

        {/* Search */}
        <div className="community__search">
          <input
            type="text"
            className="community__search-input"
            placeholder="Search for your church..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* My Churches */}
        {churches.length > 0 && (
          <div className="churches">
            <h3 className="churches__title">My Churches</h3>

            <div className="churches__list">
              {churches.map((church) => (
                <div key={church.id} className="church">
                  <header className="church__header">
                    <h4 className="church__name">{church.name}</h4>
                    <span className="church__members">
                      {church.members} members
                    </span>
                  </header>

                  <div className="church__plans">
                    {church.plans.map((plan) => (
                      <div key={plan.id} className="church-plan">
                        <div>
                          <p className="church-plan__name">{plan.name}</p>
                          <p className="church-plan__meta">
                            {plan.duration} · {plan.participants} reading
                          </p>
                        </div>
                        <button
                          className="button button--secondary button--small"
                          onClick={() => joinChurch(church)}
                        >
                          Join
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Available Churches */}
        <div className="churches">
          <h3 className="churches__title">Find Your Church</h3>

          <div className="churches__list">
            {sampleChurches
              .filter((c) => !churches.find((ch) => ch.id === c.id))
              .filter(
                (c) =>
                  searchQuery === "" ||
                  c.name.toLowerCase().includes(searchQuery.toLowerCase()),
              )
              .map((church) => (
                <div key={church.id} className="church church--available">
                  <header className="church__header">
                    <h4 className="church__name">{church.name}</h4>
                    <button
                      className="button button--secondary button--small"
                      onClick={() => joinChurch(church)}
                    >
                      Join Church
                    </button>
                  </header>
                  <p className="church__meta">
                    {church.members} members · {church.plans.length} active
                    plans
                  </p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunityTab;
