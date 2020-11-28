import React from "react";
import FilterInput from "./FilterInput";
import { getEnumValues } from "../auth/auth-service"

class Filters extends React.Component {
  state = {
    technology: [
      "all",
      "api",
      "browser",
      "css",
      "design",
      "express",
      "handlebars",
      "html",
      "javascript",
      "mongodb",
      "nodejs",
      "reactjs",
      "vscode",
    ],
    type: [
      "article",
      "blog",
      "book",
      "documentation",
      "e-learning",
      "extension",
      "interview-preparation",
      "library",
      "people",
      "tips",
      "tool",
      "training",
      "tutorial",
      "video",
    ],
    level: ["every force", "padawan", "jedi", "master jedi"],
    price: ["free", "paid", "freemium"],
    language: ["french", "english"],
  };

  

  render() {
    return (
      <>
        <FilterInput dataFilters={this.state.technology} />
      </>
    );
  }
}

export default Filters;
