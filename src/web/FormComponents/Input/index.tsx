import React from "react";
import "./index.scss";

interface IInput {
  type?: string;
  name?: string;
  className?: string;
  defaultValue?: any;
}

export default function Input({
  type = "text",
  name,
  defaultValue,
  className = "",
}: IInput) {
  return (
    <input
      type={type}
      name={name}
      defaultValue={defaultValue}
      className={`news_feed__input ${className}`}
    />
  );
}
