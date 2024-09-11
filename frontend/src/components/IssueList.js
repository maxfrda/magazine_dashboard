import React, { useState, useEffect } from 'react';
import axios from 'axios';

const IssueList = () => {
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/issues')
      .then(response => setIssues(response.data))
      .catch(error => console.error('Error fetching issues:', error));
  }, []);

  return (
    <div className="bg-[#1F2420] min-h-screen p-8">
      <h1 className="text-3xl text-white font-bold text-center mb-8">Magazine Issues</h1>
      <ul className="flex flex-wrap justify-center gap-8">
        {issues.map(issue => (
          <li key={issue.id} className="flex flex-col items-center">
            <div className="w-[280px]">
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
            </div>
            <div className="w-[280px] text-center mt-4">
              <p className="font-semibold text-gray-200"> {/* Lighten the text color */}
                Publication Date: {new Date(issue.publication_date).toLocaleDateString()}
              </p>
              <p className="text-gray-400"> {/* Make text slightly lighter */}
                Subscribers: {issue.subscribers_count}
              </p>
              <p className="text-gray-400"> {/* Consistent text styling */}
                Pages: {issue.number_of_pages}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IssueList;