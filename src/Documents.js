// src/Documents.js
import React, { useState, useEffect } from 'react';
import { db } from './firebaseConfig';

function Documents() {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    async function fetchDocuments() {
      try {
        const querySnapshot = await db.collection('documents').get();
        const documentsData = querySnapshot.docs.map(doc => doc.data());
        setDocuments(documentsData);
      } catch (error) {
        console.error('Error fetching documents:', error.message);
      }
    }

    fetchDocuments();
  }, []);

  return (
    <div>
      <h2>Documents</h2>
      <ul>
        {documents.map((document, index) => (
          <li key={index}>
            <a href={document.url} target="_blank" rel="noopener noreferrer">
              {document.url}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Documents;
