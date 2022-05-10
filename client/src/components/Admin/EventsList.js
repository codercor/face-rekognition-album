import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { deleteEvent, getAllEvents, updateEvent } from "../../features/adminSlice";
import { Button, MenuItem, Select } from "@mui/material";
import { baseURL } from "../../services/axios";
import { DeleteOutline } from "@mui/icons-material";

export default function EventsList() {
  const dispatch = useDispatch();
  const events = useSelector((state) => state.admin.events);
  const [selectedEvent, setSelectedEvent] = React.useState(null);
  const [selectedEventIndex, setSelectedEventIndex] = React.useState(null);
  const [columns, setColumns] = React.useState([]);
  const [rows, setRows] = React.useState([]);
  const SelectField = (props) => {
    const { id, value, api, field } = props;

    // const [age, setAge] = React.useState("");

    // const handleChange = (event) => {
    //   setAge(event.target.value);
    // };

    const handleChange = React.useCallback(
      (event) => {
        console.log(event.target.value);
        const editProps = {
          value: event.target.value,
        };

        api.commitCellChange({ id, field, props: editProps });
        api.setCellMode(id, field, "view");
      },
      [api, field, id]
    );

    return (
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={value}
        onChange={handleChange}
      >
        <MenuItem value={true}>TRUE</MenuItem>
        <MenuItem value={false}>FALSE</MenuItem>
      </Select>
    );
  };
  function renderSelectEditCell(params) {
    return <SelectField {...params} />;
  }
  React.useEffect(() => {
    dispatch(getAllEvents());
    setColumns([
      {
        field: "id",
        headerName: "ID",
        hide: true,
      },
      {
        /* mui datagrid columns */
        field: "name",
        headerName: "Event Name",
        description: "Name of the event",
        sortable: true,
        editable: false,
        flex: 1,
      },
      {
        field: "isPaid",
        headerName: "Paid",
        description: "Is the event paid",
        editable: true,
        flex: 1,
        //renderCell: (rowData) => rowData.value ? "💲" : "🆓",
        renderEditCell: renderSelectEditCell,
      },
      {
        field: "backgroundImage",
        headerName: "Background",
        flex: 1,
        description: "Background image of the event",
        renderCell: (rowData) => {
          return (
            <img
              style={{
                height: "100%",
              }}
              src={baseURL + "/public/backgrounds/" + rowData.value}
              alt="background"
              onError={(e) => {
                e.target.parentElement.innerHTML = "-";
              }}
            />
          );
        },
      },
      {
        headerName: "Actions",
        field: "actions",
        flex: 0.3,
        renderCell: (params) => {
          return (
            <Button variant="contained" color="primary" onClick={() => {
                let eventName = params.row.name;
                dispatch(deleteEvent(eventName));
            }}>
              <DeleteOutline />
            </Button>
          );
        },
      },
    ]);
  }, []);
  React.useEffect(() => {
    setRows(events);
  }, [events]);
  return (
    <div style={{ height: 300, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        onCellEditCommit={(props, event) => {
          let eventsCopy = [...events];
          let changedEvent = eventsCopy.find((event) => event.id === props.id);
          dispatch(
            updateEvent({
              ...changedEvent,
              [props.field]: props.props.value,
            })
          );
        }}
      />
    </div>
  );
}
