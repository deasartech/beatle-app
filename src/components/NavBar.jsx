import {
  Navbar,
  Container,
  Nav,
  Offcanvas,
  Button,
  Image,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import { auth } from "../firebase-config";
import {
  //   createUserWithEmailAndPassword,
  //   signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import Logout from "./Logout";

import google from "../assets/google.png";

export default function NavBar() {
  //   const navigate = useNavigate();

  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((res) => {
        // navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <Navbar expand={false}>
      <Container>
        <Navbar.Brand>
          <Nav.Link href="/">
            {/* <img
              src={paw}
              alt="paw image"
              width="50"
              height="50"
              className="d-inline-block align-top"
            /> */}
            <h2 className="nav-title">Beatle</h2>
          </Nav.Link>
        </Navbar.Brand>
        {/* <Image src={logo} height="35" className="" /> */}
        <Button href="/leaderboard" className="ms-auto mx-3 btn-trophy">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-trophy-fill"
            viewBox="0 0 16 16"
          >
            <path d="M2.5.5A.5.5 0 0 1 3 0h10a.5.5 0 0 1 .5.5c0 .538-.012 1.05-.034 1.536a3 3 0 1 1-1.133 5.89c-.79 1.865-1.878 2.777-2.833 3.011v2.173l1.425.356c.194.048.377.135.537.255L13.3 15.1a.5.5 0 0 1-.3.9H3a.5.5 0 0 1-.3-.9l1.838-1.379c.16-.12.343-.207.537-.255L6.5 13.11v-2.173c-.955-.234-2.043-1.146-2.833-3.012a3 3 0 1 1-1.132-5.89A33.076 33.076 0 0 1 2.5.5zm.099 2.54a2 2 0 0 0 .72 3.935c-.333-1.05-.588-2.346-.72-3.935zm10.083 3.935a2 2 0 0 0 .72-3.935c-.133 1.59-.388 2.885-.72 3.935z" />
          </svg>
        </Button>

        <Navbar.Toggle aria-controls="offcanvasNavbar" id="offcanvasNavbar">
          {" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            fill="#34d399"
            className="bi bi-person-fill"
            viewBox="0 0 16 16"
          >
            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
          </svg>
        </Navbar.Toggle>
        <Navbar.Offcanvas
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id="offcanvasNavbarLabel">hi,</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-3">
              {auth.currentUser ? (
                <>
                  <Nav.Link className="p-3 link" href="/">
                    search
                  </Nav.Link>
                  <Nav.Link className="p-3 link" href="/me">
                    my profile
                  </Nav.Link>
                  <Nav.Link className="p-3 link" href="/messages">
                    messages
                  </Nav.Link>
                  <Nav.Link className="p-3 link" href="/favourites">
                    favourites
                  </Nav.Link>
                </>
              ) : (
                <>
                  <h5 className="text-center">
                    you are not currently signed in
                  </h5>
                </>
              )}
              {!auth.currentUser ? (
                <>
                  <Button href="/signin" className="btn-sign m-3">
                    Sign in/Sign up
                  </Button>
                  <Button
                    style={{ color: "white" }}
                    variant=""
                    className="p-2 px-4 mt-3 align-items-center"
                    onClick={signInWithGoogle}
                  >
                    <Image src={google} width="50" height="50" />
                  </Button>
                </>
              ) : (
                <Logout />
              )}
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}
