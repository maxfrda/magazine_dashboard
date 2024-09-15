import React, { useState, useEffect } from 'react';
import axios from 'axios';
import IssueList from './IssueList';
import AddIssueModal from './AddIssueModal';

export const MagazineList = () => {
  const [magazines, setMagazines] = useState([]);
  const [selectedMagazine, setSelectedMagazine] = useState(null);
  const [isAddIssueModalOpen, setIsAddIssueModalOpen] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:3000/magazines')
      .then(response => {
        setMagazines(response.data);
      })
      .catch(error => console.error('Error fetching magazines:', error));
  }, []);

  const handleAddIssue = (issueData) => {
    if (selectedMagazine) {
      axios.post(`http://localhost:3000/magazines/${selectedMagazine.id}/issues`, issueData)
        .then(response => {
          setMagazines(prevMagazines => prevMagazines.map(magazine =>
            magazine.id === selectedMagazine.id
              ? { ...magazine, issues: [...magazine.issues, response.data] }
              : magazine
          ));
          setIsAddIssueModalOpen(false);
        })
        .catch(error => console.error('Error adding issue:', error));
    }
  };

  const handleIssuesUpdate = (magazineId, updatedIssues) => {
    setMagazines(prevMagazines => prevMagazines.map(magazine =>
      magazine.id === magazineId
        ? { ...magazine, issues: updatedIssues }
        : magazine
    ));
  };

  return (
    <div className="bg-gray-900 min-h-screen p-8">
      <div className="relative">
        <img 
          src="https://www.walsworth.com/wp-content/uploads/2021/11/Print-Magazines-Arent-Dying-and-Heres-Why-photo-scaled.jpg" 
          alt="Magazines Banner" 
          className="w-full h-96 object-cover rounded-lg shadow-lg filter grayscale"
        />
        <div className="absolute inset-0 bg-gray-900 opacity-50 rounded-lg"></div>
        <h1 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-6xl font-bold border-b-4 border-white pb-4">
          Magazines
        </h1>
      </div>
      <div className="space-y-8 mt-8">
        {magazines.map(magazine => (
          <div
            key={magazine.id}
            className=" text-white p-6 rounded-lg shadow-md"
          >
            <div className="flex flex-col mb-8 p-4 bg-gray-700 rounded-lg border border-gray-600">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-3xl font-semibold">{magazine.name}</h2>
                <button
                  onClick={() => {
                    setSelectedMagazine(magazine);
                    setIsAddIssueModalOpen(true);
                  }}
                  className="bg-blue-800 text-white px-4 py-2 rounded-md"
                >
                  Add Issue
                </button>
              </div>
              <div className="border-t border-gray-600 pt-4">
                <IssueList
                  issues={magazine.issues}  // Pass each magazine's issues here
                  magazineId={magazine.id}   // Pass the magazine ID for update reference
                  setIssues={(updatedIssues) => handleIssuesUpdate(magazine.id, updatedIssues)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      {selectedMagazine && (
        <AddIssueModal
          isOpen={isAddIssueModalOpen}
          onClose={() => setIsAddIssueModalOpen(false)}
          onAdd={handleAddIssue}
        />
      )}
    </div>
  );
};
