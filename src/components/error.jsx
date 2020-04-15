import React from "react";
import { Alert } from "@material-ui/lab";

export default props => (
  <div className="error">
    <Alert severity="error">
      <strong>ERROR</strong> - Please enter a title before searching!
    </Alert>
  </div>
);
