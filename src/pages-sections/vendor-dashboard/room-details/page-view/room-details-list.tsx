"use client";

import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import React from "react";
// GLOBAL CUSTOM COMPONENTS
import { TableHeader, TablePagination } from "components/data-table";
import Scrollbar from "components/scrollbar";
// GLOBAL CUSTOM HOOK
import useMuiTable from "hooks/useMuiTable";
//  LOCAL CUSTOM COMPONENT
import PageWrapper from "../../page-wrapper";
import SearchArea from "../../search-box";
// CUSTOM DATA MODEL
import { getAllRoomTypeList } from "utils/__api__/room-type";
import { getAllRoomDetailsList } from "utils/__api__/room-details";
import RoomDetailsTableRow from "../_components/table-row";
import { IRoomDetails } from "models/Room-details.model";

// TABLE HEADING DATA LIST
const tableHeading = [
  { id: "room_area", label: "Area", align: "left" },
  { id: "bed_type", label: "Bed Type", align: "left" },
  { id: "view_type", label: "View Type", align: "left" },
  { id: "max_no_of_guests", label: "Max No of Guests", align: "left" },  
  { id: "action", label: "Action", align: "center" }
];

// =============================================================================

// =============================================================================

export default function RoomDetailsListView() {

  const [roomDetails, setRoomDetails] = React.useState<IRoomDetails[]>([])
  React.useEffect(() => {
    const fetchData = async () => {
      const data = await getAllRoomDetailsList();
      setRoomDetails(data)
    }
    fetchData()
  }, [])

  const {
    order,
    orderBy,
    selected,
    rowsPerPage,
    filteredList,
    handleChangePage,
    handleRequestSort
  } = useMuiTable({ listData: roomDetails });

  return (
    <PageWrapper title="Room Details List">
      <SearchArea
        handleSearch={() => {}}
        buttonText="Add New"
        url="/property/room-details/manage-room-details"
        searchPlaceholder="Search here..."
      />

      <Card>
        <Scrollbar autoHide={false}>
          <TableContainer sx={{ minWidth: 900 }}>
            <Table>
              <TableHeader
                order={order}
                hideSelectBtn
                orderBy={orderBy}
                heading={tableHeading}
                rowCount={roomDetails.length}
                numSelected={selected.length}
                onRequestSort={handleRequestSort}
              />

              <TableBody>
                {roomDetails.map((data, index) => (
                  <RoomDetailsTableRow key={index} item={data} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <Stack alignItems="center" my={4}>
          <TablePagination
            onChange={handleChangePage}
            count={Math.ceil(roomDetails.length / rowsPerPage)}
          />
        </Stack>
      </Card>
    </PageWrapper>
  );
}
