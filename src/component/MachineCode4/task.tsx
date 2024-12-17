import React, { useState } from 'react';
import './task.css';

const playersData = [
  { name: "Player1", team: "Team1", credits: 10 },
  { name: "Player2", team: "Team1", credits: 9 },
  { name: "Player3", team: "Team2", credits: 8 },
  { name: "Player4", team: "Team1", credits: 9 },
  { name: "Player5", team: "Team2", credits: 10 },
];

const Task = () => {
  const [selectedPlayers, setSelectedPlayers] = useState<any[]>([]);

  const handleButtonClick = (player: any) => {
    const isSelected = selectedPlayers.some(p => p.name === player.name);

    if (isSelected) {
      // Remove player from selection
      setSelectedPlayers(selectedPlayers.filter(p => p.name !== player.name));
    } else {
      // Add player to selection
      setSelectedPlayers([...selectedPlayers, player]);
    }
  };

  const getTeamStats = (team: string) => {
    const selectedTeamPlayers = selectedPlayers.filter(p => p.team === team);
    const totalCredits = selectedTeamPlayers.reduce((acc, player) => acc + player.credits, 0);
    return { count: selectedTeamPlayers.length, credits: totalCredits };
  };

  const team1Stats = getTeamStats('Team1');
  const team2Stats = getTeamStats('Team2');

  return (
    <div>
      <h1>Player Selection</h1>
      <ul>
        {playersData.map((player, index) => {
          const isSelected = selectedPlayers.some(p => p.name === player.name);
          return (
            <li key={index}>
              {player.name} - {player.team} - Credits: {player.credits}
              <button onClick={() => handleButtonClick(player)}>
                {isSelected ? 'Remove' : 'Add'}
              </button>
            </li>
          );
        })}
      </ul>
      <div>
        <h2>Team Stats</h2>
        <p>Team1: {team1Stats.count} Players | Team1 Credits: {team1Stats.credits}</p>
        <p>Team2: {team2Stats.count} Players | Team2 Credits: {team2Stats.credits}</p>
      </div>
    </div>
  );
};

export default Task;
