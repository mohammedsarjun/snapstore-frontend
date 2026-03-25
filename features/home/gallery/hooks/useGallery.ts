import { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { ImageItem, ImagePayload, ModalState } from "../types";
import { getImages, uploadImages, updateImage, deleteImage, reorderImages } from "../services/galleryService";

export function useGallery() {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [modal, setModal] = useState<ModalState>({ kind: "closed" });
  const [dragId, setDragId] = useState<string | null>(null);
  const [dragOverId, setDragOverId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [submitting, setSubmitting] = useState<boolean>(false);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      setLoading(true);
      const data = await getImages();
      setImages(data);
    } catch (error) {
      toast.error(typeof error === "string" ? error : "Failed to load gallery");
    } finally {
      setLoading(false);
    }
  };

  const toggleSelect = (id: string): void => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleAdd = async (payload: { items: ImagePayload[] }) => {
    if (payload.items.length === 0) return;

    try {
      setSubmitting(true);
      const formData = new FormData();
      const titles: string[] = [];

      for (const item of payload.items) {
        if (!item.file) throw new Error("File missing");
        formData.append("images", item.file);
        titles.push(item.title);
      }
      formData.append("titles", JSON.stringify(titles));

      const newImages = await uploadImages(formData);
      setImages((prev) => [...prev, ...newImages]);
      toast.success("Images uploaded successfully");
      setModal({ kind: "closed" });
    } catch (error) {
      toast.error(typeof error === "string" ? error : "Failed to upload images");
    } finally {
      setSubmitting(false);
    }
  };

  const handleEditSubmit = async (id: string, payload: ImagePayload) => {
    try {
      setSubmitting(true);
      const formData = new FormData();
      formData.append("title", payload.title);
      if (payload.file) {
        formData.append("image", payload.file);
      }

      const updatedImg = await updateImage(id, formData);
      setImages((prev) => prev.map((img) => (img.id === id ? updatedImg : img)));
      toast.success("Image updated successfully");
      setModal({ kind: "closed" });
    } catch (error) {
      toast.error(typeof error === "string" ? error : "Failed to update image");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      setSubmitting(true);
      await deleteImage(id);
      setImages((prev) => prev.filter((img) => img.id !== id));
      setSelected((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
      toast.success("Image deleted");
    } catch (error) {
      toast.error(typeof error === "string" ? error : "Failed to delete image");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteSelected = async () => {
    const count = selected.size;
    if (count === 0) return;

    try {
      setSubmitting(true);
      const promises = Array.from(selected).map((id) => deleteImage(id));
      await Promise.all(promises);

      setImages((prev) => prev.filter((img) => !selected.has(img.id)));
      setSelected(new Set());
      toast.success(`${count} image${count !== 1 ? "s" : ""} deleted`);
    } catch (error) {
      toast.error(typeof error === "string" ? error : "Failed to delete selected images");
      await fetchImages(); // Refetch to sync state
    } finally {
      setSubmitting(false);
    }
  };

  const handleDragStart = (id: string): void => {
    setDragId(id);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>, id: string): void => {
    e.preventDefault();
    setDragOverId(id);
  };

  const handleDragEnd = (): void => {
    setDragId(null);
    setDragOverId(null);
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>, targetId: string) => {
    e.preventDefault();
    if (dragId === null || dragId === targetId) {
      setDragId(null);
      setDragOverId(null);
      return;
    }

    const fromId = dragId;
    let newOrderIds: string[] = [];

    setImages((prev) => {
      const arr = [...prev];
      const fi = arr.findIndex((img) => img.id === fromId);
      const ti = arr.findIndex((img) => img.id === targetId);

      if (fi === -1 || ti === -1) return prev;

      const [moved] = arr.splice(fi, 1);
      arr.splice(ti, 0, moved);

      newOrderIds = arr.map((img) => img.id);
      return arr;
    });

    setDragId(null);
    setDragOverId(null);

    // Persist reorder to backend
    if (newOrderIds.length > 0) {
      try {
        await reorderImages(newOrderIds);
        // We could also show a small unobtrusive notification or nothing
      } catch (error) {
        toast.error("Failed to save new order");
        fetchImages(); // Revert to backend state
      }
    }
  };

  return {
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
  };
}
