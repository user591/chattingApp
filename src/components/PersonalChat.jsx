import { useEffect, useState } from "react";
import axios from "axios";
import { Card } from "react-bootstrap";
import { API_URL } from "../utils/apis";
import TypeMessage from "./typeMessage";

function PersonalChat() {
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

  const getSenderName = (senderId) => {
    if (senderId === "agent@mail.com") return "Me";
    const participant = chatData?.results?.room?.participant?.find(
      (p) => p.id === senderId
    );
    return participant ? participant.name : "Unknown";
  };

  // const getCardColor = (senderId) => {
  //   if (senderId === "customer@mail.com") return "#CCCCFF";
  //   if (senderId === "agent@mail.com") return "#6495ED";
  //   return "#FFFFFF";
  // };

  return (
    <div className="bubble-chat">
      {chatData && chatData.results && chatData.results.comments && (
        <div>
          <ul className="chat-list">
            {chatData.results.comments.map((message, index) => (
              <li className="listChat" key={index}>
                <Card
                  style={{
                    width: "18rem",
                    margin: "10px",
                    // backgroundColor: getCardColor(message.sender),
                  }}
                >
                  <Card.Body className="card">
                    <Card.Subtitle>
                      {getSenderName(message.sender)}
                    </Card.Subtitle>
                    <Card.Text>{message.message}</Card.Text>
                  </Card.Body>
                </Card>
              </li>
            ))}
          </ul>
          <TypeMessage />
        </div>
      )}
    </div>
  );
}

export default PersonalChat;
