const ProtectedLayout = ({
  showCreatePlan,
  activeTab,
  setActiveTab,
  getActivePlan,
  streak,
  streakGoal,
  myPlans,
  featuredPlans,
  friends,
  sampleFriends,
  addFriend,
  churches,
  sampleChurches,
  joinChurch,
  searchQuery,
  setSearchQuery,
  setShowAddFriend,
  startPlan,
  getCurrentDayReading,
  userProgress,
  reflections,
  markComplete,
  addReflection,
}) => {
  return (
    <>
      <Header showCreatePlan={showCreatePlan} />
      <Nav activeTab={activeTab} setActiveTab={setActiveTab} />
      <MainContent
        startPlan={startPlan}
        activeTab={activeTab}
        getActivePlan={getActivePlan}
        streak={streak}
        streakGoal={streakGoal}
        myPlans={myPlans}
        featuredPlans={featuredPlans}
        friends={friends}
        sampleFriends={sampleFriends}
        addFriend={addFriend}
        churches={churches}
        sampleChurches={sampleChurches}
        joinChurch={joinChurch}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        setShowAddFriend={setShowAddFriend}
        getCurrentDayReading={getCurrentDayReading}
        userProgress={userProgress}
        reflections={reflections}
        markComplete={markComplete}
        addReflection={addReflection}
      />
    </>
  );
};

export default ProtectedLayout;
