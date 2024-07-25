import { Add, Delete } from "@mui/icons-material";
import { Box, IconButton, InputAdornment, styled } from "@mui/material";
import CustomTextField from "components/form-componet/CustomTextField";

interface Props {
    index: number;
    value: string;
    placeholder?: string; 
    isDisabled: boolean; 
    onAdd: (index: number) => void;
    onDelete: (index: number) => void;
    onChange: (index: number, value: string) => void;
}
export const StyledIconButton = styled(IconButton)(({ theme }) => ({
    padding: theme.spacing(0.2),
}));

export const PrimaryIconButton = styled(StyledIconButton)(({ theme }) => ({
    color: theme.palette.info.main
}))

export const DangerIconButton = styled(StyledIconButton)(({ theme }) => ({
    color: theme.palette.error.main
}))
export default function IncrementalTextfield({ index, value, placeholder="",  isDisabled, onAdd, onDelete, onChange }: Props) {
    return (
        <Box sx={{marginBottom: 1}}>
            <CustomTextField
                fullWidth
                placeholder={placeholder}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <PrimaryIconButton onClick={() => onAdd(index)}>
                                <Add fontSize="small" />
                            </PrimaryIconButton>
                            <DangerIconButton onClick={() => onDelete(index)} disabled={isDisabled}>
                                <Delete fontSize="small" />
                            </DangerIconButton>
                        </InputAdornment>
                    ),
                }}
                onChange={(e) => onChange(index, e.target.value)}                
                value={value}
            />
        </Box>
    )

}