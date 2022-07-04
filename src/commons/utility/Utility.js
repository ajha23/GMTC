import { format, parseISO } from "date-fns";
import Badge from "@mui/material/Badge";
import SpaIcon from '@mui/icons-material/Spa';
import PhoneIcon from '@mui/icons-material/Phone';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import PaymentsIcon from '@mui/icons-material/Payments';
import FlightIcon from '@mui/icons-material/Flight';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import MovieIcon from '@mui/icons-material/Movie';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import ChairIcon from '@mui/icons-material/Chair';

export const updateObject = (oldObject, updatedValues) => {
  return {
    ...oldObject,
    ...updatedValues,
  };
};

export const getFormattedAmount = (row) => {
  if (row.type === "CREDIT") {
    return <p style={{ color: "green" }}>{row.amount.toFixed(2)}</p>;
  }
  return <p>-{row.amount.toFixed(2)}</p>;
};

export const getFormattedDate = (date) => format(parseISO(date), "dd MMM YYY");

export const getStatusWithBadge = (value) => {
  switch (value) {
    case "MANUAL":
      return <Badge badgeContent={value} color="primary" />;
    case "PENDING":
      return <Badge badgeContent={value} color="warning" />;
    default:
      return <Badge badgeContent={value} color="success" />;
  }
};

export const getCategoryWithIcon = (value) => {
  switch (value) {
    case "ENTERTAINMENT":
      return <MovieIcon />;
    case "TRAVEL":
      return <FlightIcon />;
    case "DINING":
      return <LocalDiningIcon />;
    case "ELECTRONIC":
      return <ElectricBoltIcon />;
    case "FURNITURE":
      return <ChairIcon />;
    case "PERSONAL_WELLNESS":
      return <SpaIcon />;
    case "RETAIL_CHAINS":
    case "SUPERMARKETS":
      return <LocalGroceryStoreIcon />;
    case "TELECOM":
      return <PhoneIcon />;
    default:
      return <PaymentsIcon />;
  }
};
