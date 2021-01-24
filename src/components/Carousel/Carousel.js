import React, { useState } from 'react';
import { connect } from "react-redux";
import { getEvents } from "../../redux/actions/eventActions";
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption
} from 'reactstrap';

import styles from "./Carousel.module.css";

const defaultImage =
  "https://www.beyhanbudak.com.tr/wp-content/uploads/2017/08/TED-Talks.png";

const Advertisements = (getEvents, ...props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  let items = [];
  getEvents.events.map((item) => {
    if(item.advertisement){
      items.push(item);
    }
  })
  
  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  }

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  }

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  }

  const slides = items.map((item) => {
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={item.id}
      >
        <img className={styles.image} src={item.image===""?defaultImage:item.image} alt={item.altText} />
        <CarouselCaption className={styles.caption} captionText={item.organizator} captionHeader={item.name} />
      </CarouselItem>
    );
  });

  return (
    <Carousel
      activeIndex={activeIndex}
      next={next}
      previous={previous}
    >
      <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={goToIndex} />
      {slides}
      <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
      <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
    </Carousel>
  );
}

function mapStateToProps(state) {
  return {
    currentCategory: state.changeCategoryReducer,
    events: state.eventListReducer,
  };
}

const mapDispatchToProps = {
      getEvents
}

export default connect(mapStateToProps, mapDispatchToProps)(Advertisements);