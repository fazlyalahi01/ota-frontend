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
import { IRoomType } from "models/Room-type.model";
import { getAllRoomTypeList } from "utils/__api__/room-type";
import RoomTypeTableRow from "../_components/table-row";

// TABLE HEADING DATA LIST
const tableHeading = [
  { id: "property_details_name", label: "Property Name", align: "left" },
  { id: "types_name", label: "Room Type", align: "left" },
  { id: "total_room", label: "Total Room", align: "left" },
  { id: "status", label: "Status", align: "left" },  
  { id: "action", label: "Action", align: "center" }
];

// =============================================================================

// =============================================================================

export default function RoomTypeListView() {

  const [roomTypes, setRoomTypes] = React.useState<IRoomType[]>([])
  React.useEffect(() => {
    const fetchData = async () => {
      const data = await getAllRoomTypeList();
      setRoomTypes(data)
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
  } = useMuiTable({ listData: roomTypes });

  return (
    <PageWrapper title="Room Type List">
      <SearchArea
        handleSearch={() => {}}
        buttonText="Add New"
        url="/property/room-type/manage-room-type"
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
                rowCount={roomTypes.length}
                numSelected={selected.length}
                onRequestSort={handleRequestSort}
              />

              <TableBody>
                {roomTypes.map((data, index) => (
                  <RoomTypeTableRow key={index} item={data} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <Stack alignItems="center" my={4}>
          <TablePagination
            onChange={handleChangePage}
            count={Math.ceil(roomTypes.length / rowsPerPage)}
          />
        </Stack>
      </Card>
    </PageWrapper>
  );
}
