import { useRouter } from "next/navigation";
// MUI ICON COMPONENTS
import Delete from "@mui/icons-material/Delete";
import Edit from "@mui/icons-material/Edit";
import RemoveRedEye from "@mui/icons-material/RemoveRedEye";
// GLOBAL CUSTOM COMPONENTS
import { FlexBox } from "components/flex-box";
import { Paragraph, Small } from "components/Typography";
// CUSTOM UTILS LIBRARY FUNCTION
// STYLED COMPONENTS
import { IProduct } from "models/Product.model";
import { CategoryWrapper, StyledIconButton, StyledTableCell, StyledTableRow } from "../styles";

// ========================================================================


// ========================================================================

export default function ProductRow({ product }: { product: IProduct }) {
  const { property_details_uuid, property_details_name, insert_ts, property_type, property_city, property_state } = product || {};

  const router = useRouter();
  // const [productPublish, setProductPublish] = useState(published);

  return (
    <StyledTableRow tabIndex={-1} role="checkbox">
      <StyledTableCell align="left">
        <FlexBox alignItems="center" gap={1.5}>
          <div>
            <Paragraph fontWeight={600}>{property_details_name}</Paragraph>
            <Small color="grey.600">#{property_details_uuid}</Small>
          </div>
        </FlexBox>
      </StyledTableCell>

      <StyledTableCell align="left">
        <CategoryWrapper>{property_type}</CategoryWrapper>
      </StyledTableCell>   

      <StyledTableCell align="left">{insert_ts || "--"}</StyledTableCell>
      <StyledTableCell align="left">{property_city || "--"}</StyledTableCell>
      <StyledTableCell align="left">{property_state || "--"}</StyledTableCell>

      {/* <StyledTableCell align="left">
          <BazaarSwitch
          color="info"
        checked={productPublish}
         onChange={() => setProductPublish((state) => !state)}
        /> 
      </StyledTableCell> */}

      <StyledTableCell align="center">
        <StyledIconButton onClick={() => router.push(`/property/properties/manage/${property_details_uuid}`)}>
          <Edit />
        </StyledIconButton>

        <StyledIconButton>
          <RemoveRedEye />
        </StyledIconButton>

        <StyledIconButton>
          <Delete />
        </StyledIconButton>
      </StyledTableCell>
    </StyledTableRow>
  );
}
