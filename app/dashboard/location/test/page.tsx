"use client";

import React from 'react';
import TestRefactoredComponents from '../_components/test-refactored-components';

export default function TestPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Location Components Refactoring Test</h1>
      <TestRefactoredComponents />
    </div>
  );
}