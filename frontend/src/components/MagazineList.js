import React, { useState, useEffect } from 'react';
import axios from 'axios';
import IssueList from './IssueList';

export const MagazineList = () => {
  const [magazines, setMagazines] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/magazines')
      .then(response => setMagazines(response.data))
      .catch(error => console.error('Error fetching magazines:', error));
  }, []);

  const handleIssuesUpdate = (magazineId, updatedIssues) => {
    setMagazines((prevMagazines) =>
      prevMagazines.map((magazine) =>
        magazine.id === magazineId
          ? { ...magazine, issues: updatedIssues }
          : magazine
      )
    );
  };

  return (
    <div>
      <h1 className='text-white text-center mt-4 text-5xl'>Your Magazines</h1>
      {magazines.map((magazine) => (
        <div key={magazine.id}> 
          <h2 className='pl-6 mt-4 text-white text-4xl'>{magazine.name}</h2>
          <IssueList issues={magazine.issues} magazineId={magazine.id} setIssues={handleIssuesUpdate} />
        </div>
      ))}
    </div>
  );
};
