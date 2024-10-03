"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

const SkillsListPage: React.FC = () => {
  const [skills, setSkills] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchSkillsList = async () => {
    try {
      // Step 1: Obtain an access token
      const tokenResponse = await axios.post(
        "https://auth.emsicloud.com/connect/token",
        "grant_type=client_credentials&client_id=61b6g90oeq4hw8hy&client_secret=br1jXaQf&scope=emsi_open",
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      );

      const accessToken = tokenResponse.data.access_token;

      // Step 2: Use the access token to fetch the list of all skills
      const skillsResponse = await axios.get(
        "https://emsiservices.com/skills/versions/latest/skills",
        {
          
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      setSkills(skillsResponse.data.data); // Assuming the skills are in the 'data' field

    } catch (error) {
      console.error("Error fetching skills list:", error);
      setError(error.response?.data?.error || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkillsList();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Skills List</h1>
      <ul className="list-disc pl-5">
        {skills.map((skill) => (
          <li key={skill.id} className="my-2">
            <div>{skill.name} - {skill.id}</div>
            {skill.infoUrl && (
              <a href={skill.infoUrl} target="_blank" rel="noopener noreferrer">
                More Info
              </a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SkillsListPage;
