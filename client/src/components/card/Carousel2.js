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

class Carousel2 extends React.Component {
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
    const enumValues = Object.entries(this.state.enumValues);

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
                    <section className="carousel">
                      <ul className="carousel-items">
                        {this.props.data.map((ressource, index) => {
                          if (this.props.sortQuery === "technology") {
                            if (ressource.technology.includes(category)) {
                              //console.log("coucou");
                              return (
                                <li class="carousel-item">
                                  <Card data={ressource} key={index} />
                                </li>
                              );
                            }
                          }
                          if (this.props.sortQuery === "type") {
                            if (ressource.type.includes(category)) {
                              //console.log("coucou2");
                              return (
                                <li class="carousel-item">
                                  <Card data={ressource} key={index} />
                                </li>
                              );
                            }
                          }
                        })}
                      </ul>
                    </section>
                  </div>
                );
              })}
          </div>
        ) : (
          <div className="home-card-container">
            {this.props.data.map((ressource, index) => (
              <Card data={ressource} key={index} />
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default Carousel2;
