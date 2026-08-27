import { useState, useRef } from 'react';
import {
  X,
  Sparkles,
  Save,
  Camera,
  Loader2,
  ImagePlus,
  AlertCircle,
} from 'lucide-react';
import styles from './EditProfileModal.module.css';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB raw input
const OUTPUT_SIZE   = 200;               // resize to 200×200 px
const JPEG_QUALITY  = 0.75;             // ~20-50 KB output → safe for Firestore

// Compress image using a canvas → returns a base64 data URL
function compressImage(file) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(url);
      const canvas = document.createElement('canvas');
      // Crop to square from center, then scale
      const side = Math.min(img.width, img.height);
      const sx = (img.width  - side) / 2;
      const sy = (img.height - side) / 2;
      canvas.width  = OUTPUT_SIZE;
      canvas.height = OUTPUT_SIZE;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, sx, sy, side, side, 0, 0, OUTPUT_SIZE, OUTPUT_SIZE);
      resolve(canvas.toDataURL('image/jpeg', JPEG_QUALITY));
    };
    img.onerror = reject;
    img.src = url;
  });
}

export default function EditProfileModal({ profileData, onClose, onSave }) {
  const fileInputRef = useRef(null);

  // Text fields
  const [name, setName]           = useState(profileData?.name     || '');
  const [bio,  setBio]            = useState(profileData?.bio      || '');
  const [location, setLocation]   = useState(profileData?.location || '');
  const [timingTag, setTimingTag] = useState(profileData?.timingTag || 'Evening Learner');

  // Avatar
  const [avatarUrl, setAvatarUrl]       = useState(profileData?.avatarUrl || '');
  const [avatarPreview, setAvatarPreview] = useState(null);  // local preview
  const [compressedB64, setCompressedB64] = useState(null);  // final value to save
  const [compressing, setCompressing]   = useState(false);
  const [uploadError, setUploadError]   = useState('');

  const handleAiImproveBio = () => {
    setBio('Dedicated professional honing confident executive communication, leadership presence, and holistic wellness.');
  };

  const handlePickPhoto = () => {
    setUploadError('');
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    e.target.value = '';

    if (!file.type.startsWith('image/')) {
      setUploadError('Please select an image file (JPG, PNG, WEBP…)');
      return;
    }
    if (file.size > MAX_FILE_SIZE) {
      setUploadError('Image must be under 10 MB.');
      return;
    }

    setUploadError('');
    setCompressing(true);
    // Show instant local preview while compressing
    setAvatarPreview(URL.createObjectURL(file));

    try {
      const b64 = await compressImage(file);
      setCompressedB64(b64);
      setAvatarPreview(b64); // swap to compressed version
    } catch {
      setUploadError('Could not process image. Please try another file.');
      setAvatarPreview(null);
    } finally {
      setCompressing(false);
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (onSave) {
      onSave({
        name,
        bio,
        location,
        timingTag,
        avatarUrl: compressedB64 || avatarUrl,
      });
    }
    onClose();
  };

  const displayAvatar = avatarPreview || avatarUrl;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.container} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className={styles.header}>
          <div>
            <h3 className={styles.title}>Edit Profile Information</h3>
            <p className={styles.subtitle}>Update your personal growth identity and display preferences</p>
          </div>
          <button type="button" className={styles.closeBtn} onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSave} className={styles.form}>

          {/* ── Avatar Section ── */}
          <div className={styles.avatarSection}>
            <div className={styles.avatarWrapper}>
              {displayAvatar ? (
                <img src={displayAvatar} alt="Profile" className={styles.avatarImg} />
              ) : (
                <div className={styles.avatarPlaceholder}>
                  <ImagePlus size={28} color="var(--color-gray-400)" />
                </div>
              )}
              <button
                type="button"
                className={styles.cameraOverlay}
                onClick={handlePickPhoto}
                disabled={compressing}
                title="Change profile photo"
              >
                {compressing
                  ? <Loader2 size={14} className={styles.spinnerIcon} />
                  : <Camera size={14} />
                }
              </button>
            </div>

            <div className={styles.avatarInfo}>
              <button
                type="button"
                className={styles.changePhotoBtn}
                onClick={handlePickPhoto}
                disabled={compressing}
              >
                {compressing ? 'Processing…' : 'Change Profile Photo'}
              </button>
              <span className={styles.avatarHint}>JPG · PNG · WEBP — up to 10 MB</span>
              {compressedB64 && !compressing && (
                <span className={styles.avatarSuccess}>✓ Photo ready to save</span>
              )}
              {uploadError && (
                <div className={styles.uploadError}>
                  <AlertCircle size={12} />
                  {uploadError}
                </div>
              )}
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
          </div>

          {/* ── Text fields ── */}
          <div className={styles.inputGroup}>
            <label className={styles.label}>Display Name</label>
            <input
              type="text"
              className={styles.input}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <div className={styles.bioLabelRow}>
              <label className={styles.label}>Personal Statement / Bio</label>
              <button type="button" className={styles.aiBioBtn} onClick={handleAiImproveBio}>
                <Sparkles size={11} />
                <span>Improve with AI</span>
              </button>
            </div>
            <textarea
              className={styles.textarea}
              rows={3}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              maxLength={160}
            />
            <span className={styles.charCount}>{bio.length} / 160 characters</span>
          </div>

          <div className={styles.row2Col}>
            <div className={styles.inputGroup}>
              <label className={styles.label}>Location</label>
              <input
                type="text"
                className={styles.input}
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <div className={styles.inputGroup}>
              <label className={styles.label}>Learning Schedule Tag</label>
              <select
                className={styles.select}
                value={timingTag}
                onChange={(e) => setTimingTag(e.target.value)}
              >
                <option value="Morning Learner">Morning Learner</option>
                <option value="Afternoon Learner">Afternoon Learner</option>
                <option value="Evening Learner">Evening Learner</option>
                <option value="Night Owl">Night Owl</option>
              </select>
            </div>
          </div>

          {/* Footer */}
          <div className={styles.footer}>
            <button type="button" className={styles.btnSecondary} onClick={onClose} disabled={compressing}>
              Cancel
            </button>
            <button type="submit" className={styles.btnPrimary} disabled={compressing}>
              <Save size={14} />
              Save Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
