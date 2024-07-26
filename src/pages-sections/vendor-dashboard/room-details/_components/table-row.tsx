import { useRouter } from "next/navigation";
// MUI ICON COMPONENTS
import Delete from "@mui/icons-material/Delete";
import Edit from "@mui/icons-material/Edit";
// GLOBAL CUSTOM COMPONENTS
import { FlexBox } from "components/flex-box";
import { Paragraph, Small } from "components/Typography";
// CUSTOM UTILS LIBRARY FUNCTION
import { IRoomDetails } from "models/Room-details.model";
import { CategoryWrapper, StyledIconButton, StyledTableCell, StyledTableRow } from "../../styles";


export default function RoomDetailsTableRow({ item }: { item: IRoomDetails }) {
  const { room_details_uuid, room_area, bed_type, view_type, max_no_of_guests } = item || {};

  const router = useRouter();
  // const [productPublish, setProductPublish] = useState(published);

  return (
    <StyledTableRow tabIndex={-1} role="checkbox">
      <StyledTableCell align="left">
        <FlexBox alignItems="center" gap={1.5}>
          <div>
            <Paragraph fontWeight={600}>{room_area}</Paragraph>
            <Small color="grey.600">#{room_details_uuid}</Small>
          </div>
        </FlexBox>
      </StyledTableCell>

      <StyledTableCell align="left">
        <CategoryWrapper>{bed_type}</CategoryWrapper>
      </StyledTableCell>

      <StyledTableCell align="left">{view_type || "--"}</StyledTableCell>      
      <StyledTableCell align="left">{max_no_of_guests || "--"}</StyledTableCell>      

      <StyledTableCell align="center">
        <StyledIconButton onClick={() => router.push(`/property/room-details/${room_details_uuid}`)}>
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
