import {
  Container,
  Nav,
  Navbar,
  Form,
  Button,
  NavDropdown,
} from "react-bootstrap";
import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { searchHistoryAtom } from "@/store";
import { useAtom } from "jotai";
import { addToHistory } from "@/lib/userData";
import { readToken, removeToken } from "../lib/authenticate";

function MainNav() {
  const { register, handleSubmit } = useForm();
  const router = useRouter();
  const [isExpanded, setIsExpanded] = useState(false);

  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

  async function submitForm(data) {
    const queryString = `title=true&q=${data.searchField}`;
    router.push(`/artwork?${queryString}`);
    setIsExpanded(false);
    setSearchHistory(await addToHistory(`title=true&q=${data.searchField}`));
  }

  let token = readToken();

  function logout() {
    setIsExpanded(false);
    removeToken();
    router.push("/login");
  }

  return (
    <>
      <Navbar
        expand="lg"
        className="fixed-top navbar-dark bg-primary"
        expanded={isExpanded}
      >
        <Container>
          <Navbar.Brand>Ruyuan Sun</Navbar.Brand>
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            onClick={() => setIsExpanded(!isExpanded)}
          />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link href="/" passHref legacyBehavior>
                <Nav.Link
                  className="nav-link"
                  onClick={() => setIsExpanded(false)}
                  active={router.pathname === "/"}
                >
                  Home
                </Nav.Link>
              </Link>
              {token && (
                <Link href="/search" passHref legacyBehavior>
                  <Nav.Link
                    className="nav-link"
                    onClick={() => setIsExpanded(false)}
                    active={router.pathname === "/search"}
                  >
                    Advanced Search
                  </Nav.Link>
                </Link>
              )}
            </Nav>
            &nbsp;
            {token && (
              <Form className="d-flex" onSubmit={handleSubmit(submitForm)}>
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                  {...register("searchField")}
                />
                <Button variant="success" type="submit">
                  Search
                </Button>
              </Form>
            )}
            &nbsp;
            <Nav>
              {!token && (
                <Link href="/register" passHref legacyBehavior>
                  <Nav.Link
                    className="nav-link"
                    onClick={() => setIsExpanded(false)}
                    active={router.pathname === "/register"}
                  >
                    Register
                  </Nav.Link>
                </Link>
              )}
              {!token && (
                <Link href="/login" passHref legacyBehavior>
                  <Nav.Link
                    className="nav-link"
                    onClick={() => setIsExpanded(false)}
                    active={router.pathname === "/login"}
                  >
                    Login
                  </Nav.Link>
                </Link>
              )}
            </Nav>
            <Nav>
              {token && (
                <NavDropdown title={token.userName} id="basic-nav-dropdown">
                  <Link href="/favourites" passHref legacyBehavior>
                    <NavDropdown.Item
                      className="nav-link"
                      onClick={() => setIsExpanded(false)}
                      active={router.pathname === "/favourites"}
                    >
                      Favourites
                    </NavDropdown.Item>
                  </Link>
                  <Link href="/history" passHref legacyBehavior>
                    <NavDropdown.Item
                      className="nav-link"
                      onClick={() => setIsExpanded(false)}
                      active={router.pathname === "/history"}
                    >
                      Search History
                    </NavDropdown.Item>
                  </Link>
                  <NavDropdown.Item className="nav-link" onClick={logout}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <br />
      <br />
    </>
  );
}

export default MainNav;
