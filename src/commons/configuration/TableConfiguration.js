import {
  getFormattedAmount,
  getFormattedDate,
  getStatusWithBadge,
} from "../utility/Utility";
import Delete from "../../components/Delete/Delete";
import Edit from "../../components/Edit/Edit";

const columnAlign = {
  headerAlign: "center",
  align: "center",
};
export const TableConfiguration = {
  columns: [
    {
      ...columnAlign,
      field: "datetime",
      headerName: "Date",
      width: 150,
      valueFormatter: (params) => {
        if (params.value == null) {
          return "";
        }

        return `${getFormattedDate(params.value)}`;
      },
    },
    {
      headerAlign: "center",
      field: "merchant",
      headerName: "Merchant",
      width: 150,
      valueGetter: (params) => {
        return `${params.value.name}`;
      },
    },
    {
      headerAlign: "center",
      field: "amount",
      headerName: "Amount(HKD)",
      type: "number",
      width: 110,
      renderCell: (params) => {
        return getFormattedAmount(params.row);
      },
    },
    {
      ...columnAlign,
      field: "status",
      headerName: "Status",
      width: 160,
      align: "center",
      renderCell: (params) => {
        return getStatusWithBadge(params.value);
      },
    },
    {
      ...columnAlign,
      field: "actions",
      type: "actions",
      width: 100,
      getActions: (params) => [
        <Edit {...params} mode="edit" />,
        <Delete {...params} />,
      ],
    },
  ],
};
