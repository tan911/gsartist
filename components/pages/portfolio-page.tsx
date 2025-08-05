"use client";
import React, { useState } from "react";
import { Plus } from "lucide-react";
import { PortfolioStats } from "@/components/portfolio/PortfolioStats";
import { PortfolioFilterTabs } from "@/components/portfolio/PortfolioFilterTabs";
import { PortfolioGrid } from "@/components/portfolio/PortfolioGrid";
import { PortfolioUploadModal } from "@/components/portfolio/PortfolioUploadModal";
import {
  portfolioItems as portfolioItemsMock,
  mockUser,
} from "@/lib/data/mock-data";
import { Modal } from "@/components/ui/modal";

const categories = ["All", "Hair", "Makeup", "Combo"];

export const PortfolioPage: React.FC = () => {
  const [portfolioItems, setPortfolioItems] = useState(portfolioItemsMock);
  const [portfolioFilter, setPortfolioFilter] = useState("All");
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const [editingItem, setEditingItem] = useState<any>(null);

  const filteredPortfolio =
    portfolioFilter === "All"
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === portfolioFilter);

  const handleAddPortfolioItem = (item: any) => {
    // Support multiple images per card
    let images: string[] = [];
    if (item.images && Array.isArray(item.images)) {
      images = item.images;
    } else if (item.url) {
      images = [item.url];
    } else if (item.imageMeta && item.imageMeta.image_url) {
      images = [item.imageMeta.image_url];
    }
    setPortfolioItems((prev) => [...prev, { ...item, images, id: Date.now() }]);
    setShowUploadModal(false);
  };

  const handleDeletePortfolioItem = (id: number) => {
    setPortfolioItems((prev) => prev.filter((item) => item.id !== id));
  };

  // TODO: Implement edit functionality
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

  const handleAddOrEditPortfolioItem = (item: any) => {
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
          i.id === editingItem.id ? { ...i, ...item, images } : i
        )
      );
    } else {
      // Add new item
      setPortfolioItems((prev) => [
        ...prev,
        { ...item, images, id: Date.now() },
      ]);
    }
    setShowUploadModal(false);
    setEditingItem(null);
  };

  const handleImageClick = (item: any) => {
    setSelectedImage(item);
    setShowImageModal(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">
          Portfolio Management
        </h2>
        <button
          onClick={() => setShowUploadModal(true)}
          className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 flex items-center">
          <Plus className="h-4 w-4 mr-2" />
          Add Media
        </button>
      </div>

      <PortfolioStats portfolioItems={portfolioItems} />
      <PortfolioFilterTabs
        categories={categories}
        activeCategory={portfolioFilter}
        onCategoryChange={setPortfolioFilter}
      />
      <PortfolioGrid
        items={filteredPortfolio}
        onEdit={handleEditPortfolioItem}
        onDelete={handleDeletePortfolioItem}
        onImageClick={handleImageClick}
      />
      <PortfolioUploadModal
        open={showUploadModal}
        onClose={handleUploadModalClose}
        onUpload={handleAddOrEditPortfolioItem}
        initialValues={editingItem}
        artistName={mockUser.name}
        artistId={mockUser.id}
      />
      {showImageModal && selectedImage && (
        <Modal
          isOpen={showImageModal}
          onClose={() => setShowImageModal(false)}
          title={selectedImage.title || "Image Preview"}
          maxWidth="max-w-3xl">
          <div className="flex flex-col gap-4 max-h-[70vh] overflow-y-auto p-2 sm:p-4">
            {selectedImage.images &&
              selectedImage.images.map((img: string, idx: number) => (
                <div key={idx} className="flex flex-col items-center">
                  <img
                    src={img}
                    alt={selectedImage.title}
                    className="w-full h-auto object-contain rounded border border-gray-200 bg-gray-50"
                  />
                </div>
              ))}
          </div>
        </Modal>
      )}
    </div>
  );
};
