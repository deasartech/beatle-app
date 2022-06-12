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
        <Button className="btn-trophy ms-auto" onClick={handleLogout}>
          Sign Out
        </Button>
      ) : (
        <Button href="/login" className="btn-trophy">
          Sign in
        </Button>
      )}
    </>
  );
}
