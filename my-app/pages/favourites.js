import { favouritesAtom } from "@/store";
import { useAtom } from "jotai";
import { Row, Col, Card } from "react-bootstrap";
import ArtworkCard from "@/components/ArtworkCard";

export default function Favourites(props) {
  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);

  if (!favouritesList) return null;

  return (
    <>
      {favouritesList ? (
        <Row className="gy-4">
          {favouritesList.length > 0 ? (
            favouritesList.map((currentObjectID) => (
              <Col lg={3} key={currentObjectID}>
                <ArtworkCard objectID={currentObjectID} />
              </Col>
            ))
          ) : (
            <Card>
              <Card.Body>
                <Card.Title>
                  <h4>Nothing Here</h4>
                </Card.Title>
                <Card.Text>Try adding some new artwork to the list.</Card.Text>
              </Card.Body>
            </Card>
          )}
        </Row>
      ) : null}
      <br />
    </>
  );
}
