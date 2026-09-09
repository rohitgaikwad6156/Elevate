# ELEVATE Firestore data model

All user-owned records derive `userId` from Firebase Authentication (`auth.currentUser.uid`).
Caller-supplied `userId`, `createdAt`, and `updatedAt` values are stripped by the shared database service.

## Collections

### users/{uid}
User/profile-level data only.

Typical fields:
- userId
- email
- displayName
- photoURL
- profile
- aiSettings
- notifications
- schemaVersion
- createdAt
- updatedAt

### tasks/{taskId}
- userId
- title
- description
- category
- priority
- dueDate
- startTime
- duration
- completed
- createdAt
- updatedAt

### goals/{goalId}
- userId
- title
- category
- targetDate
- progress
- status
- createdAt
- updatedAt

Existing Daily Goals-specific fields such as `date`, `startDate`, `isRecurring`, `completedDates`, `isPriority`, and `estimatedTime` are preserved for backwards compatibility.

### schedules/{scheduleId}
- userId
- date
- tasks
- generatedByAI
- createdAt
- updatedAt

### habits/{habitId}
- userId
- title
- category
- frequency
- target
- streak
- active
- completionDates
- createdAt
- updatedAt

### english_sessions/{sessionId}
- userId
- type
- startedAt
- completedAt
- duration
- score
- topic
- transcript
- feedback
- metadata
- createdAt
- updatedAt

## Security

`firestore.rules` restricts user-owned records to the authenticated Firebase UID. The rules file must be deployed to the Firebase project before these protections are live in production.
