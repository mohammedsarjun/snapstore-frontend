export interface ImagePayload {
  title: string;
  src: string | null;
  file?: File;
}

export interface ImageItem {
  id: string;
  title: string;
  imageUrl: string;
  order: number;
}

export type ModalState =
  | { kind: "closed" }
  | { kind: "add" }
  | { kind: "edit"; item: ImageItem };

export interface GalleryCardProps {
  img: ImageItem;
  isSelected: boolean;
  isDragging: boolean;
  isDragOver: boolean;
  onDragStart: (id: string) => void;
  onDragOver: (e: React.DragEvent<HTMLDivElement>, id: string) => void;
  onDrop: (e: React.DragEvent<HTMLDivElement>, id: string) => void;
  onDragEnd: () => void;
  onToggleSelect: (id: string) => void;
  onEdit: (img: ImageItem) => void;
  onDelete: (id: string) => void;
}

export interface AddImageModalProps {
  onClose: () => void;
  onAdd: (payload: { items: ImagePayload[] }) => void;
  onEditSubmit: (id: string, payload: ImagePayload) => void;
  editItem: ImageItem | null;
  loading: boolean;
}

export interface GalleryPageProps {
  user: string;
}
