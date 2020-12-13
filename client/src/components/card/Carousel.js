import React from "react";
import { getEnumValues } from "../auth/auth-service";
import {
  ButtonBack,
  ButtonNext,
  CarouselProvider,
  Slide,
  Slider,
} from "pure-react-carousel";
import Card from "./Card";
import s from "pure-react-carousel/dist/react-carousel.es.css";
//import "../../App.css";

class Carousel extends React.Component {
  state = {
    enumValues: [],
  };

  findEnumValues = () => {
    getEnumValues()
      .then((response) => {
        //console.log("response", response);
        this.setState({ enumValues: response });
      })
      .catch((error) => console.log(error));
  };

  componentDidMount() {
    this.findEnumValues();
  }

  render() {
    let visibleSlides = 1;

    if (this.props.windowWidth >= 0 && this.props.windowWidth <= 425) {
      visibleSlides = 1;
    } else if (this.props.windowWidth >= 426 && this.props.windowWidth <= 768) {
      visibleSlides = 2;
    } else if (
      this.props.windowWidth >= 769 &&
      this.props.windowWidth <= 1200
    ) {
      visibleSlides = 3;
    } else if (
      this.props.windowWidth >= 1201 &&
      this.props.windowWidth <= 1600
    ) {
      visibleSlides = 4;
    }
    console.log("visibleSlides: ", visibleSlides);

    console.log("WW CAROUSEL", this.props.windowWidth);
    const enumValues = Object.entries(this.state.enumValues);
    //console.log("enumValues: ", enumValues);

    let categoriesToShow = [];
    if (
      this.props.sortQuery === "technology" ||
      this.props.sortQuery === "type"
    ) {
      enumValues.map((el, index) => {
        if (el[0] === "technology" || el[0] === "type") {
          if (el[0].includes(this.props.sortQuery)) {
            el[1].map((item) => categoriesToShow.push(item));
            //categoriesToShow.push(el[1]);
          }
        }
      });
    } else {
      categoriesToShow = [];
    }

    //console.log("this.props.data", this.props.data);
    return (
      <div>
        {this.props.sortQuery ? (
          <div>
            {categoriesToShow
              .filter((category) => {
                let keep;
                this.props.data.map((ress) => {
                  if (
                    ress.technology.includes(category) ||
                    ress.type.includes(category)
                  ) {
                    keep = category;
                  }
                });
                return keep;
              })
              .map((category, index) => {
                return (
                  <div key={index}>
                    <h3>{category}</h3>
                    <CarouselProvider
                      visibleSlides={visibleSlides}
                      totalSlides={this.props.data.length}
                      step={1}
                      naturalSlideWidth={50}
                      naturalSlideHeight={50}>
                      <div className="slider-container">
                        <Slider className="slider" key={index}>
                          {this.props.data.map((ressource, index) => {
                            if (this.props.sortQuery === "technology") {
                              if (ressource.technology.includes(category)) {
                                //console.log("coucou");
                                return (
                                  <Slide index={index}>
                                    <Card data={ressource} key={index} />
                                  </Slide>
                                );
                              }
                            }
                            if (this.props.sortQuery === "type") {
                              if (ressource.type.includes(category)) {
                                //console.log("coucou2");
                                return (
                                  <Slide index={index}>
                                    <Card data={ressource} key={index} />
                                  </Slide>
                                );
                              }
                            }
                          })}
                        </Slider>
                      </div>
                      <ButtonBack className={s.buttonBack}>Back</ButtonBack>
                      <ButtonNext className={s.buttonNext}>Next</ButtonNext>
                    </CarouselProvider>
                  </div>
                );
              })}
          </div>
        ) : (
          <div>
            {this.props.data.map((ressource, index) => (
              <Card data={ressource} key={index} />
            ))}
          </div>
        )}

        {/* <CarouselProvider
          visibleSlides={4}
          totalSlides={6}
          step={3}
          naturalSlideWidth={50}
          naturalSlideHeight={50}>
          <div className={s.container}>
            <Slider className={s.slider}>
              <Slide index={0}>I am the first Slide.</Slide>
              <Slide index={1}>I am the second Slide.</Slide>
              <Slide index={2}>I am the third Slide.</Slide>
              <Slide index={3}>I am the 3 Slide.</Slide>
              <Slide index={4}>I am the 4 Slide.</Slide>
              <Slide index={5}>I am the 4 Slide.</Slide>

              <ButtonBack className={s.buttonBack}>Back</ButtonBack>
              <ButtonNext className={s.buttonNext}>Next</ButtonNext>
            </Slider>
          </div>
        </CarouselProvider> */}
      </div>
    );
  }
}

export default Carousel;

{
  /* <CarouselProvider
  visibleSlides={3}
  totalSlides={3}
  step={3}
  naturalSlideWidth={200}
  naturalSlideHeight={300}>
  <div className={s.container}>
    <Slider className={s.slider}>
      <Slide index={0}>I am the first Slide.</Slide>
      <Slide index={1}>I am the second Slide.</Slide>
      <Slide index={2}>I am the third Slide.</Slide>
      <ButtonBack className={s.buttonBack}>Back</ButtonBack>
      <ButtonNext className={s.buttonNext}>Next</ButtonNext>
    </Slider>
  </div>
</CarouselProvider>; */
}
