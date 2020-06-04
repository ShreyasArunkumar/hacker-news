import React from "react";
import "./index.scss";

interface IButton {
  type?: "submit" | "button" | "reset";
  children: any;
}

export default function Button({ type = "button", children }: IButton) {
  return (
    <button className="news_feed__button" type={type}>
      {children}
    </button>
  );
}
