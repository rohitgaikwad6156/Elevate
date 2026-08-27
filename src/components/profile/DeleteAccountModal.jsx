import { useState } from 'react';
import {
  X,
  AlertTriangle,
  Trash2,
} from 'lucide-react';
import styles from './DeleteAccountModal.module.css';

export default function DeleteAccountModal({ onClose, onConfirmDelete }) {
  const [confirmText, setConfirmText] = useState('');

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.container} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.titleRow}>
            <AlertTriangle size={18} color="var(--color-error)" />
            <h3 className={styles.title}>Delete ELEVATE Account</h3>
          </div>
          <button type="button" className={styles.closeBtn} onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className={styles.body}>
          <p className={styles.warningText}>
            This action is <strong>irreversible</strong>. Permanently deleting your account will erase all your progress scores, practice history, speech recordings, and achievements.
          </p>

          <div className={styles.confirmBox}>
            <label className={styles.confirmLabel}>
              Type <strong>DELETE</strong> to confirm:
            </label>
            <input
              type="text"
              className={styles.input}
              placeholder="DELETE"
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
            />
          </div>
        </div>

        {/* Footer */}
        <div className={styles.footer}>
          <button type="button" className={styles.btnSecondary} onClick={onClose}>
            Cancel
          </button>
          <button
            type="button"
            className={styles.btnDanger}
            disabled={confirmText !== 'DELETE'}
            onClick={() => {
              if (onConfirmDelete) onConfirmDelete();
              onClose();
            }}
          >
            <Trash2 size={14} />
            Permanently Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}
