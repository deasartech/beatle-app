import React, { useEffect, useState } from "react";
import { Container, Button, Card, Row, Col } from "react-bootstrap";
import Logout from "./Logout";
import { auth } from "../firebase-config";
import {
  fetchPlayerResults,
  addPlayerTotalPoints,
  fetchAllPlayersTotalPoints,
  addPointsLeaderboard,
} from "../utils/fetchPlayerResults";

export default function Leaderboard() {
  const [scores, setScores] = useState([]);
  const [totalPoints, setTotalPoints] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [allPlayers, setAllPlayers] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    // retrieve players history
    fetchPlayerResults(auth.currentUser?.uid).then((res) => {
      setScores(res);
      // console.log(res, "player results");
    });
    // get leaderboard data
    fetchAllPlayersTotalPoints().then((res) => {
      setAllPlayers(res);
      setIsLoading(false);
      // console.log(allPlayers, "all players");
    });
    // update players totalPoints and also return the value
    addPlayerTotalPoints(scores, auth.currentUser?.uid)
      .then((res) => {
        setTotalPoints(res);
      })
      .catch((err) => {
        console.log(err, "addPlayerTotalPointsError");
      });

    addPointsLeaderboard(totalPoints, auth.currentUser?.uid)
      .then((res) => {})
      .catch((err) => {
        console.log(err, "addPointsLeaderboard");
      });

    // const d = Date.now();
    // const date = Date(d);
  }, [auth.currentUser?.uid, totalPoints]);

  if (isLoading) {
    return (
      <div className="text-center my-5">
        <div className="spinner-border" role="status"></div>
      </div>
    );
  }

  return (
    <Container className="p-2">
      <Row className="g-3">
        <Col md="6" lg="6">
          <Card className="leaderboard-card shadow border-0">
            <Card.Body>
              <Card.Title className="text-center">Leaderboard</Card.Title>
              <Row className="pb-2">
                <Col className="text-center">
                  <b>Username</b>
                </Col>
                <Col className="text-center">
                  <b>Points</b>
                </Col>
              </Row>
              {allPlayers?.map((item, index) => {
                return (
                  <>
                    <Row>
                      <Col>
                        {/* {index + 1}. */}
                        <p
                          stye={{ color: `${item.nameColour}` }}
                          className={`mx-2 text-center ${item.nameColour}`}
                        >
                          {item.username}
                        </p>
                      </Col>
                      <Col>
                        <p className="text-center">{item.totalPoints}</p>
                      </Col>
                    </Row>
                  </>
                );
              })}
            </Card.Body>
          </Card>
        </Col>
        <Col md="6" lg="6">
          <Card className="leaderboard-card shadow border-0">
            {auth.currentUser ? (
              <>
                <Card.Body>
                  <Card.Title className="text-center">
                    {auth.currentUser?.displayName}'s Performance{" "}
                  </Card.Title>
                  <Row className="pb-2">
                    <Col className="text-center">
                      <b>Date</b>
                    </Col>
                    <Col className="text-center">
                      <b>Points</b>
                    </Col>
                  </Row>
                  {scores.map((el) => {
                    const itemDate = el.date;
                    const dateString = Date(itemDate).split(" ");
                    // console.log(dateString.getDate(), "date");
                    const newDate = dateString.slice(1, 4).join(" ");
                    return (
                      <Row>
                        <Col>
                          <p className="text-center">{newDate}</p>
                        </Col>
                        <Col>
                          <p className="text-center">{el.score.points}</p>
                        </Col>
                      </Row>
                    );
                  })}
                  <h4 className="text-center">{totalPoints} Points</h4>
                </Card.Body>
                <div className="text-center pb-4">
                  <Logout />
                </div>
              </>
            ) : (
              <>
                <Card.Body>
                  <Card.Title className="text-center mb-5">
                    Performance
                  </Card.Title>
                  <h6 className="text-center">Sign in to view your history</h6>
                  <div className="text-center py-4">
                    <Logout />
                  </div>
                </Card.Body>
              </>
            )}
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
