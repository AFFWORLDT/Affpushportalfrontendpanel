import React, { useState } from 'react';
import axios from 'axios';

const PlayerPage = () => {
  const [cid, setCid] = useState('');
  const [playerData, setPlayerData] = useState(null);

  const handleClick = async () => {
    try {
      const response = await axios.get(`https://reports-qoud.onrender.com/players/?cid=${cid}`);
      setPlayerData(response.data);
    } catch (error) {
      console.error('Error fetching player data:', error);
    }
  };

  return (
    <div>
      <h1>Player Page</h1>
      <label>
        Enter CID:
        <input type="text" value={cid} onChange={(e) => setCid(e.target.value)} />
      </label>
      <button onClick={handleClick}>Get Player Data</button>

      {playerData && (
        <div>
          <h2>Player Information</h2>
          <table>
            <thead>
              <tr>
                <th>Transaction Date</th>
                <th>An ID</th>
                <th>CID</th>
                <th>GGR</th>
                <th>NGR</th>
                <th>Deposits</th>
                <th>CPA Count</th>
                <th>FTD Count</th>
              </tr>
            </thead>
            <tbody>
              {playerData.players.map((player) => (
                <tr key={player.an_id}>
                  <td>{player.transaction_date}</td>
                  <td>{player.an_id}</td>
                  <td>{player.cid}</td>
                  <td>{player.ggr}</td>
                  <td>{player.ngr}</td>
                  <td>{player.deposits}</td>
                  <td>{player.cpa_count}</td>
                  <td>{player.ftd_count}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div>
            <h2>Tracked Information</h2>
            <p>Tracked: {playerData.tracked[0].tracked ? 'Yes' : 'No'}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlayerPage;
