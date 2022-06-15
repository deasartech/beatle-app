import { Navbar, Container, Nav, Button, Badge } from "react-bootstrap";
import { useEffect } from "react";

export default function NavBar({
  hearts,
  modalShow,
  setModalShow,
  musicModalshow,
  setMusicModalShow,
}) {
  useEffect(() => {}, [hearts]);
  //   const navigate = useNavigate();
  return (
    <Navbar expand={false} className="py-0 mb-2">
      <Container className="py-0">
        <Button
          onClick={() => setMusicModalShow(!musicModalshow)}
          className="btn-info"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="rgba(0, 0, 0, 0.80)"
            className="bi bi-music-player-fill"
            viewBox="0 0 16 16"
          >
            <path d="M8 12a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
            <path d="M4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H4zm1 2h6a1 1 0 0 1 1 1v2.5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1zm3 12a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
          </svg>
        </Button>
        <Button onClick={() => setModalShow(!modalShow)} className="btn-info">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="rgba(0, 0, 0, 0.80)"
            className="bi bi-info-circle-fill buttons"
            viewBox="0 0 16 16"
          >
            <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
          </svg>
        </Button>

        <Navbar.Brand className="ms-auto py-0">
          <Nav.Link href="/">
            <h3 className="nav-title pt-2">Beatle</h3>
          </Nav.Link>
        </Navbar.Brand>
        {/* <Image src={logo} height="35" className="" /> */}
        {hearts > 0 ? (
          <div className="pb-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="red"
              className="bi bi-heart-fill"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
              />
            </svg>
            <Badge bg="light" style={{ color: "red" }}>
              {hearts}
            </Badge>
          </div>
        ) : (
          <div className="pb-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              className="bi bi-heartbreak"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M8.867 14.41c13.308-9.322 4.79-16.563.064-13.824L7 3l1.5 4-2 3L8 15a38.094 38.094 0 0 0 .867-.59Zm-.303-1.01c6.164-4.4 6.91-7.982 6.22-9.921C14.031 1.37 11.447.42 9.587 1.368L8.136 3.18l1.3 3.468a1 1 0 0 1-.104.906l-1.739 2.608.971 3.237Zm-1.25 1.137a36.027 36.027 0 0 1-1.522-1.116C-5.077 4.97 1.842-1.472 6.454.293c.314.12.618.279.904.477L5.5 3 7 7l-1.5 3 1.815 4.537Zm-2.3-3.06C.895 7.797.597 4.875 1.308 3.248c.756-1.73 2.768-2.577 4.456-2.127L4.732 2.36a1 1 0 0 0-.168.991L5.91 6.943l-1.305 2.61a1 1 0 0 0-.034.818l.442 1.106Z"
              />
            </svg>
            <Badge bg="light" style={{ color: "red" }}>
              0
            </Badge>
          </div>
        )}

        <Button href="/leaderboard" className="ms-auto btn-info">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="rgba(0, 0, 0, 0.80)"
            className="bi bi-trophy-fill"
            viewBox="0 0 16 16"
          >
            <path d="M2.5.5A.5.5 0 0 1 3 0h10a.5.5 0 0 1 .5.5c0 .538-.012 1.05-.034 1.536a3 3 0 1 1-1.133 5.89c-.79 1.865-1.878 2.777-2.833 3.011v2.173l1.425.356c.194.048.377.135.537.255L13.3 15.1a.5.5 0 0 1-.3.9H3a.5.5 0 0 1-.3-.9l1.838-1.379c.16-.12.343-.207.537-.255L6.5 13.11v-2.173c-.955-.234-2.043-1.146-2.833-3.012a3 3 0 1 1-1.132-5.89A33.076 33.076 0 0 1 2.5.5zm.099 2.54a2 2 0 0 0 .72 3.935c-.333-1.05-.588-2.346-.72-3.935zm10.083 3.935a2 2 0 0 0 .72-3.935c-.133 1.59-.388 2.885-.72 3.935z" />
          </svg>
        </Button>
      </Container>
    </Navbar>
  );
}
