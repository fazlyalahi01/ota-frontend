"use client";

import { useState } from "react";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
// GLOBAL CUSTOM COMPONENTS
import Scrollbar from "components/scrollbar";
import { TableHeader, TablePagination } from "components/data-table";
// GLOBAL CUSTOM HOOK
import useMuiTable from "hooks/useMuiTable";
//  LOCAL CUSTOM COMPONENT
import ProductRow from "../product-row";
import SearchArea from "../../search-box";
import PageWrapper from "../../page-wrapper";
import { IProduct } from "models/Product.model";
// CUSTOM DATA MODEL

// TABLE HEADING DATA LIST
const tableHeading = [
  { id: "name", label: "Name", align: "left" },
  { id: "property_type", label: "Property Type", align: "left" },
  { id: "insert_ts", label: "Created at", align: "left" },
  { id: "property_city", label: "City", align: "left" },
  { id: "property_state", label: "State", align: "left" },
  { id: "action", label: "Action", align: "center" }
];

// =============================================================================
type Props = { products: IProduct[] };
// =============================================================================

export default function ProductsPageView({ products }: Props) {
  const [productList, setProductList] = useState<IProduct[]>([...products]);

  console.log(productList, "products");

  // RESHAPE THE PRODUCT LIST BASED TABLE HEAD CELL ID
  // const filteredProducts = productList.map((item) => ({
  //   property_details_uuid: item.property_details_uuid,
  //   property_details_name: item.property_details_name,
  //   insert_ts: item.insert_ts,    
  // }));

  const {
    order,
    orderBy,
    selected,
    rowsPerPage,
    filteredList,
    handleChangePage,
    handleRequestSort
  } = useMuiTable({ listData: productList });

  return (
    <PageWrapper title="Property List">
      <SearchArea
        handleSearch={() => {}}
        buttonText="Add Property"
        url="/property/properties/manage-property"
        searchPlaceholder="Search Property..."
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
                rowCount={products.length}
                numSelected={selected.length}
                onRequestSort={handleRequestSort}
              />

              <TableBody>
                {productList.map((product, index) => (
                  <ProductRow key={index} product={product} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <Stack alignItems="center" my={4}>
          <TablePagination
            onChange={handleChangePage}
            count={Math.ceil(products.length / rowsPerPage)}
          />
        </Stack>
      </Card>
    </PageWrapper>
  );
}
