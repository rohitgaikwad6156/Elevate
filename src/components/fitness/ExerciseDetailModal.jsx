import {
  X,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  Layers,
  Dumbbell,
  Plus,
  Heart,
  Play,
  Lightbulb,
  ExternalLink,
} from 'lucide-react';
import { exerciseLibraryData } from '../../data/exerciseLibraryData';
import styles from './ExerciseDetailModal.module.css';

export default function ExerciseDetailModal({
  exercise,
  isFavorite,
  onToggleFavorite,
  onAddToWorkout,
  onSelectExercise,
  onClose,
}) {
  if (!exercise) return null;

  // Find related exercise objects if available
  const relatedExercises = (exercise.relatedExerciseIds || [])
    .map((id) => exerciseLibraryData.find((ex) => ex.id === id))
    .filter(Boolean);

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.container} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className={styles.header}>
          <div>
            <div className={styles.badgeRow}>
              <span className={styles.categoryBadge}>{exercise.category}</span>
              <span className={styles.difficultyBadge}>{exercise.difficulty}</span>
            </div>
            <h2 className={styles.title}>{exercise.name}</h2>
            <p className={styles.subtitle}>
              {exercise.equipment} • {exercise.primaryMuscle}
            </p>
          </div>
          <div className={styles.headerBtns}>
            <button
              type="button"
              className={`${styles.favBtn} ${isFavorite ? styles.favBtnActive : ''}`}
              onClick={() => onToggleFavorite && onToggleFavorite(exercise.id)}
              title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              <Heart size={16} fill={isFavorite ? '#ef4444' : 'none'} color={isFavorite ? '#ef4444' : 'currentColor'} />
            </button>
            <button type="button" className={styles.closeBtn} onClick={onClose}>
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className={styles.body}>
          {/* 1. YouTube Video Embed Player */}
          {exercise.youtubeVideoId ? (
            <div className={styles.videoContainer}>
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${exercise.youtubeVideoId}?rel=0&modestbranding=1`}
                title={`${exercise.name} Technique Tutorial`}
                className={styles.videoIframe}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : (
            <div className={styles.videoPlaceholder}>
              <Play size={28} />
              <span>Video tutorial coming soon.</span>
            </div>
          )}

          {/* 2. Muscle & Equipment Anatomy Strip */}
          <div className={styles.anatomyGrid}>
            <div className={styles.anatomyCard}>
              <span className={styles.anatomyLabel}>Primary Muscle</span>
              <span className={styles.anatomyValuePrimary}>{exercise.primaryMuscle}</span>
            </div>
            {exercise.secondaryMuscles && (
              <div className={styles.anatomyCard}>
                <span className={styles.anatomyLabel}>Secondary Muscles</span>
                <span className={styles.anatomyValueSecondary}>{exercise.secondaryMuscles}</span>
              </div>
            )}
            <div className={styles.anatomyCard}>
              <span className={styles.anatomyLabel}>Equipment Required</span>
              <span className={styles.anatomyValue}>{exercise.equipment}</span>
            </div>
          </div>

          {/* 3. Recommended Parameters */}
          {exercise.recommendedSets && (
            <div className={styles.recBox}>
              <span className={styles.recLabel}>Recommended Parameters:</span>
              <span className={styles.recVal}>{exercise.recommendedSets}</span>
            </div>
          )}

          {/* 4. Step-by-Step Instructions */}
          <div className={styles.sectionBlock}>
            <h3 className={styles.sectionHeading}>How to Perform</h3>
            <ol className={styles.instructionList}>
              {Array.isArray(exercise.instructions) ? (
                exercise.instructions.map((step, idx) => (
                  <li key={idx} className={styles.instructionItem}>
                    {step}
                  </li>
                ))
              ) : (
                <li className={styles.instructionItem}>{exercise.instructions}</li>
              )}
            </ol>
          </div>

          {/* 5. Form Tips & Common Mistakes */}
          <div className={styles.twoCol}>
            <div className={styles.tipBox}>
              <div className={styles.tipHeadGood}>
                <CheckCircle2 size={14} />
                <span>Form Tips</span>
              </div>
              {Array.isArray(exercise.formTips) ? (
                <ul className={styles.bulletList}>
                  {exercise.formTips.map((tip, i) => (
                    <li key={i}>{tip}</li>
                  ))}
                </ul>
              ) : (
                <p className={styles.tipText}>{exercise.formTips}</p>
              )}
            </div>

            <div className={styles.mistakeBox}>
              <div className={styles.tipHeadMistake}>
                <AlertTriangle size={14} />
                <span>Common Mistakes</span>
              </div>
              {Array.isArray(exercise.commonMistakes) ? (
                <ul className={styles.bulletList}>
                  {exercise.commonMistakes.map((mistake, i) => (
                    <li key={i}>{mistake}</li>
                  ))}
                </ul>
              ) : (
                <p className={styles.tipText}>{exercise.commonMistakes}</p>
              )}
            </div>
          </div>

          {/* 6. Beginner Tip */}
          {exercise.beginnerTips && (
            <div className={styles.beginnerTipBox}>
              <div className={styles.beginnerTipHead}>
                <Lightbulb size={14} />
                <span>Beginner Tip</span>
              </div>
              <p className={styles.beginnerTipText}>{exercise.beginnerTips}</p>
            </div>
          )}

          {/* 7. Related Exercises */}
          {relatedExercises.length > 0 && (
            <div className={styles.relatedSection}>
              <span className={styles.relatedHeading}>Related Exercises:</span>
              <div className={styles.relatedPills}>
                {relatedExercises.map((rel) => (
                  <button
                    key={rel.id}
                    type="button"
                    className={styles.relatedPillBtn}
                    onClick={() => onSelectExercise && onSelectExercise(rel)}
                  >
                    <span>{rel.name}</span>
                    <span className={styles.relatedPillSub}>{rel.equipment}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className={styles.footer}>
          <button
            type="button"
            className={`${styles.btnSecondary} ${isFavorite ? styles.btnFavoriteActive : ''}`}
            onClick={() => onToggleFavorite && onToggleFavorite(exercise.id)}
          >
            <Heart size={14} fill={isFavorite ? '#ef4444' : 'none'} color={isFavorite ? '#ef4444' : 'currentColor'} />
            {isFavorite ? 'Favorited' : 'Add to Favorites'}
          </button>
          <button
            type="button"
            className={styles.btnPrimary}
            onClick={() => {
              if (onAddToWorkout) onAddToWorkout(exercise);
              onClose();
            }}
          >
            <Plus size={15} />
            Add To Today's Workout
          </button>
        </div>
      </div>
    </div>
  );
}
