"use client";

import React, { FC, ReactElement, useEffect, useState } from "react";
import styles from "./styles/home.module.css";
import { Topbar } from "./Topbar";
import { GalleryCard } from "./GalleryCard";
import { AddImageModal } from "./AddImageModal";
import { useGallery } from "../hooks/useGallery";
import axiosInstance from "@/lib/axios";
import { API_ROUTES } from "@/constants/apiRoutes";

export const HomeContent: FC = (): ReactElement => {
  const [userName, setUserName] = useState<string>("User");
  const {
    images,
    selected,
    modal,
    dragId,
    dragOverId,
    loading,
    submitting,
    setModal,
    toggleSelect,
    handleAdd,
    handleEditSubmit,
    handleDelete,
    handleDeleteSelected,
    handleDragStart,
    handleDragOver,
    handleDrop,
    handleDragEnd,
  } = useGallery();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axiosInstance.get(API_ROUTES.AUTH.ME);
        if (response.data?.data?.userName) {
          setUserName(response.data.data.userName);
        }
      } catch {
        // Fallback or redirect if token is invalid
        // router.push("/login") is already handled by middleware or interceptors
      }
    };
    fetchUser();
  }, []);

  const editItem = modal.kind === "edit" ? modal.item : null;
  const showModal = modal.kind === "add" || modal.kind === "edit";

  return (
    <div className={styles.gpShell}>
      <Topbar user={userName} />
      <main className={styles.gpMain}>
        <div className={styles.gpHdr}>
          <div>
            <div className={styles.gpHt}>My Gallery</div>
            <div className={styles.gpHc}>
              {images.length} image{images.length !== 1 ? "s" : ""}
            </div>
          </div>
          <div className={styles.gpHa}>
            {selected.size > 0 && (
              <button
                className={styles.gpDsel}
                onClick={handleDeleteSelected}
                disabled={submitting}
              >
                🗑 Delete {selected.size} selected
              </button>
            )}
            <button
              className={styles.gpAdd}
              onClick={() => setModal({ kind: "add" })}
              disabled={submitting}
            >
              <span>＋</span> Add Image
            </button>
          </div>
        </div>

        {loading ? (
          <div className={styles.loading}>Loading your gallery...</div>
        ) : images.length === 0 ? (
          <div className={styles.gpEmpty}>
            <div className={styles.gpEi}>🖼</div>
            <h3>No images yet</h3>
            <p>Click "Add Image" to start building your gallery</p>
          </div>
        ) : (
          <div className={styles.gpGrid}>
            {images.map((img) => (
              <GalleryCard
                key={img.id}
                img={img}
                isSelected={selected.has(img.id)}
                isDragging={dragId === img.id}
                isDragOver={dragOverId === img.id}
                onDragStart={handleDragStart}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onDragEnd={handleDragEnd}
                onToggleSelect={toggleSelect}
                onEdit={(item) => setModal({ kind: "edit", item })}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </main>

      {showModal && (
        <AddImageModal
          onClose={() => setModal({ kind: "closed" })}
          onAdd={handleAdd}
          onEditSubmit={handleEditSubmit}
          editItem={editItem}
          loading={submitting}
        />
      )}
    </div>
  );
};

export default HomeContent;