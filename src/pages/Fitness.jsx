import { useState, useMemo } from 'react';
import {
  Dumbbell,
  Sparkles,
  Play,
  Calendar,
  Clock,
  Flame,
  Award,
  TrendingUp,
  Search,
  Heart,
  ChevronRight,
  ChevronDown,
  Activity,
  Zap,
  Target,
  Shield,
  CheckCircle2,
  Lock,
  Filter,
  Layers,
  Check,
  RotateCcw,
  Info,
} from 'lucide-react';
import GymModeModal from '../components/fitness/GymModeModal';
import AIWorkoutGeneratorModal from '../components/fitness/AIWorkoutGeneratorModal';
import ExerciseDetailModal from '../components/fitness/ExerciseDetailModal';
import WorkoutSummaryModal from '../components/fitness/WorkoutSummaryModal';
import DayWorkoutModal from '../components/fitness/DayWorkoutModal';
import AIFitnessCoachChat from '../components/fitness/AIFitnessCoachChat';
import { useProfile } from '../hooks/useProfile';
import { exerciseLibraryData } from '../data/exerciseLibraryData';
import {
  fitnessProfile,
  fitnessScoreData,
  aiFitnessCoach,
  todaysWorkoutData,
  weeklyPlannerData,
  exerciseLibrary,
  homeWorkoutRoutines,
  mobilityRoutines,
  recoveryData,
} from '../data/fitnessData';
import styles from './Fitness.module.css';

