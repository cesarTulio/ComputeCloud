'use strict';

const STORAGE_KEYS = {
  COMPLETED_WEEKS: 'acn01_completed_weeks',
  QUIZ_RESULTS: 'acn01_quiz_results',
  BADGES: 'acn01_badges',
  STUDY_MINUTES: 'acn01_study_minutes',
  NOTES: 'acn01_notes',
  CURRENT_STUDENT: 'acn01_current_student',
  STUDENTS_LIST: 'acn01_students_list',
};

const getCurrentStudent = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.CURRENT_STUDENT);
    return data ? JSON.parse(data) : null;
  } catch (e) {
    return null;
  }
};

const setCurrentStudent = (profile) => {
  localStorage.setItem(STORAGE_KEYS.CURRENT_STUDENT, JSON.stringify(profile));
  const students = getStudentsList();
  const index = students.findIndex((s) => s.id === profile.id || s.email === profile.email);
  if (index >= 0) {
    students[index] = { ...students[index], ...profile };
  } else {
    students.push(profile);
  }
  localStorage.setItem(STORAGE_KEYS.STUDENTS_LIST, JSON.stringify(students));
  return profile;
};

const getStudentsList = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.STUDENTS_LIST);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    return [];
  }
};

const loadSampleStudents = (sampleStudents) => {
  const currentStudents = getStudentsList();
  const merged = [...currentStudents];
  sampleStudents.forEach((sample) => {
    if (!merged.some((s) => s.name === sample.name)) {
      merged.push({
        id: sample.id ? sample.id.toString() : Date.now().toString(),
        name: sample.name,
        email: sample.email,
        registeredAt: new Date().toISOString(),
      });
    }
  });
  localStorage.setItem(STORAGE_KEYS.STUDENTS_LIST, JSON.stringify(merged));
  return merged;
};

const getCompletedWeeks = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.COMPLETED_WEEKS);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    return [];
  }
};

const toggleWeekCompleted = (weekNumber) => {
  const weeks = getCompletedWeeks();
  const exists = weeks.includes(weekNumber);
  const updated = exists
    ? weeks.filter((w) => w !== weekNumber)
    : [...weeks, weekNumber];

  localStorage.setItem(STORAGE_KEYS.COMPLETED_WEEKS, JSON.stringify(updated));
  checkAndUnlockBadges(updated, getQuizResults());
  return updated;
};

const getQuizResults = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.QUIZ_RESULTS);
    return data ? JSON.parse(data) : {};
  } catch (e) {
    return {};
  }
};

const saveQuizResult = (result) => {
  const results = getQuizResults();
  results[result.unitId] = result;
  localStorage.setItem(STORAGE_KEYS.QUIZ_RESULTS, JSON.stringify(results));

  checkAndUnlockBadges(getCompletedWeeks(), results);
  return results;
};

const getBadges = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.BADGES);
    if (!data) return window.INITIAL_BADGES;
    const storedBadges = JSON.parse(data);
    return window.INITIAL_BADGES.map((b) => {
      const match = storedBadges.find((sb) => sb.id === b.id);
      return match || b;
    });
  } catch (e) {
    return window.INITIAL_BADGES;
  }
};

const unlockBadge = (badgeId) => {
  const badges = getBadges();
  const updated = badges.map((b) => {
    if (b.id === badgeId && !b.isUnlocked) {
      return {
        ...b,
        isUnlocked: true,
        unlockedAt: new Date().toISOString(),
      };
    }
    return b;
  });
  localStorage.setItem(STORAGE_KEYS.BADGES, JSON.stringify(updated));
  return updated;
};

const checkAndUnlockBadges = (completedWeeks, quizResults) => {
  if ([1, 2, 3, 4].every((w) => completedWeeks.includes(w))) {
    unlockBadge('badge-unit-1');
  }
  if (quizResults[1]?.score === 5) {
    unlockBadge('badge-quiz-1');
  }

  if ([5, 6, 7, 8].every((w) => completedWeeks.includes(w))) {
    unlockBadge('badge-unit-2');
  }
  if (quizResults[2]?.score === 5) {
    unlockBadge('badge-quiz-2');
  }

  if ([9, 10, 11, 12].every((w) => completedWeeks.includes(w))) {
    unlockBadge('badge-unit-3');
  }
  if (quizResults[3]?.score === 5) {
    unlockBadge('badge-quiz-3');
  }

  if ([13, 14, 15, 16].every((w) => completedWeeks.includes(w))) {
    unlockBadge('badge-unit-4');
  }
  if (quizResults[4]?.score === 5) {
    unlockBadge('badge-quiz-4');
  }
};

const getStudyMinutes = () => {
  try {
    const val = localStorage.getItem(STORAGE_KEYS.STUDY_MINUTES);
    return val ? parseInt(val, 10) : 45;
  } catch (e) {
    return 45;
  }
};

const addStudyMinutes = (mins) => {
  const current = getStudyMinutes();
  const updated = current + mins;
  localStorage.setItem(STORAGE_KEYS.STUDY_MINUTES, updated.toString());
  return updated;
};

const resetAllProgress = () => {
  localStorage.removeItem(STORAGE_KEYS.COMPLETED_WEEKS);
  localStorage.removeItem(STORAGE_KEYS.QUIZ_RESULTS);
  localStorage.removeItem(STORAGE_KEYS.BADGES);
  localStorage.removeItem(STORAGE_KEYS.STUDY_MINUTES);
  localStorage.removeItem(STORAGE_KEYS.NOTES);
};

if (typeof window !== 'undefined') {
  window.Storage = {
    getCurrentStudent,
    setCurrentStudent,
    getStudentsList,
    loadSampleStudents,
    getCompletedWeeks,
    toggleWeekCompleted,
    getQuizResults,
    saveQuizResult,
    getBadges,
    unlockBadge,
    checkAndUnlockBadges,
    getStudyMinutes,
    addStudyMinutes,
    resetAllProgress,
  };
}
