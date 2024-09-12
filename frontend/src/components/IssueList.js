import React, { useState } from 'react';
import axios from 'axios';
import { PencilIcon } from '@heroicons/react/24/solid';
import IssueModal from './IssueModal'; // Ensure this is the correct import path

const IssueList = ({ issues, magazineId, setIssues }) => {
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEditClick = (issue) => {
    setSelectedIssue(issue);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedIssue(null);
  };

  const handleSave = async (updatedIssue) => {
    try {
      const response = await axios.put(`http://localhost:3000/issues/${updatedIssue.id}`, updatedIssue);
      const updatedIssueList = issues.map(issue =>
        issue.id === response.data.id ? response.data : issue
      );
      setIssues(magazineId, updatedIssueList); // Pass magazineId to update issues
      handleCloseModal();
    } catch (error) {
      console.error('Error updating issue:', error);
    }
  };

  return (
    <div className="bg-[#1F2420] p-8">
      <ul className="flex flex-wrap justify-center gap-8">
        {issues.map(issue => (
          <li 
            key={issue.id} 
            className="relative flex flex-col items-center transform transition-transform duration-300 ease-in-out hover:scale-105 group"
          >
            <div className="w-[280px] relative">
              {issue.cover_image_url ? (
                <img 
                  src={issue.cover_image_url} 
                  alt="Cover" 
                  className="w-full object-cover rounded"
                />
              ) : (
                <div className="w-full h-48 bg-gray-300 mb-4 rounded flex items-center justify-center">
                  <span className="text-gray-500">No Cover Image</span>
                </div>
              )}
              <button
                onClick={() => handleEditClick(issue)}
                className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                <PencilIcon className="h-6 w-6 text-gray-800" />
              </button>
            </div>
            <div className="w-[280px] text-center mt-4">
              <p className="font-semibold text-gray-200">
                Publication Date: {new Date(issue.publication_date).toLocaleDateString()}
              </p>
              <p className="text-gray-400">
                Subscribers: {issue.subscribers_count}
              </p>
              <p className="text-gray-400">
                Pages: {issue.number_of_pages}
              </p>
            </div>
          </li>
        ))}
      </ul>
      {selectedIssue && (
        <IssueModal 
          isOpen={isModalOpen} 
          onClose={handleCloseModal} 
          onSave={handleSave} 
          issue={selectedIssue} 
        />
      )}
    </div>
  );
};

export default IssueList;