export default function Fitness() {
  const { profile } = useProfile();

  // Simplified 5-tab navigation: Overview | Workouts | Exercises | Mobility | Coach
  const [activeTab, setActiveTab] = useState('overview');

  // Exercise Library state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedEquipment, setSelectedEquipment] = useState('All Equipment');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All Difficulties');

  // Workouts Tab: Toggle exercise preview list
  const [showTodayExercises, setShowTodayExercises] = useState(false);

  // Favorites state persisted in localStorage
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem('elevate_fav_exercises');
      return saved ? JSON.parse(saved) : ['chest-1', 'legs-1', 'back-1'];
    } catch {
      return ['chest-1', 'legs-1', 'back-1'];
    }
  });

  const toggleFavorite = (exerciseId) => {
    setFavorites((prev) => {
      const next = prev.includes(exerciseId)
        ? prev.filter((id) => id !== exerciseId)
        : [...prev, exerciseId];
      try {
        localStorage.setItem('elevate_fav_exercises', JSON.stringify(next));
      } catch (err) {
        console.error(err);
      }
      return next;
    });
  };

  // Modals state
  const [isGymModeActive, setIsGymModeActive] = useState(false);
  const [showAIGenerator, setShowAIGenerator] = useState(false);
  const [selectedExerciseDetail, setSelectedExerciseDetail] = useState(null);
  const [selectedDayForModal, setSelectedDayForModal] = useState(null);
  const [completedWorkoutSummary, setCompletedWorkoutSummary] = useState(null);
  const [addedToast, setAddedToast] = useState(null);

  // Active workout state
  const [activeWorkout, setActiveWorkout] = useState(todaysWorkoutData);

  const categories = [
    'All',
    'Chest',
    'Back',
    'Shoulders',
    'Arms',
    'Legs',
    'Glutes',
    'Core',
    'Mobility',
    'Favorites ❤️',
  ];

  const equipmentOptions = [
    'All Equipment',
    'No Equipment',
    'Dumbbells',
    'Barbell',
    'Cable Machine',
    'Bench',
    'Pull-Up Bar',
  ];

  const difficultyOptions = ['All Difficulties', 'Beginner', 'Intermediate', 'Advanced'];

  // Smart Search & Filtering in Exercise Library
  const filteredExercises = useMemo(() => {
    return exerciseLibrary.filter((ex) => {
      // 1. Category / Favorites Filter
      if (selectedCategory === 'Favorites ❤️') {
        if (!favorites.includes(ex.id)) return false;
      } else if (selectedCategory !== 'All' && ex.category !== selectedCategory) {
        return false;
      }

      // 2. Equipment Filter
      if (selectedEquipment !== 'All Equipment') {
        if (selectedEquipment === 'No Equipment') {
          if (!ex.equipment.toLowerCase().includes('no equipment') && !ex.equipment.toLowerCase().includes('bodyweight')) {
            return false;
          }
        } else if (!ex.equipment.toLowerCase().includes(selectedEquipment.toLowerCase())) {
          return false;
        }
      }

      // 3. Difficulty Filter
      if (selectedDifficulty !== 'All Difficulties' && ex.difficulty !== selectedDifficulty) {
        return false;
      }

      // 4. Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchName = ex.name.toLowerCase().includes(q);
        const matchPrimary = ex.primaryMuscle.toLowerCase().includes(q);
        const matchSecondary = ex.secondaryMuscles?.toLowerCase().includes(q);
        const matchEquip = ex.equipment.toLowerCase().includes(q);
        const matchCat = ex.category.toLowerCase().includes(q);
        const matchDiff = ex.difficulty.toLowerCase().includes(q);
        if (!matchName && !matchPrimary && !matchSecondary && !matchEquip && !matchCat && !matchDiff) {
          return false;
        }
      }

      return true;
    });
  }, [selectedCategory, selectedEquipment, selectedDifficulty, searchQuery, favorites]);

  // Profile-based Recommendations for Exercises
  const recommendedExercises = useMemo(() => {
    const isBeginner = profile?.fitnessLevel?.toLowerCase().includes('beginner') ?? true;
    const isHome = profile?.workoutLocation?.toLowerCase().includes('home') ?? false;

    return exerciseLibrary
      .filter((ex) => {
        if (isBeginner && ex.difficulty !== 'Beginner') return false;
        if (isHome && !ex.equipment.toLowerCase().includes('dumbbell') && !ex.equipment.toLowerCase().includes('bodyweight') && !ex.equipment.toLowerCase().includes('no equipment')) {
          return false;
        }
        return true;
      })
      .slice(0, 4);
  }, [profile]);

  // Profile-based Recommendations for Workouts
  const recommendedWorkouts = useMemo(() => {
    const userGoal = profile?.fitnessGoal || 'Build Muscle';
    const userLevel = profile?.fitnessLevel || 'Beginner';
    const isHome = profile?.workoutLocation?.toLowerCase().includes('home') ?? false;

    return [
      {
        id: 'rec-1',
        title: isHome ? '30-Minute Dumbbell Upper Body Hypertrophy' : 'Upper Body Strength & Joint Health',
        duration: '45 min',
        difficulty: userLevel,
        equipment: isHome ? 'Dumbbells' : 'Barbell, Dumbbells, Bench',
        target: 'Chest, Shoulders, Triceps, Core',
        why: `Optimized for ${userGoal.toLowerCase()} with progressive overload and joint-friendly form.`,
        exercises: [
          'Barbell Bench Press',
          'Seated Cable Row',
          'Standing Dumbbell Overhead Press',
          'Dumbbell Lateral Raise',
          'Plank',
        ],
      },
      {
        id: 'rec-2',
        title: 'Lower Body & Core Stability',
        duration: '40 min',
        difficulty: userLevel,
        equipment: isHome ? 'Dumbbells, Mat' : 'Barbell, Squat Rack, Dumbbells',
        target: 'Quadriceps, Glutes, Hamstrings, Core',
        why: 'Balances posterior chain development while reinforcing ankle and hip mobility.',
        exercises: [
          'Barbell Back Squat',
          'Romanian Deadlift',
          'Walking Dumbbell Lunges',
          'Dead Bug',
        ],
      },
      {
        id: 'rec-3',
        title: 'Full Body Athletic Mobility Reset',
        duration: '20 min',
        difficulty: 'Beginner',
        equipment: 'No Equipment (Mat)',
        target: 'Thoracic Spine, Hip Flexors, Ankles',
        why: 'Accelerates recovery, decompresses spinal vertebrae, and relieves desk tightness.',
        exercises: [
          'World’s Greatest Stretch',
          'Cat-Cow Stretch',
          '90/90 Hip Rotation',
          'Child’s Pose with Lat Reach',
        ],
      },
    ];
  }, [profile]);

  const handleStartWorkout = (workoutToStart) => {
    if (workoutToStart) {
      setActiveWorkout(workoutToStart);
    }
    setIsGymModeActive(true);
  };

  const handleFinishGymSession = (summary) => {
    setIsGymModeActive(false);
    setCompletedWorkoutSummary(summary);
  };

  const handleAddExerciseToWorkout = (exercise) => {
    const newEx = {
      id: `added-${Date.now()}`,
      name: exercise.name,
      target: exercise.primaryMuscle,
      equipment: exercise.equipment,
      sets: 3,
      reps: 10,
      weight: 0,
      restSeconds: 60,
      completedSets: 0,
      notes: Array.isArray(exercise.formTips) ? exercise.formTips[0] : 'Focus on controlled form.',
    };
    setActiveWorkout((prev) => ({
      ...prev,
      exercises: [...prev.exercises, newEx],
      totalExercises: prev.exercises.length + 1,
    }));
    setAddedToast(`Added ${exercise.name} to Today's Workout!`);
    setTimeout(() => setAddedToast(null), 3000);
  };

  const handleOpenExerciseByName = (name) => {
    const found = exerciseLibraryData.find(
      (ex) => ex.name.toLowerCase() === name.toLowerCase()
    );
    if (found) {
      setSelectedExerciseDetail(found);
    }
  };

  const handleAcceptAIWorkout = (newPlan) => {
    const customWorkout = {
      ...todaysWorkoutData,
      title: newPlan.title,
      exercises: newPlan.exercises.map((e, idx) => ({
        id: `custom-ex-${idx}`,
        name: e.name,
        target: 'Targeted Muscle Group',
        sets: e.sets,
        reps: e.reps,
        weight: parseInt(e.weight, 10) || 0,
        restSeconds: parseInt(e.rest, 10) || 60,
        notes: 'Follow controlled eccentric tempo and pause at contraction.',
      })),
    };
    setActiveWorkout(customWorkout);
    setIsGymModeActive(true);
  };

  // 4 Core Progress Pillars
  const progressPillars = [
    { name: 'Strength', value: 0 },
    { name: 'Endurance', value: 0 },
    { name: 'Mobility', value: 0 },
    { name: 'Consistency', value: 0 },
  ];

  // 3 Compact Achievements
  const achievements = [
    { icon: '🏆', title: 'First Workout', desc: 'Complete baseline fitness assessment' },
    { icon: '🔥', title: '3 Day Streak', desc: 'Train 3 consecutive planned days' },
    { icon: '⚡', title: '500 XP', desc: 'Reach 500 fitness experience points' },
  ];

  return (
    <div className={styles.page}>
      {/* Toast Notification */}
      {addedToast && (
        <div className={styles.toastNotification}>
          <Check size={16} />
          <span>{addedToast}</span>
        </div>
      )}

      {/* ── 1. Header ── */}
      <div className={styles.headerWrapper}>
        <div className={styles.headerInfo}>
          <div className={styles.titleRow}>
            <h2 className={styles.pageTitle}>Fitness</h2>
            <span className={styles.levelBadge}>
              <Award size={13} />
              {fitnessProfile.level}
            </span>
          </div>
          <p className={styles.pageDesc}>
            Build strength, energy, mobility, and consistency. Train smarter with structured progressive overload and posture calibration.
          </p>
        </div>

        <div className={styles.headerActions}>
          <button
            type="button"
            className={styles.btnSecondary}
            onClick={() => setShowAIGenerator(true)}
          >
            <Sparkles size={15} />
            Generate Workout
          </button>
          <button
            type="button"
            className={styles.btnPrimary}
            onClick={() => handleStartWorkout(activeWorkout)}
          >
            <Dumbbell size={16} />
            Start Workout
          </button>
        </div>
      </div>

      {/* ── 2. Simplified 5-Tab Navigation ── */}
      <div className={styles.navTabs}>
        <button
          type="button"
          className={`${styles.tabBtn} ${activeTab === 'overview' ? styles.tabBtnActive : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          <Activity size={15} />
          Overview
        </button>
        <button
          type="button"
          className={`${styles.tabBtn} ${activeTab === 'workouts' ? styles.tabBtnActive : ''}`}
          onClick={() => setActiveTab('workouts')}
        >
          <Calendar size={15} />
          Workouts
        </button>
        <button
          type="button"
          className={`${styles.tabBtn} ${activeTab === 'exercises' ? styles.tabBtnActive : ''}`}
          onClick={() => setActiveTab('exercises')}
        >
          <Search size={15} />
          Exercises ({exerciseLibrary.length})
        </button>
        <button
          type="button"
          className={`${styles.tabBtn} ${activeTab === 'mobility' ? styles.tabBtnActive : ''}`}
          onClick={() => setActiveTab('mobility')}
        >
          <Heart size={15} />
          Mobility
        </button>
        <button
          type="button"
          className={`${styles.tabBtn} ${activeTab === 'coach' ? styles.tabBtnActive : ''}`}
          onClick={() => setActiveTab('coach')}
        >
          <Sparkles size={15} />
          Coach
        </button>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          TAB 1: OVERVIEW (Main Dashboard)
      ══════════════════════════════════════════════════════════════ */}
      {activeTab === 'overview' && (
        <>
          {/* ── 3. Top Summary: 4 Compact KPI Cards ── */}
          <div className={styles.topSummaryGrid}>
            <div className={styles.summaryCard}>
              <div className={`${styles.summaryIconBox} ${styles.info}`}>
                <Target size={20} />
              </div>
              <div className={styles.summaryContent}>
                <span className={styles.summaryLabel}>Fitness Score</span>
                <span className={styles.summaryValue}>{fitnessScoreData.currentScore} / 100</span>
              </div>
            </div>

            <div className={styles.summaryCard}>
              <div className={styles.summaryIconBox}>
                <Award size={20} />
              </div>
              <div className={styles.summaryContent}>
                <span className={styles.summaryLabel}>Fitness Level</span>
                <span className={styles.summaryValue}>Level 1</span>
              </div>
            </div>

            <div className={styles.summaryCard}>
              <div className={`${styles.summaryIconBox} ${styles.success}`}>
                <Calendar size={20} />
              </div>
              <div className={styles.summaryContent}>
                <span className={styles.summaryLabel}>Weekly Goal</span>
                <span className={styles.summaryValue}>
                  {fitnessProfile.weeklyWorkoutsCompleted} / {fitnessProfile.weeklyWorkoutsTarget} Workouts
                </span>
              </div>
            </div>

            <div className={styles.summaryCard}>
              <div className={`${styles.summaryIconBox} ${styles.warning}`}>
                <Flame size={20} />
              </div>
              <div className={styles.summaryContent}>
                <span className={styles.summaryLabel}>Current Streak</span>
                <span className={styles.summaryValue}>{fitnessProfile.currentStreak} Days</span>
              </div>
            </div>
          </div>

          {/* ── 4. Main Focus: Today's Workout Hero Card ── */}
          <div className={styles.todayWorkoutHeroCard}>
            <div className={styles.heroHeader}>
              <div>
                <div className={styles.heroTitleRow}>
                  <div className={styles.heroIconBadge}>
                    <Dumbbell size={16} />
                  </div>
                  <span className={styles.heroCategoryBadge}>{activeWorkout.category}</span>
                </div>
                <h3 className={styles.heroWorkoutTitle}>{activeWorkout.title}</h3>
                <div className={styles.heroMetaRow}>
                  <span>
                    <Clock size={13} />
                    {activeWorkout.duration}
                  </span>
                  <span>
                    <Layers size={13} />
                    {activeWorkout.exercises?.length || 8} exercises
                  </span>
                  <span>
                    <Zap size={13} />
                    Moderate Intensity
                  </span>
                </div>
              </div>

              <button
                type="button"
                className={styles.heroStartBtn}
                onClick={() => handleStartWorkout(activeWorkout)}
              >
                <Play size={18} fill="currentColor" />
                Start Workout
              </button>
            </div>

            <p className={styles.heroDesc}>
              Target compound pressing power, posture reinforcement, and upper-body hypertrophy with clean mechanics.
            </p>

            {/* Compact 4-Exercise Preview */}
            <div className={styles.heroExerciseList}>
              {activeWorkout.exercises?.slice(0, 4).map((ex, idx) => (
                <div key={ex.id || idx} className={styles.heroExerciseItem}>
                  <span className={styles.heroExNum}>0{idx + 1}</span>
                  <div className={styles.heroExInfo}>
                    <span className={styles.heroExName}>{ex.name}</span>
                    <span className={styles.heroExSets}>
                      {ex.sets} sets × {ex.reps} reps
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── 5. Bottom Row: 4-Pillar Progress & AI Coach Card ── */}
          <div className={styles.bottomTwoColGrid}>
            {/* Progress Card */}
            <div className={styles.cardSection}>
              <div className={styles.cardHeader}>
                <div className={styles.cardHeaderLeft}>
                  <TrendingUp size={18} color="var(--color-primary)" />
                  <div>
                    <h3 className={styles.cardTitle}>Fitness Progress</h3>
                    <span style={{ fontSize: '11px', color: 'var(--color-gray-500)' }}>
                      Overall score breakdown across 4 pillars
                    </span>
                  </div>
                </div>
                <span className={styles.cardBadge}>0% Overall</span>
              </div>

              <div className={styles.pillarsList}>
                {progressPillars.map((p) => (
                  <div key={p.name} className={styles.pillarRow}>
                    <div className={styles.pillarMeta}>
                      <span className={styles.pillarName}>{p.name}</span>
                      <span className={styles.pillarVal}>{p.value}%</span>
                    </div>
                    <div className={styles.pillarTrack}>
                      <div className={styles.pillarFill} style={{ width: `${p.value}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Coach Card */}
            <div className={styles.cardSection}>
              <div className={styles.cardHeader}>
                <div className={styles.cardHeaderLeft}>
                  <Sparkles size={18} color="var(--color-primary)" />
                  <div>
                    <h3 className={styles.cardTitle}>ELEVATE AI Coach</h3>
                    <span style={{ fontSize: '11px', color: 'var(--color-gray-500)' }}>
                      Daily intelligent training guidance
                    </span>
                  </div>
                </div>
                <span className={styles.cardBadgeActive}>Personalized</span>
              </div>

              <p className={styles.aiCoachMessage}>
                &ldquo;Ready to begin your journey! Start with Today&apos;s Workout or ask any questions in the Coach tab.&rdquo;
              </p>
              <p className={styles.aiCoachWhy}>
                Consistent workouts build strong habits and executive posture.
              </p>

              <button
                type="button"
                className={styles.btnSecondary}
                style={{ width: '100%', justifyContent: 'center' }}
                onClick={() => setActiveTab('coach')}
              >
                <Sparkles size={15} />
                Ask Fitness Coach
              </button>
            </div>
          </div>

          {/* ── 6. Compact Achievements Section ── */}
          <div className={styles.achievementsCard}>
            <div className={styles.cardHeader}>
              <div className={styles.cardHeaderLeft}>
                <Award size={18} color="var(--color-warning)" />
                <h3 className={styles.cardTitle}>Recent Milestones</h3>
              </div>
              <span className={styles.cardBadge}>0 / 12 Unlocked</span>
            </div>

            <div className={styles.achievementsGrid}>
              {achievements.map((ach) => (
                <div key={ach.title} className={styles.achievementItem}>
                  <span className={styles.achievementIcon}>{ach.icon}</span>
                  <div className={styles.achievementInfo}>
                    <span className={styles.achievementTitle}>{ach.title}</span>
                    <span className={styles.achievementDesc}>{ach.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* ══════════════════════════════════════════════════════════════
          TAB 2: WORKOUTS (Personalized, Action-Focused & Scheduled)
      ══════════════════════════════════════════════════════════════ */}
      {activeTab === 'workouts' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* ── SECTION 1: 🎯 TODAY'S WORKOUT (Main Hero Focus) ── */}
          <div className={styles.todayWorkoutHeroCard}>
            <div className={styles.heroHeader}>
              <div>
                <div className={styles.heroTitleRow}>
                  <span className={styles.todayFocusBadge}>🎯 TODAY&apos;S WORKOUT</span>
                  <span className={styles.heroCategoryBadge}>{activeWorkout.category}</span>
                </div>
                <h3 className={styles.heroWorkoutTitle}>{activeWorkout.title}</h3>
                <div className={styles.heroMetaRow}>
                  <span>
                    <Clock size={13} />
                    {activeWorkout.duration}
                  </span>
                  <span>
                    <Layers size={13} />
                    {activeWorkout.exercises?.length || 6} exercises
                  </span>
                  <span>
                    <Award size={13} />
                    {profile?.fitnessLevel || 'Beginner'}
                  </span>
                </div>
              </div>

              <div className={styles.heroActionBtns}>
                <button
                  type="button"
                  className={styles.heroStartBtn}
                  onClick={() => handleStartWorkout(activeWorkout)}
                >
                  <Play size={18} fill="currentColor" />
                  Start Workout
                </button>
              </div>
            </div>

            {/* Target Muscles Strip */}
            <div className={styles.todayTargetStrip}>
              <span className={styles.todayTargetLabel}>Target:</span>
              <span className={styles.todayTargetVal}>Chest • Shoulders • Triceps • Core</span>
            </div>

            {/* Why Today? Insight Box */}
            <div className={styles.whyTodayBox}>
              <Info size={15} className={styles.whyTodayIcon} />
              <div className={styles.whyTodayText}>
                <span className={styles.whyTodayTitle}>Why today?</span>
                <p className={styles.whyTodayDesc}>
                  &ldquo;Based on your {profile?.fitnessGoal || 'muscle gain'} goal and recent training history, this session focuses on upper-body compound mechanics and posture stability with fresh muscle fibers.&rdquo;
                </p>
              </div>
            </div>

            {/* View Exercises Toggle Button */}
            <div className={styles.viewExToggleRow}>
              <button
                type="button"
                className={styles.toggleExBtn}
                onClick={() => setShowTodayExercises((prev) => !prev)}
              >
                <span>{showTodayExercises ? 'Hide Exercises' : `View All ${activeWorkout.exercises?.length || 6} Exercises`}</span>
                {showTodayExercises ? <ChevronDown size={15} /> : <ChevronRight size={15} />}
              </button>
            </div>

            {/* Expanded Detailed Exercise List */}
            {showTodayExercises && (
              <div className={styles.workoutExDetailList}>
                {activeWorkout.exercises?.map((ex, idx) => (
                  <div key={ex.id || idx} className={styles.workoutExRow}>
                    <span className={styles.workoutExIndex}>0{idx + 1}</span>
                    <div className={styles.workoutExMain}>
                      <span className={styles.workoutExName}>{ex.name}</span>
                      <span className={styles.workoutExTarget}>{ex.target}</span>
                    </div>
                    <div className={styles.workoutExSetsReps}>
                      {ex.sets} sets × {ex.reps} reps
                    </div>
                    <button
                      type="button"
                      className={styles.btnViewTutorial}
                      onClick={() => handleOpenExerciseByName(ex.name)}
                      title="View technique tutorial and video"
                    >
                      <Play size={11} fill="currentColor" />
                      View Form &amp; Video
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ── SECTION 2: THIS WEEK (Compact Progress & Streak Bar) ── */}
          <div className={styles.thisWeekCard}>
            <div className={styles.thisWeekHead}>
              <div className={styles.thisWeekTitleRow}>
                <Calendar size={16} color="var(--color-primary)" />
                <span className={styles.thisWeekHeading}>THIS WEEK</span>
              </div>
              <span className={styles.thisWeekCount}>
                {fitnessProfile.weeklyWorkoutsCompleted} / {fitnessProfile.weeklyWorkoutsTarget} Workouts Completed
              </span>
            </div>

            <div className={styles.thisWeekTrack}>
              <div
                className={styles.thisWeekFill}
                style={{
                  width: `${Math.min(
                    100,
                    (fitnessProfile.weeklyWorkoutsCompleted / fitnessProfile.weeklyWorkoutsTarget) * 100
                  )}%`,
                }}
              />
            </div>

            <div className={styles.thisWeekBadges}>
              <div className={styles.thisWeekBadgeItem}>
                <Flame size={14} color="#f59e0b" />
                <span>{fitnessProfile.currentStreak} Day Streak</span>
              </div>
              <div className={styles.thisWeekBadgeItem}>
                <Zap size={14} color="#8b5cf6" />
                <span>+180 XP Earned</span>
              </div>
              <div className={styles.thisWeekBadgeItem}>
                <Award size={14} color="#10b981" />
                <span>{fitnessProfile.weeklyWorkoutsTarget - fitnessProfile.weeklyWorkoutsCompleted} workouts left</span>
              </div>
            </div>
          </div>

          {/* ── SECTION 3: WEEKLY WORKOUT SCHEDULE (Clickable Interactive Days) ── */}
          <div className={styles.cardSection}>
            <div className={styles.cardHeader}>
              <div className={styles.cardHeaderLeft}>
                <Calendar size={18} color="var(--color-primary)" />
                <div>
                  <h3 className={styles.cardTitle}>Weekly Workout Schedule</h3>
                  <span style={{ fontSize: '11px', color: 'var(--color-gray-500)' }}>
                    Periodized training with built-in active recovery (Click any day to inspect &amp; start)
                  </span>
                </div>
              </div>
              <button
                type="button"
                className={styles.btnSecondary}
                onClick={() => setShowAIGenerator(true)}
              >
                <Sparkles size={14} />
                AI Generate Routine
              </button>
            </div>

            <div className={styles.weeklyScheduleGrid}>
              {weeklyPlannerData.map((d) => {
                const isCompleted = d.status === 'completed';
                const isToday = d.status === 'today';
                const isRest = d.status === 'rest';

                return (
                  <div
                    key={d.day}
                    className={`${styles.dayCard} ${
                      isToday ? styles.dayCardToday : ''
                    } ${isCompleted ? styles.dayCardCompleted : ''} ${
                      isRest ? styles.dayCardRest : ''
                    }`}
                    onClick={() => setSelectedDayForModal(d)}
                    title={`Click to view ${d.workout} (${d.day})`}
                  >
                    <div className={styles.dayCardTop}>
                      <span className={styles.dayName}>{d.day.slice(0, 3)}</span>
                      {isCompleted && <span className={styles.badgeCompletedSmall}>✓ Done</span>}
                      {isToday && <span className={styles.badgeTodaySmall}>● Today</span>}
                      {isRest && <span className={styles.badgeRestSmall}>🧘 Rest</span>}
                      {d.status === 'planned' && <span className={styles.badgePlannedSmall}>○ Next</span>}
                    </div>

                    <span className={styles.dayWorkoutName}>{d.workout}</span>
                    <span className={styles.dayDuration}>{d.duration}</span>

                    <span className={styles.dayClickHint}>View Day →</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── SECTION 4: QUICK HOME & MINIMAL EQUIPMENT ROUTINES ── */}
          <div className={styles.cardSection}>
            <div className={styles.cardHeader}>
              <div className={styles.cardHeaderLeft}>
                <Flame size={18} color="var(--color-warning)" />
                <div>
                  <h3 className={styles.cardTitle}>🔥 Quick Home &amp; Minimal Equipment</h3>
                  <span style={{ fontSize: '11px', color: 'var(--color-gray-500)' }}>
                    Fast, effective routines for travel or training with minimal equipment
                  </span>
                </div>
              </div>
            </div>

            <div className={styles.twoColGrid}>
              {homeWorkoutRoutines.map((hw) => (
                <div key={hw.id} className={styles.libraryCard} style={{ cursor: 'default' }}>
                  <div className={styles.libCardHead}>
                    <span className={styles.categoryTag}>{hw.equipment}</span>
                    <span className={styles.diffBadge}>{hw.duration}</span>
                  </div>
                  <h4 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-gray-900)', margin: '2px 0' }}>
                    {hw.title}
                  </h4>
                  <p style={{ fontSize: '12px', color: 'var(--color-gray-500)', margin: 0 }}>
                    Target: {hw.target} • {hw.exercisesCount || hw.exercises.length} exercises
                  </p>
                  <button
                    type="button"
                    className={styles.btnPrimary}
                    style={{ marginTop: 'auto', alignSelf: 'flex-start', fontSize: '12px', padding: '6px 14px' }}
                    onClick={() => handleStartWorkout({
                      id: hw.id,
                      title: hw.title,
                      duration: hw.duration,
                      exercises: hw.exercises.map((name, i) => ({
                        id: `hw-ex-${i}`,
                        name,
                        target: hw.target,
                        sets: 3,
                        reps: 12,
                        weight: 0,
                        restSeconds: 45,
                        notes: 'Focus on full range of motion.',
                      })),
                    })}
                  >
                    <Play size={12} fill="currentColor" />
                    Start Routine
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* ── SECTION 5: ✨ RECOMMENDED FOR YOU (Profile-Tailored) ── */}
          <div className={styles.cardSection}>
            <div className={styles.cardHeader}>
              <div className={styles.cardHeaderLeft}>
                <Sparkles size={18} color="var(--color-primary)" />
                <div>
                  <h3 className={styles.cardTitle}>✨ Recommended for You</h3>
                  <span style={{ fontSize: '11px', color: 'var(--color-gray-500)' }}>
                    Personalized based on your {profile?.fitnessGoal || 'fitness'} goal &amp; {profile?.fitnessLevel || 'starter'} level
                  </span>
                </div>
              </div>
            </div>

            <div className={styles.twoColGrid}>
              {recommendedWorkouts.map((rec) => (
                <div key={rec.id} className={styles.libraryCard} style={{ cursor: 'default' }}>
                  <div className={styles.libCardHead}>
                    <span className={styles.categoryTag}>{rec.equipment}</span>
                    <span className={styles.diffBadge}>{rec.duration}</span>
                  </div>
                  <h4 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-gray-900)', margin: '2px 0' }}>
                    {rec.title}
                  </h4>
                  <p style={{ fontSize: '12px', color: 'var(--color-gray-600)', margin: '2px 0 6px', lineHeight: 1.4 }}>
                    {rec.why}
                  </p>
                  <button
                    type="button"
                    className={styles.btnPrimary}
                    style={{ marginTop: 'auto', alignSelf: 'flex-start', fontSize: '12px', padding: '6px 14px' }}
                    onClick={() => handleStartWorkout({
                      id: rec.id,
                      title: rec.title,
                      duration: rec.duration,
                      exercises: rec.exercises.map((name, i) => ({
                        id: `rec-ex-${i}`,
                        name,
                        target: rec.target,
                        sets: 3,
                        reps: 10,
                        weight: rec.equipment.includes('Barbell') ? 40 : 12,
                        restSeconds: 60,
                        notes: 'Focus on perfect form.',
                      })),
                    })}
                  >
                    <Play size={12} fill="currentColor" />
                    Start Workout
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════
          TAB 3: EXERCISES (Searchable Library with YouTube Video Tutorials)
      ══════════════════════════════════════════════════════════════ */}
      {activeTab === 'exercises' && (
        <div className={styles.cardSection}>
          <div className={styles.cardHeader}>
            <div className={styles.cardHeaderLeft}>
              <Search size={18} color="var(--color-primary)" />
              <div>
                <h3 className={styles.cardTitle}>Exercise Library</h3>
                <span style={{ fontSize: '11px', color: 'var(--color-gray-500)' }}>
                  Video tutorials, anatomy cues, and step-by-step form guides
                </span>
              </div>
            </div>
            <span className={styles.cardBadge}>{filteredExercises.length} Exercises</span>
          </div>

          {/* Search Input & Secondary Filters Row */}
          <div className={styles.searchFilterGroup}>
            <div className={styles.searchInputWrapper}>
              <Search size={16} className={styles.searchIcon} />
              <input
                type="text"
                className={styles.searchInput}
                placeholder="Search exercises by name, muscle, equipment (e.g. chest, dumbbell, beginner)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className={styles.filterDropdownsRow}>
              {/* Equipment Filter */}
              <select
                className={styles.filterSelect}
                value={selectedEquipment}
                onChange={(e) => setSelectedEquipment(e.target.value)}
              >
                {equipmentOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>

              {/* Difficulty Filter */}
              <select
                className={styles.filterSelect}
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
              >
                {difficultyOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Category Horizontal Pills */}
          <div className={styles.categoryPillRow}>
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`${styles.catPill} ${
                  selectedCategory === cat ? styles.catPillActive : ''
                }`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* ✨ Recommended for You Section (Shown when no search/filters active) */}
          {selectedCategory === 'All' && !searchQuery.trim() && selectedEquipment === 'All Equipment' && selectedDifficulty === 'All Difficulties' && (
            <div className={styles.recommendedSection}>
              <div className={styles.recommendedHeader}>
                <Sparkles size={15} color="var(--color-primary)" />
                <span className={styles.recommendedTitle}>Recommended for You</span>
                <span className={styles.recommendedSub}>Based on your ELEVATE profile</span>
              </div>
              <div className={styles.recommendedGrid}>
                {recommendedExercises.map((ex) => (
                  <div
                    key={`rec-${ex.id}`}
                    className={styles.recommendedCard}
                    onClick={() => setSelectedExerciseDetail(ex)}
                  >
                    <div className={styles.libCardHead}>
                      <span>{ex.category}</span>
                      <span className={styles.diffBadge}>{ex.difficulty}</span>
                    </div>
                    <span className={styles.libCardTitle}>{ex.name}</span>
                    <span className={styles.libCardMuscle}>{ex.primaryMuscle}</span>
                    <div className={styles.libCardFoot}>
                      <span>{ex.equipment}</span>
                      <span className={styles.watchLink}>
                        <Play size={11} fill="currentColor" />
                        Watch Tutorial →
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Main Library Grid */}
          <div className={styles.libraryGrid}>
            {filteredExercises.map((ex) => {
              const isFav = favorites.includes(ex.id);
              return (
                <div
                  key={ex.id}
                  className={styles.libraryCard}
                  onClick={() => setSelectedExerciseDetail(ex)}
                >
                  <div className={styles.libCardHead}>
                    <span className={styles.categoryTag}>{ex.category}</span>
                    <div className={styles.cardHeadRight}>
                      <span className={styles.diffBadge}>{ex.difficulty}</span>
                      <button
                        type="button"
                        className={styles.cardHeartBtn}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(ex.id);
                        }}
                        title={isFav ? 'Remove from favorites' : 'Add to favorites'}
                      >
                        <Heart
                          size={14}
                          fill={isFav ? '#ef4444' : 'none'}
                          color={isFav ? '#ef4444' : '#9ca3af'}
                        />
                      </button>
                    </div>
                  </div>

                  <span className={styles.libCardTitle}>{ex.name}</span>
                  <span className={styles.libCardMuscle}>{ex.primaryMuscle}</span>

                  <div className={styles.libCardFoot}>
                    <span className={styles.equipmentTag}>{ex.equipment}</span>
                    <span className={styles.watchLink}>
                      <Play size={11} fill="currentColor" />
                      Watch Tutorial →
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredExercises.length === 0 && (
            <div className={styles.emptyStateBox}>
              <Search size={32} color="var(--color-gray-400)" />
              <h4 style={{ margin: '8px 0 4px', color: 'var(--color-gray-800)' }}>No exercises found</h4>
              <p style={{ fontSize: '12px', color: 'var(--color-gray-500)', margin: 0 }}>
                Try adjusting your search query or clearing category and equipment filters.
              </p>
              <button
                type="button"
                className={styles.btnSecondary}
                style={{ marginTop: '12px' }}
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                  setSelectedEquipment('All Equipment');
                  setSelectedDifficulty('All Difficulties');
                }}
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════
          TAB 4: MOBILITY (Posture & Joint Health)
      ══════════════════════════════════════════════════════════════ */}
      {activeTab === 'mobility' && (
        <div className={styles.cardSection}>
          <div className={styles.cardHeader}>
            <div className={styles.cardHeaderLeft}>
              <Heart size={18} color="var(--color-success)" />
              <div>
                <h3 className={styles.cardTitle}>Mobility &amp; Posture Routines</h3>
                <span style={{ fontSize: '11px', color: 'var(--color-gray-500)' }}>
                  Decompress spine, open tight hips, and reinforce executive presence
                </span>
              </div>
            </div>
            <span className={styles.cardBadge}>Posture Health</span>
          </div>

          <div className={styles.twoColGrid}>
            {mobilityRoutines.map((mob) => (
              <div key={mob.id} className={styles.libraryCard} style={{ cursor: 'default' }}>
                <div className={styles.libCardHead}>
                  <span>{mob.target}</span>
                  <span>{mob.duration}</span>
                </div>
                <h4 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-gray-900)' }}>
                  {mob.title}
                </h4>
                <p style={{ fontSize: '11px', color: 'var(--color-gray-500)' }}>Benefit: {mob.benefit}</p>
                <button
                  type="button"
                  className={styles.btnSecondary}
                  style={{ marginTop: 'auto', alignSelf: 'flex-start', fontSize: '12px', padding: '6px 14px' }}
                  onClick={() => handleStartWorkout({
                    id: mob.id,
                    title: mob.title,
                    duration: mob.duration,
                    exercises: mob.exercises.map((name, i) => ({
                      id: `mob-ex-${i}`,
                      name,
                      target: mob.target,
                      sets: 2,
                      reps: 10,
                      weight: 0,
                      restSeconds: 30,
                      notes: 'Gentle continuous breathing.',
                    })),
                  })}
                >
                  <Play size={12} fill="currentColor" />
                  Start Mobility Flow
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════
          TAB 5: COACH (Natural Conversational AI Fitness Coach)
      ══════════════════════════════════════════════════════════════ */}
      {activeTab === 'coach' && <AIFitnessCoachChat />}

      {/* ══════════════════════════════════════════════════════════════
          MODALS
      ══════════════════════════════════════════════════════════════ */}
      {isGymModeActive && (
        <GymModeModal
          workout={activeWorkout}
          onFinish={handleFinishGymSession}
          onClose={() => setIsGymModeActive(false)}
        />
      )}

      {showAIGenerator && (
        <AIWorkoutGeneratorModal
          profile={profile}
          onAccept={handleAcceptAIWorkout}
          onClose={() => setShowAIGenerator(false)}
        />
      )}

      {selectedDayForModal && (
        <DayWorkoutModal
          dayData={selectedDayForModal}
          onStartWorkout={handleStartWorkout}
          onOpenExerciseDetail={(ex) => setSelectedExerciseDetail(ex)}
          onClose={() => setSelectedDayForModal(null)}
        />
      )}

      {selectedExerciseDetail && (
        <ExerciseDetailModal
          exercise={selectedExerciseDetail}
          isFavorite={favorites.includes(selectedExerciseDetail.id)}
          onToggleFavorite={toggleFavorite}
          onAddToWorkout={handleAddExerciseToWorkout}
          onSelectExercise={(rel) => setSelectedExerciseDetail(rel)}
          onClose={() => setSelectedExerciseDetail(null)}
        />
      )}

      {completedWorkoutSummary && (
        <WorkoutSummaryModal
          summary={completedWorkoutSummary}
          onClose={() => setCompletedWorkoutSummary(null)}
        />
      )}
    </div>
  );
}
