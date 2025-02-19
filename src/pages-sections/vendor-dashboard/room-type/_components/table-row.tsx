import { useRouter } from "next/navigation";
// MUI ICON COMPONENTS
import Delete from "@mui/icons-material/Delete";
import Edit from "@mui/icons-material/Edit";
// GLOBAL CUSTOM COMPONENTS
import { FlexBox } from "components/flex-box";
import { Paragraph, Small } from "components/Typography";
// CUSTOM UTILS LIBRARY FUNCTION
import { IRoomType } from "models/Room-type.model";
import { CategoryWrapper, StyledIconButton, StyledTableCell, StyledTableRow } from "../../styles";


export default function RoomTypeTableRow({ item }: { item: IRoomType }) {
  const { room_types_uuid, property_details_name, types_name, total_room, status } = item || {};

  const router = useRouter();
  // const [productPublish, setProductPublish] = useState(published);

  return (
    <StyledTableRow tabIndex={-1} role="checkbox">
      <StyledTableCell align="left">
        <FlexBox alignItems="center" gap={1.5}>
          <div>
            <Paragraph fontWeight={600}>{property_details_name}</Paragraph>
            <Small color="grey.600">#{room_types_uuid}</Small>
          </div>
        </FlexBox>
      </StyledTableCell>

      <StyledTableCell align="left">
        <CategoryWrapper>{types_name}</CategoryWrapper>
      </StyledTableCell>

      <StyledTableCell align="left">{total_room || "--"}</StyledTableCell>
      <StyledTableCell align="left">{status || "--"}</StyledTableCell>

      <StyledTableCell align="center">
        <StyledIconButton onClick={() => router.push(`/property/room-type/${room_types_uuid}`)}>
          <Edit />
        </StyledIconButton>

        {/* <StyledIconButton>
          <RemoveRedEye />
        </StyledIconButton> */}

        <StyledIconButton>
          <Delete />
        </StyledIconButton>
      </StyledTableCell>
    </StyledTableRow>
  );
}
