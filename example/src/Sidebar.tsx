import React from "react";
import type { IHighlight } from "./react-pdf-highlighter";

interface Props {
  highlights: Array<IHighlight>;
  resetHighlights: () => void;
  toggleDocument: () => void;
  setPagesRotation: (pagesRotation: number) => void;
  setScale: (scaleValue: string) => void;
  setSearchValue: (searchValue: string) => void;
  currentMatch: number;
  totalMatchCount: number;
  findNext: () => void;
  findPrev: () => void;
}

const updateHash = (highlight: IHighlight) => {
  document.location.hash = `highlight-${highlight.id}`;
};

export function Sidebar({
  highlights,
  toggleDocument,
  resetHighlights,
  setPagesRotation,
  setScale,
  setSearchValue,
  currentMatch,
  totalMatchCount,
  findNext,
  findPrev,
}: Props) {
  return (
    <div className="sidebar" style={{ width: "25vw" }}>
      <div className="description" style={{ padding: "1rem" }}>
        <h2 style={{ marginBottom: "1rem" }}>react-pdf-highlighter</h2>

        <p style={{ fontSize: "0.7rem" }}>
          <a href="https://github.com/agentcooper/react-pdf-highlighter">
            Open in GitHub
          </a>
        </p>

        <p>
          <small>
            To create area highlight hold ⌥ Option key (Alt), then click and
            drag.
          </small>
        </p>

        <h3 style={{ marginBottom: "1rem" }}>Set PDF Rotation:</h3>
        {[0, 90, 180, 270].map((pagesRotation) => (
          <button onClick={() => setPagesRotation(pagesRotation)}>
            {pagesRotation}
          </button>
        ))}
        <h3 style={{ marginBottom: "1rem" }}>Set Scale</h3>
        {["page-width", "1", "2", "3"].map((scaleValue) => (
          <button onClick={() => setScale(scaleValue)}>{scaleValue}</button>
        ))}
        <h3 style={{ marginBottom: "1rem" }}>Search:</h3>
        <input type="text" onChange={(e) => setSearchValue(e.target.value)} />
        <div>
          <button onClick={findPrev}>{"<"}</button>
          <button>{`${currentMatch}/${totalMatchCount}`}</button>
          <button onClick={findNext}>{">"}</button>
        </div>
      </div>

      <ul className="sidebar__highlights">
        {highlights.map((highlight, index) => (
          <li
            key={index}
            className="sidebar__highlight"
            onClick={() => {
              updateHash(highlight);
            }}
          >
            <div>
              <strong>{highlight.comment.text}</strong>
              {highlight.content.text ? (
                <blockquote style={{ marginTop: "0.5rem" }}>
                  {`${highlight.content.text.slice(0, 90).trim()}…`}
                </blockquote>
              ) : null}
              {highlight.content.image ? (
                <div
                  className="highlight__image"
                  style={{ marginTop: "0.5rem" }}
                >
                  <img src={highlight.content.image} alt={"Screenshot"} />
                </div>
              ) : null}
            </div>
            <div className="highlight__location">
              Page {highlight.position.pageNumber}
            </div>
          </li>
        ))}
      </ul>
      <div style={{ padding: "1rem" }}>
        <button onClick={toggleDocument}>Toggle PDF document</button>
      </div>
      {highlights.length > 0 ? (
        <div style={{ padding: "1rem" }}>
          <button onClick={resetHighlights}>Reset highlights</button>
        </div>
      ) : null}
    </div>
  );
}
