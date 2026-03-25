import React, { FC, ReactElement, useState, useRef, ChangeEvent } from "react";
import styles from "./styles/addImageModal.module.css";
import { AddImageModalProps, ImagePayload } from "../types";

export const AddImageModal: FC<AddImageModalProps> = ({
  onClose,
  onAdd,
  onEditSubmit,
  editItem,
  loading,
}): ReactElement => {
  const isEdit = editItem !== null;
  const [items, setItems] = useState<ImagePayload[]>(
    isEdit ? [{ title: editItem.title, src: editItem.imageUrl }] : []
  );
  const [dragActive, setDragActive] = useState<boolean>(false);
  const [errors, setErrors] = useState<Record<number, string>>({});
  const fileRef = useRef<HTMLInputElement>(null);

  const processFiles = (files: FileList | null): void => {
    if (!files) return;
    const newItems: ImagePayload[] = [];
    Array.from(files).forEach((file) => {
      if (!file.type.startsWith("image/")) return;
      newItems.push({
        title: file.name.split(".")[0],
        src: URL.createObjectURL(file),
        file,
      });
    });

    if (isEdit) {
      if (newItems.length > 0) {
        setItems([
          { ...items[0], src: newItems[0].src, file: newItems[0].file },
        ]);
      }
    } else {
      setItems((prev) => [...prev, ...newItems]);
    }

    if (fileRef.current) fileRef.current.value = "";
  };

  const handleTitleChange = (index: number, value: string): void => {
    setItems((prev) => {
      const cloned = [...prev];
      cloned[index].title = value;
      return cloned;
    });
    setErrors((prev) => {
      const cloned = { ...prev };
      delete cloned[index];
      return cloned;
    });
  };

  const removeItem = (index: number): void => {
    setItems((prev) => prev.filter((_, i) => i !== index));
    setErrors((prev) => {
      const cloned = { ...prev };
      delete cloned[index];
      return cloned;
    });
  };

  const handleSubmit = (): void => {
    const newErrors: Record<number, string> = {};
    let hasError = false;

    if (items.length === 0) {
      return;
    }

    items.forEach((item, index) => {
      if (item.title.trim() === "") {
        newErrors[index] = "Title is required";
        hasError = true;
      }
      if (!item.src) {
        newErrors[index] = "Image is required";
        hasError = true;
      }
    });

    if (hasError) {
      setErrors(newErrors);
      return;
    }

    if (isEdit && editItem) {
      onEditSubmit(editItem.id, items[0]);
    } else {
      onAdd({ items });
    }
  };

  return (
    <div
      className={styles.aimOv}
      onClick={(e) => {
        if (e.target === e.currentTarget && !loading) onClose();
      }}
    >
      <div className={styles.aimPn}>
        <div className={styles.aimTtl}>
          {isEdit ? "Edit Image" : "Add Images"}
        </div>

        {(!isEdit || !items[0]?.src) && (
          <div
            className={`${styles.aimZone} ${dragActive ? styles.aimAct : ""}`}
            onClick={() => fileRef.current?.click()}
            onDragOver={(e) => {
              e.preventDefault();
              setDragActive(true);
            }}
            onDragLeave={() => setDragActive(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragActive(false);
              processFiles(e.dataTransfer.files);
            }}
          >
            <div className={styles.aimZoneEmoji}>🖼</div>
            <p>Click to upload or drag & drop</p>
            <p style={{ fontSize: ".74rem", marginTop: ".2rem" }}>
              PNG, JPG, WEBP, GIF
            </p>
          </div>
        )}

        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          multiple={!isEdit}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            processFiles(e.target.files)
          }
          style={{ display: "none" }}
        />

        {items.length > 0 && (
          <div className={styles.aimList}>
            {items.map((item, idx) => (
              <div key={idx} className={styles.aimItem}>
                <img
                  src={item.src as string}
                  alt={item.title}
                  className={styles.aimImgPreview}
                />
                <div className={styles.aimFields}>
                  <label className={styles.aimLbl}>Title</label>
                  <input
                    type="text"
                    className={`${styles.aimInp} ${
                      errors[idx] ? styles.aimErr : ""
                    }`}
                    value={item.title}
                    onChange={(e) => handleTitleChange(idx, e.target.value)}
                    placeholder="Image title…"
                  />
                  {errors[idx] && (
                    <div className={styles.aimFerr}>⚠ {errors[idx]}</div>
                  )}
                </div>
                {!isEdit && (
                  <button
                    className={styles.aimRmv}
                    onClick={() => removeItem(idx)}
                  >
                    ✕ Remove
                  </button>
                )}
                {isEdit && (
                  <button
                    className={styles.aimRmv}
                    onClick={() => fileRef.current?.click()}
                  >
                    ✎ Change
                  </button>
                )}
              </div>
            ))}
          </div>
        )}

        <div className={styles.aimRow}>
          <button className={styles.aimCan} onClick={onClose} disabled={loading}>
            Cancel
          </button>
          <button
            className={styles.aimCfm}
            onClick={handleSubmit}
            disabled={loading || items.length === 0}
          >
            {loading ? "Saving..." : isEdit ? "Save Changes" : "Upload"}
          </button>
        </div>
      </div>
    </div>
  );
};
