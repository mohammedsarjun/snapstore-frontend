import React, { FC, ReactElement } from "react";
import styles from "./styles/galleryCard.module.css";
import { GalleryCardProps, ImageItem } from "../types";

export const GalleryCard: FC<GalleryCardProps> = ({
  img,
  isSelected,
  isDragging,
  isDragOver,
  onDragStart,
  onDragOver,
  onDrop,
  onDragEnd,
  onToggleSelect,
  onEdit,
  onDelete,
}): ReactElement => {
  const cardCls = [
    styles.gcCard,
    isSelected ? styles.gcSel : "",
    isDragging ? styles.gcDrag : "",
    isDragOver ? styles.gcOver : "",
  ].filter(Boolean).join(" ");

  return (
    <div
      className={cardCls}
      draggable
      onDragStart={() => onDragStart(img.id)}
      onDragOver={(e) => onDragOver(e, img.id)}
      onDrop={(e) => onDrop(e, img.id)}
      onDragEnd={onDragEnd}
    >
      {isSelected && <div className={styles.gcBadge}>✓</div>}
      <div className={styles.gcHnd} title="Drag to rearrange">⠿</div>

      {img.imageUrl ? (
        <img src={img.imageUrl} alt={img.title} className={styles.gcImg} />
      ) : (
        <div className={styles.gcPh}>🖼</div>
      )}

      <div className={styles.gcBody}>
        <div className={styles.gcTtl}>{img.title}</div>
        <div className={styles.gcActs}>
          <button className={`${styles.gcBtn} ${styles.gcBtnEdit}`} onClick={() => onEdit(img)}>
            ✎ Edit
          </button>
          <button className={styles.gcBtn} onClick={() => onToggleSelect(img.id)}>
            {isSelected ? "✓ Selected" : "Select"}
          </button>
          <button className={`${styles.gcBtn} ${styles.gcBtnDel}`} onClick={() => onDelete(img.id)}>
            🗑
          </button>
        </div>
      </div>
    </div>
  );
};
