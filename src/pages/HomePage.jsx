import { useEffect, useRef, useState } from "react";
import { Col, Container, Row, ListGroup, Badge } from "react-bootstrap";
import PersonalChat from "../components/PersonalChat";
import axios from "axios";
import { API_URL } from "../utils/apis";
import { IoArrowBack } from "react-icons/io5";

function HomePage() {
  const [chatData, setChatData] = useState(null);
  const history = useRef();

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

  const getCustomerName = () => {
    const participants = chatData?.results?.room?.participant;
    const customer = participants?.find((p) => p.role === 2);
    return customer ? customer.name : "Customer";
  };

  const handleBackButtonClick = () => {
    if (history.current) {
      history.current.goBack();
    }
  };

  return (
    <div className="home">
      <div className="mt-3">
        <Container fluid>
          <Row>
            <Col className="chats">
              <h1>Chats</h1>
              {chatData && chatData.results && chatData.results.room && (
                <ListGroup as="ol">
                  <ListGroup.Item
                    as="li"
                    className="d-flex justify-content-between align-items-start"
                  >
                    <div className="ms-2 me-auto">
                      <div className="fw-bold">
                        {chatData.results.room.name}
                      </div>
                      {chatData.results.room.participant.name}: halo
                    </div>
                    <Badge bg="#6495ED" pill>
                      14
                    </Badge>
                  </ListGroup.Item>
                </ListGroup>
              )}
            </Col>
            <Col className="name-customer">
              {chatData && (
                <div className="head-name">
                  {window.innerWidth < 768 && (
                    <button
                      className="back-button"
                      onClick={handleBackButtonClick}
                    >
                      <IoArrowBack />
                    </button>
                  )}
                  <h4>{getCustomerName()}</h4>
                </div>
              )}
              <hr />
              <Row>
                <PersonalChat />
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default HomePage;
