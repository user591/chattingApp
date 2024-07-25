import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../utils/apis";

function Chats() {
  const [chatData, setChatData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(API_URL, {
          transformResponse: [(data) => data],
        });
        let fixedData = response.data.replace(
          /"name":\s?"([^"]*)"\s+"role":/g,
          '"name": "$1", "role":'
        );

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
    <>
      <div>
        <div>
          <h1>Chats</h1>
          {chatData && chatData.results && chatData.results.room && (
            <div>
              <Card style={{ width: "18rem", margin: "10px" }}>
                <Card.Body>
                  <Card.Subtitle>{chatData.results.room.name}</Card.Subtitle>
                </Card.Body>
              </Card>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Chats;
