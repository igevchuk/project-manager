import React from "react";
import { TextField } from "@material-ui/core";

export default function(props) {
  return (
    <TextField
      {...props}
      name={props.name}
      type={props.type || "text"}
      label={props.label}
      placeholder={props.placeholder || ""}
      onChange={e => props.onChange(props.name, e.target.value)}
    />
  );
}
