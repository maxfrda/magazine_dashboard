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
    <div>
      <h1 className='text-white text-center mt-4 text-5xl'>Your Magazines</h1>
      {magazines.map(magazine => (
        <div key={magazine.id}>
          <div className="flex items-center justify-between px-6 mt-4">
            <h2 className='text-white text-4xl'>{magazine.name}</h2>
            <button
              onClick={() => {
                setSelectedMagazine(magazine);
                setIsAddIssueModalOpen(true);
              }}
              className="bg-blue-600 text-white px-4 py-2 rounded-md"
            >
              Add Issue
            </button>
          </div>
          <IssueList
            issues={magazine.issues}  // Pass each magazine's issues here
            magazineId={magazine.id}   // Pass the magazine ID for update reference
            setIssues={(updatedIssues) => handleIssuesUpdate(magazine.id, updatedIssues)}
          />
        </div>
      ))}
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
