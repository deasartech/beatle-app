import React from "react";
import { Container, Button } from "react-bootstrap";
import Logout from "./Logout";

export default function Leaderboard() {
  return (
    <Container>
      <div className="text-center p-2 mb-5">
        <Logout />
      </div>

      <p className="text-center">Leaderboard is in development</p>
    </Container>
  );
}
