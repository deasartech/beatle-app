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
    });
    // get leaderboard data
    fetchAllPlayersTotalPoints().then((res) => {
      setAllPlayers(res);
      console.log(allPlayers, "all players");
      setIsLoading(false);
      // console.log(allPlayers, "all players");
    });
    // update players totalPoints and also return the value
    addPlayerTotalPoints(scores, auth.currentUser?.uid).then((res) => {
      console.log(res, "total player points");
      setTotalPoints(res);
    });
    addPointsLeaderboard(totalPoints, auth.currentUser?.uid).then((res) => {
      console.log(res);
    });

    const d = Date.now();
    const date = Date(d);

    console.log(date, "date");
  }, [auth.currentUser?.uid, totalPoints]);

  console.log(typeof allPlayers, "allPlayers");

  if (isLoading) {
    return (
      <div className="text-center my-5">
        <div className="spinner-border" role="status"></div>
      </div>
    );
  }

  return (
    <Container>
      <Row className="g-3">
        <Col md="6" lg="6">
          <Card className="leaderboard-card">
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
                console.log(item.username, "username");
                console.log(item.totalPoints, "totalPoints");
                return (
                  <>
                    <Row>
                      <Col>
                        <p className="mx-2">
                          {index + 1}. {item.username}
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
          <Card className="leaderboard-card">
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
                  {scores.map((item) => {
                    const d = item.date;
                    const dateString = Date(d).split(" ");
                    const date = dateString.slice(1, 4).join(" ");
                    return (
                      <Row>
                        <Col>
                          <p className="text-center">{date}</p>
                        </Col>
                        <Col>
                          <p className="text-center">{item.score.points}</p>
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
