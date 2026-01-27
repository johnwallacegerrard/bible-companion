import HomeTab from "./HomeTab";
import DiscoverTab from "./DiscoverTab";
import CommunityTab from "./CommunityTab";
import PlansTab from "./PlansTab";

import "./MainContent.css";

const MainContent = ({
  activeTab,
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
    <div className="main container">
      {activeTab === "home" && (
        <HomeTab
          getActivePlan={getActivePlan}
          streak={streak}
          streakGoal={streakGoal}
          myPlans={myPlans}
        />
      )}
      {activeTab === "discover" && (
        <DiscoverTab featuredPlans={featuredPlans} startPlan={startPlan} />
      )}
      {activeTab === "community" && (
        <CommunityTab
          friends={friends}
          sampleFriends={sampleFriends}
          addFriend={addFriend}
          churches={churches}
          sampleChurches={sampleChurches}
          joinChurch={joinChurch}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          setShowAddFriend={setShowAddFriend}
        />
      )}
      {activeTab === "myplans" && (
        <PlansTab
          myPlans={myPlans}
          getCurrentDayReading={getCurrentDayReading}
          userProgress={userProgress}
          reflections={reflections}
          markComplete={markComplete}
          addReflection={addReflection}
        />
      )}
    </div>
  );
};

export default MainContent;
