// src/AdminPanel.js
import React, { useState } from 'react';
import { db } from './firebaseConfig';

function AdminPanel() {
  const [category, setCategory] = useState('');
  const [subcategory, setSubcategory] = useState('');
  const [documentUrl, setDocumentUrl] = useState('');

  const handleCreateCategory = async () => {
    try {
      await db.collection('categories').add({ name: category });
      console.log('Category created successfully!');
    } catch (error) {
      console.error('Error creating category:', error.message);
    }
  };

  const handleCreateSubcategory = async () => {
    try {
      await db.collection('subcategories').add({ name: subcategory, categoryId: 'YOUR_CATEGORY_ID' });
      console.log('Subcategory created successfully!');
    } catch (error) {
      console.error('Error creating subcategory:', error.message);
    }
  };

  const handleUploadDocument = async () => {
    try {
      await db.collection('documents').add({ url: documentUrl, categoryId: 'YOUR_CATEGORY_ID', subcategoryId: 'YOUR_SUBCATEGORY_ID' });
      console.log('Document uploaded successfully!');
    } catch (error) {
      console.error('Error uploading document:', error.message);
    }
  };

  return (
    <div>
      <h2>Admin Panel</h2>
      <form onSubmit={handleCreateCategory}>
        <input
          type="text"
          placeholder="Category Name"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <button type="submit">Create Category</button>
      </form>
      <form onSubmit={handleCreateSubcategory}>
        <input
          type="text"
          placeholder="Subcategory Name"
          value={subcategory}
          onChange={(e) => setSubcategory(e.target.value)}
        />
        <button type="submit">Create Subcategory</button>
      </form>
      <form onSubmit={handleUploadDocument}>
        <input
          type="text"
          placeholder="Document URL"
          value={documentUrl}
          onChange={(e) => setDocumentUrl(e.target.value)}
        />
        <button type="submit">Upload Document</button>
      </form>
    </div>
  );
}

export default AdminPanel;
 