import React from "react";
import { Container } from "react-bootstrap";
import Player from "./Player";

export default function Dashboard() {
  return (
    <>
      <Container>
        <h1>Home</h1>
        <p>lorum ipusum can you see this</p>;
        {/* <Player accessToken={accessToken} /> */}
      </Container>
    </>
  );
}
