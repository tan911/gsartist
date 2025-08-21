import { useState } from 'react';
import { PortfolioItem, ImageJson } from '@/types';
import { portfolioItems as initialPortfolioItems, portfolioCategories } from '@/lib/data/mock-data';

export const usePortfolio = () => {
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>(initialPortfolioItems);
  const [portfolioFilter, setPortfolioFilter] = useState<string>(portfolioCategories[0]);
  const [showUploadModal, setShowUploadModal] = useState<boolean>(false);
  const [showImageModal, setShowImageModal] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<PortfolioItem | null>(null);
  const [editingItem, setEditingItem] = useState<PortfolioItem | null>(null);

  const filteredPortfolio =
    portfolioFilter === 'All'
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === portfolioFilter);

  const handleAddPortfolioItem = (item: Partial<PortfolioItem> & { imageMeta?: ImageJson; url?: string }) => {
    // Support multiple images per card
    let images: string[] = [];
    if (item.images && Array.isArray(item.images)) {
      images = item.images;
    } else if (item.url) {
      images = [item.url];
    } else if (item.imageMeta && item.imageMeta.image_url) {
      images = [item.imageMeta.image_url];
    }

    if (editingItem) {
      // Edit existing item
      setPortfolioItems((prev) =>
        prev.map((i) =>
          i.id === editingItem.id ? { ...i, ...item, images } as PortfolioItem : i
        )
      );
    } else {
      // Add new item
      setPortfolioItems((prev) => [
        ...prev,
        { ...item, images, id: Date.now() } as PortfolioItem,
      ]);
    }
    
    setShowUploadModal(false);
    setEditingItem(null);
  };

  const handleDeletePortfolioItem = (id: number) => {
    setPortfolioItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleEditPortfolioItem = (id: number) => {
    const item = portfolioItems.find((i) => i.id === id);
    if (item) {
      setEditingItem(item);
      setShowUploadModal(true);
    }
  };

  const handleUploadModalClose = () => {
    setShowUploadModal(false);
    setEditingItem(null);
  };

  const handleImageClick = (item: PortfolioItem) => {
    setSelectedImage(item);
    setShowImageModal(true);
  };

  const handleImageModalClose = () => {
    setShowImageModal(false);
    setSelectedImage(null);
  };

  return {
    portfolioItems,
    filteredPortfolio,
    portfolioFilter,
    setPortfolioFilter,
    showUploadModal,
    setShowUploadModal,
    showImageModal,
    selectedImage,
    editingItem,
    handleAddPortfolioItem,
    handleDeletePortfolioItem,
    handleEditPortfolioItem,
    handleUploadModalClose,
    handleImageClick,
    handleImageModalClose,
  };
};