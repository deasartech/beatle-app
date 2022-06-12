import React from "react";
import { auth } from "../firebase-config";
import { signOut } from "firebase/auth";
import { Button } from "react-bootstrap";

export default function Logout() {
  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <>
      {auth.currentUser ? (
        <Button className="play ms-auto" onClick={handleLogout}>
          Sign Out
        </Button>
      ) : (
        <Button href="/login" className="play">
          Sign in
        </Button>
      )}
    </>
  );
}
