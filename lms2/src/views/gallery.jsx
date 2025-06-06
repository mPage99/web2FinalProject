import React from "react";
import { Carousel, Container } from "react-bootstrap";
import match1 from "../images/match1.jpg";
import match2 from "../images/match2.jpg";
import highlight from "../images/highlight.mp4";

const mediaData = [
  {
    type: "image",
    src: match1,
    alt: "Match 1",
    description: "A thrilling game between top contenders.",
  },
  {
    type: "image",
    src: match2,
    alt: "Match 2",
    description: "Celebrating the hard-fought victory!",
  },
  {
    type: "video",
    src: highlight,
    alt: "Match Highlights",
    description: "Relive the best moments from the tournament.",
  },
];

export default function MediaGallery() {
  return (
    <Container style={{ marginTop: "50px" }}>
      <h2 className="text-center mb-4">Highlights from recent Events!</h2>
      <Carousel>
        {mediaData.map((media, index) => (
          <Carousel.Item key={index}>
            {media.type === "image" ? (
              <img
                className="d-block w-100"
                src={media.src}
                alt={media.alt}
                style={{ height: "500px", objectFit: "cover" }}
              />
            ) : (
              <video
                className="d-block w-100"
                src={media.src}
                alt={media.alt}
                controls
                style={{ height: "500px", objectFit: "cover" }}
              />
            )}
            <Carousel.Caption>
              <p>{media.description}</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </Container>
  );
}
