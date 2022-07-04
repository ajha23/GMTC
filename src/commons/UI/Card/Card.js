import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";

const ContainerCards = (props) => {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>{props.children}</CardContent>
      <CardActions>{props.actions}</CardActions>
    </Card>
  );
};

export default ContainerCards;
