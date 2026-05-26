import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "./auth.js";

import {
  Calendar,
  Users,
  Plus,
  BookOpen,
  CheckCircle,
  MessageSquare,
  Share2,
  Flame,
  Target,
  ArrowRight,
  UserPlus,
  Church,
  Search,
} from "lucide-react";
import Header from "./Components/Header";
import Nav from "./Components/Nav";
import MainContent from "./Components/MainContent.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import ProtectedLayout from "./pages/ProtectedLayout.jsx";

const BibleReadingApp = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [myPlans, setMyPlans] = useState([]);
  const [showCreatePlan, setShowCreatePlan] = useState(false);
  const [userProgress, setUserProgress] = useState({});
  const [reflections, setReflections] = useState({});
  const [streak, setStreak] = useState(0);
  const [streakGoal, setStreakGoal] = useState(7);
  const [lastReadDate, setLastReadDate] = useState(null);
  const [showGoalModal, setShowGoalModal] = useState(false);
  const [friends, setFriends] = useState([]);
  const [churches, setChurches] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddFriend, setShowAddFriend] = useState(false);

  // Sample churches with plans
  const sampleChurches = [
    {
      id: 1,
      name: "Grace Community Church",
      members: 342,
      plans: [
        {
          id: 101,
          name: "Summer Sermon Series",
          duration: "8 weeks",
          participants: 156,
        },
        {
          id: 102,
          name: "Book of Romans Study",
          duration: "16 weeks",
          participants: 89,
        },
      ],
    },
    {
      id: 2,
      name: "Riverside Fellowship",
      members: 528,
      plans: [
        {
          id: 201,
          name: "New Believers Journey",
          duration: "30 days",
          participants: 203,
        },
        {
          id: 202,
          name: "Prophets & Kings",
          duration: "12 weeks",
          participants: 124,
        },
      ],
    },
    {
      id: 3,
      name: "Hope Chapel",
      members: 215,
      plans: [
        {
          id: 301,
          name: "Gospel Foundations",
          duration: "6 weeks",
          participants: 97,
        },
      ],
    },
  ];

  // Sample friends
  const sampleFriends = [
    { id: 1, name: "Sarah Johnson", streak: 42, currentPlan: "365 Day Bible" },
    {
      id: 2,
      name: "Michael Chen",
      streak: 15,
      currentPlan: "New Testament in 90 Days",
    },
    {
      id: 3,
      name: "Emma Rodriguez",
      streak: 8,
      currentPlan: "Wisdom & Psalms",
    },
  ];
  const featuredPlans = [
    {
      id: 1,
      name: "365 Day Bible",
      description: "Read through the entire Bible in one year",
      duration: "365 days",
      category: "Complete Bible",
      dailyReadings: ["Genesis 1-3", "Genesis 4-7", "Genesis 8-11"],
      participants: 0,
    },
    {
      id: 2,
      name: "New Testament in 90 Days",
      description: "Focus on Jesus and the early church",
      duration: "90 days",
      category: "New Testament",
      dailyReadings: ["Matthew 1-4", "Matthew 5-7", "Matthew 8-10"],
      participants: 0,
    },
    {
      id: 3,
      name: "Wisdom & Psalms",
      description: "Dive deep into wisdom literature",
      duration: "60 days",
      category: "Topical",
      dailyReadings: ["Psalm 1-5", "Psalm 6-10", "Proverbs 1-3"],
      participants: 0,
    },
    {
      id: 4,
      name: "Gospel of John",
      description: "Explore the life of Jesus in depth",
      duration: "21 days",
      category: "Gospel",
      dailyReadings: ["John 1", "John 2-3", "John 4-5"],
      participants: 0,
    },
  ];

  const [newPlan, setNewPlan] = useState({
    name: "",
    description: "",
    readings: [""],
  });

  useEffect(() => {
    const saved = localStorage.getItem("bibleAppData");
    if (saved) {
      const data = JSON.parse(saved);
      setMyPlans(data.myPlans || []);
      setUserProgress(data.progress || {});
      setReflections(data.reflections || {});
      setStreak(data.streak || 0);
      setStreakGoal(data.streakGoal || 7);
      setLastReadDate(data.lastReadDate || null);
      setFriends(data.friends || []);
      setChurches(data.churches || []);
    }
  }, []);

  const saveData = (
    plans,
    progress,
    refs,
    streakVal,
    goal,
    lastDate,
    friendsList,
    churchesList,
  ) => {
    localStorage.setItem(
      "bibleAppData",
      JSON.stringify({
        myPlans: plans,
        progress: progress,
        reflections: refs,
        streak: streakVal,
        streakGoal: goal,
        lastReadDate: lastDate,
        friends: friendsList,
        churches: churchesList,
      }),
    );
  };

  const updateStreak = () => {
    const today = new Date().toDateString();
    const yesterday = new Date(Date.now() - 86400000).toDateString();

    if (lastReadDate === today) {
      return streak;
    } else if (lastReadDate === yesterday) {
      const newStreak = streak + 1;
      setStreak(newStreak);
      setLastReadDate(today);
      return newStreak;
    } else {
      setStreak(1);
      setLastReadDate(today);
      return 1;
    }
  };

  const startPlan = (plan) => {
    const updatedPlans = [...myPlans];
    const existingIndex = updatedPlans.findIndex((p) => p.id === plan.id);

    if (existingIndex === -1) {
      const newPlanWithProgress = {
        ...plan,
        startDate: new Date().toISOString(),
        currentDay: 1,
        participants: (plan.participants || 0) + 1,
      };
      updatedPlans.push(newPlanWithProgress);
      setMyPlans(updatedPlans);
      saveData(
        updatedPlans,
        userProgress,
        reflections,
        streak,
        streakGoal,
        lastReadDate,
        friends,
        churches,
      );
    }
    setActiveTab("myplans");
  };

  const createCustomPlan = () => {
    if (newPlan.name && newPlan.readings[0]) {
      const customPlan = {
        id: Date.now(),
        name: newPlan.name,
        description: newPlan.description,
        duration: `${newPlan.readings.filter((r) => r).length} days`,
        category: "Custom",
        dailyReadings: newPlan.readings.filter((r) => r),
        startDate: new Date().toISOString(),
        currentDay: 1,
        participants: 1,
        isCustom: true,
      };

      const updatedPlans = [...myPlans, customPlan];
      setMyPlans(updatedPlans);
      saveData(
        updatedPlans,
        userProgress,
        reflections,
        streak,
        streakGoal,
        lastReadDate,
        friends,
        churches,
      );
      setNewPlan({ name: "", description: "", readings: [""] });
      setShowCreatePlan(false);
      setActiveTab("myplans");
    }
  };

  const markComplete = (planId, day) => {
    const key = `${planId}-${day}`;
    const updated = { ...userProgress, [key]: !userProgress[key] };
    setUserProgress(updated);

    const newStreak = updateStreak();
    saveData(
      myPlans,
      updated,
      reflections,
      newStreak,
      dailyGoal,
      new Date().toDateString(),
    );
  };

  const addReflection = (planId, day, text) => {
    const key = `${planId}-${day}`;
    const updated = { ...reflections, [key]: text };
    setReflections(updated);
    saveData(
      myPlans,
      userProgress,
      updated,
      streak,
      streakGoal,
      lastReadDate,
      friends,
      churches,
    );
  };

  const getActivePlan = () => {
    return myPlans.find((plan) => {
      const firstIncompleteDay = plan.dailyReadings.findIndex((_, idx) => {
        const key = `${plan.id}-${idx + 1}`;
        return !userProgress[key];
      });
      return firstIncompleteDay !== -1;
    });
  };

  const jumpToReading = () => {
    const activePlan = getActivePlan();
    if (activePlan) {
      setActiveTab("myplans");
    }
  };

  const setGoal = (goal) => {
    setStreakGoal(goal);
    saveData(
      myPlans,
      userProgress,
      reflections,
      streak,
      goal,
      lastReadDate,
      friends,
      churches,
    );
    setShowGoalModal(false);
  };

  const addFriend = (friend) => {
    const updated = [...friends, friend];
    setFriends(updated);
    saveData(
      myPlans,
      userProgress,
      reflections,
      streak,
      streakGoal,
      lastReadDate,
      updated,
      churches,
    );
    setShowAddFriend(false);
  };

  const joinChurch = (church) => {
    if (!churches.find((c) => c.id === church.id)) {
      const updated = [...churches, church];
      setChurches(updated);
      saveData(
        myPlans,
        userProgress,
        reflections,
        streak,
        streakGoal,
        lastReadDate,
        friends,
        updated,
      );
    }
  };

  const startChurchPlan = (churchPlan, churchName) => {
    const plan = {
      id: churchPlan.id,
      name: churchPlan.name,
      description: `From ${churchName}`,
      duration: churchPlan.duration,
      category: "Church",
      dailyReadings: [
        {
          day: 1,
          reading: "Day 1 Reading",
          intro: "Begin your journey with this church reading plan.",
        },
        {
          day: 2,
          reading: "Day 2 Reading",
          intro: "Continue growing in faith together.",
        },
        {
          day: 3,
          reading: "Day 3 Reading",
          intro: "Reflect on today's passage with your community.",
        },
      ],
      startDate: new Date().toISOString(),
      currentDay: 1,
      participants: churchPlan.participants,
      churchPlan: true,
    };
    startPlan(plan);
  };

  const getCurrentDayReading = (plan) => {
    // Find the first incomplete day
    const firstIncompleteDay = plan.dailyReadings.findIndex((_, idx) => {
      const key = `${plan.id}-${idx + 1}`;
      return !userProgress[key];
    });

    if (firstIncompleteDay !== -1) {
      return plan.dailyReadings[firstIncompleteDay];
    }

    // If all complete, show the last day
    return plan.dailyReadings[plan.dailyReadings.length - 1];
  };

  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/app"
            element={
              isAuthenticated() ? (
                <ProtectedLayout
                  Header={Header}
                  Nav={Nav}
                  MainContent={MainContent}
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                  startPlan={startPlan}
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
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default BibleReadingApp;
