import { useEffect, useState } from "react";
import axios from "axios";
import { Card } from "react-bootstrap";
import { API_URL } from "../utils/apis";

function Room() {
  const [chatData, setChatData] = useState(null);
  const [rawData, setRawData] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          API_URL,
          { transformResponse: [(data) => data] } 
        );
        let fixedData = response.data
          .replace(/"name":\s?"([^"]*)"\s+"role":/g, '"name": "$1", "role":');

        setRawData(fixedData);
        const jsonData = JSON.parse(fixedData);
        setChatData(jsonData);
        console.log(jsonData);
      } catch (error) {
        console.error("Error fetching chat data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {chatData && chatData.results && chatData.results.room && (
        <div>
          <h1>{chatData.results.room.name}</h1>
        </div>
      )}
    </div>
  );
}

export default Room;
