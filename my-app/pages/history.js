import { searchHistoryAtom } from "@/store";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { Card, ListGroup, Button } from "react-bootstrap";
import styles from "@/styles/History.module.css";
import { removeFromHistory } from "@/lib/userData";

export default function History(props) {
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

  let parsedHistory = [];
  if (searchHistory) {
    searchHistory.forEach((h) => {
      let params = new URLSearchParams(h);
      let entries = params.entries();
      parsedHistory.push(Object.fromEntries(entries));
    });
  }

  const router = useRouter();
  function historyClicked(e, index) {
    router.push(`/artwork?title=true&q=${searchHistory[index]}`);
  }

  if (!searchHistory) return null;

  async function removeHistoryClicked(e, index) {
    e.stopPropagation(); // stop the event from trigging other events
    setSearchHistory(await removeFromHistory(searchHistory[index]));
  }

  return (
    <>
      {parsedHistory.length > 0 ? (
        <ListGroup>
          {parsedHistory.map((historyItem, index) => (
            <ListGroup.Item
              key={index}
              className={styles.historyListItem}
              onClick={(e) => historyClicked(e, index)}
            >
              {Object.keys(historyItem).map((key) => (
                <>
                  {key}: <strong>{historyItem[key]}</strong>&nbsp;
                </>
              ))}
              <Button
                className="float-end"
                variant="danger"
                size="sm"
                onClick={(e) => removeHistoryClicked(e, index)}
              >
                &times;
              </Button>
            </ListGroup.Item>
          ))}
        </ListGroup>
      ) : (
        <Card>
          <Card.Body>
            <Card.Title>
              <h4>Nothing Here</h4>
            </Card.Title>
            <Card.Text>Try searching for some artwork.</Card.Text>
          </Card.Body>
        </Card>
      )}
    </>
  );
}
