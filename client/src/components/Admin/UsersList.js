import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { deleteSubUser, getSubUsers } from "../../features/adminSlice";
import { Button } from "@mui/material";
import { DeleteOutline } from "@mui/icons-material";

export default function UsersList() {
  
  const subUsers = useSelector((state) => state.admin.subUsers);
  console.log("subUsers", subUsers);
  const dispatch = useDispatch();
  const columns = [
    //name,username,password
    {
      field: "id",
      title: "ID",
      type: "number",
    },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      editable: true,
    },
    {
      field: "username",
      headerName: "Username",
      flex: 1,
      editable: false,
    },
    {
      field: "password",
      headerName: "Password",
      flex: 1,
      editable: true,
    },
    {
      field: "phone",
      headerName: "Phone",
      flex: 1,
      editable: true,
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      editable: false,
      renderCell: (data) => {
        console.log("data", data);
        return (
          <Button
            variant="contained"
            sx={{ background: "rgb(230,0,0)" }}
            onClick={() => {
              dispatch(deleteSubUser(data.id));
            }}
          >
            <DeleteOutline />
          </Button>
        );
      },
    },
  ];
  React.useEffect(() => {
    console.log("getSubUsers");
    dispatch(getSubUsers());
  }, []);
  return (
    <div style={{ height: 300, width: "100%" }}>
      <DataGrid
        sx={{
          background: "white",
        }}
        rows={subUsers}
        columns={columns}
      />
    </div>
  );
}
