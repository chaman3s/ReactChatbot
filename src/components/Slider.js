import React from 'react'
import Carousel from 'react-bootstrap/Carousel'
import '../App.css'

export default function Slider() {
  return (
    <Carousel pause="hover" className="bg-dark">
      <Carousel.Item>
        <img
          src="https://img.freepik.com/free-vector/isometric-chatbot-flowchart-with-smartphones-computers-message-bubbles_1284-55214.jpg?w=996&t=st=1700719587~exp=1700720187~hmac=bd6930cdb882b05ee7bb041e19f8667987b2b59bfdac2e0014b1a3f5dcadd156"
          fluid
        />
        <Carousel.Caption className="carousel-caption">
          <h2>Welcome to jarvis chatbot</h2>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          src="https://img.freepik.com/free-photo/close-up-anthropomorphic-robot-working-computer_23-2150865895.jpg?t=st=1700719708~exp=1700723308~hmac=01a5d1e71748ac11e77d85023fe5c4ee85bc3bb8274281632a62ca4f4d426c09&w=1060"
          fluid
        />
        <Carousel.Caption className="carousel-caption">
          <h2>Lets Explore chatbot</h2>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          src="https://img.freepik.com/premium-photo/chatbot-chat-with-ai-artificial-intelligence-man-using-technology-smart-robot-ai_184421-1591.jpg?w=1380"
          fluid
        />
        <Carousel.Caption className="carousel-caption">
          <h2>Have Great Day !</h2>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  )
}
