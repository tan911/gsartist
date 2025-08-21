"use client";
import React from "react";
import { PortfolioStats } from "@/app/dashboard/portfolio/_components/PortfolioStats";
import { PortfolioFilterTabs } from "@/app/dashboard/portfolio/_components/PortfolioFilterTabs";
import { PortfolioGrid } from "@/app/dashboard/portfolio/_components/PortfolioGrid";
import { PortfolioUploadModal } from "@/app/dashboard/portfolio/_components/PortfolioUploadModal";
import { PortfolioImageModal } from "@/app/dashboard/portfolio/_components/PortfolioImageModal";
import { PortfolioHeader } from "@/app/dashboard/portfolio/_components/PortfolioHeader";
import { mockUser, portfolioCategories } from "@/lib/data/mock-data";
import { usePortfolio } from "@/lib/hooks/usePortfolio";

export default function PortfolioPage() {
  const {
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
  } = usePortfolio();

  return (
    <div className="space-y-2 md:space-y-4">
      <PortfolioHeader onAddClick={() => setShowUploadModal(true)} />

      <PortfolioStats portfolioItems={portfolioItems} />
      <PortfolioFilterTabs
        categories={portfolioCategories}
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
        onUpload={handleAddPortfolioItem}
        initialValues={editingItem}
        artistName={mockUser.name}
        artistId={mockUser.id}
      />
      <PortfolioImageModal
        isOpen={showImageModal}
        onClose={handleImageModalClose}
        selectedItem={selectedImage}
      />
    </div>
  );
}
