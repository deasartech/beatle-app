import { auth } from "../firebase-config";
import { signOut } from "firebase/auth";
import React from "react";
import { Button } from "react-bootstrap";

export default function Logout() {
  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <Button className="btn-sign m-3" onClick={handleLogout}>
      Sign Out
    </Button>
  );
}
