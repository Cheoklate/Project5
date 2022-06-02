import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

import axios from "axios";

export default function Carousel() {
  const [story, setStory] = useState();

 

  useEffect(() => {
    axios.post("http://localhost:3004/gethistory").then((response) => {
      console.log(response);
      const storyArray = response.data
      const items = storyArray.map((item, index) => {
        const style = { height: 350 };
        return (
          <div className="item" style={style} data-value={index + 1}>
            <h1 className="text-3xl font-bold underline text-red-900 ">
              {item.title}
            </h1>
            <span>{item.content}</span>
          </div>
        );
      });
      setStory(items);
    });
  }, []);

  return (
    <div>
            <AliceCarousel infinite mouseTracking items={story} />
    </div>
  );
}
