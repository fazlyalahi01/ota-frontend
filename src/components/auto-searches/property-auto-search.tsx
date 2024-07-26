/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import { debounce } from "lodash";
import { Box, Stack, CircularProgress } from "@mui/material";
import { defaultProperty, IProperty } from "models/Property.model";
import CustomFormLabel from "components/form-componet/CustomFormLabel";
import CustomTextField from "components/form-componet/CustomTextField";
import { api } from "utils/api";

const INITIAL_STATE: IProperty = defaultProperty;

export interface IPropertyAutoSearchProps {
    label: string;
    value: any;
    onSelect: (data: IProperty) => void;
    disabled?: boolean;
    error?: string;
  }

export const PropertyAutoSearch: React.FC<IPropertyAutoSearchProps> = (
  props,
) => {
  const { label, value, onSelect, disabled, error } = props;
  const [options, setOptions] = React.useState<readonly IProperty[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [search, setSearchText] = React.useState<any>("");
  const [openUserDialog, setOpenUserDialog] = React.useState(false);
  const [fieldValue, setFieldValue] = React.useState<IProperty | null>(null);

  const fetchSuggestion = async (value: string) => {
    setLoading(true);
    try {
      let url = `/property/get-property?columns=property_details_name&value=${value}&pageNo=1&itemPerPage=20`;
      if (value === "") {
        url = `/property/get-property?pageNo=1&itemPerPage=20`;
      }
      const res = await api.get(url);
      const finalData: IProperty[] = res.data.data;
      setOptions(finalData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  const debounceFn = React.useCallback(debounce(fetchSuggestion, 800), []);

  const getOptionLabel = (option: IProperty) => {
    return option.property_details_name;
  };

  const getValue = () => {
    let newValue: IProperty | null = null;
    if (value && typeof value === "object") {
      newValue =
        options.find((option) => option.property_details_uuid === value?.property_details_uuid) ||
        null;
    } else {
      newValue = options.find((option) => option.property_details_uuid === value) || null;
    }
    setFieldValue(newValue);
  };

  const handleToggle = () => {
    setOpenUserDialog(!openUserDialog);
  };

  React.useEffect(() => {
    if (search && search !== value && search.length > 2) {
      debounceFn(search);
    }
  }, [search]);

  React.useEffect(() => {
    fetchSuggestion("");
  }, []);

  React.useEffect(() => {
    getValue();
  }, [value, options]);

  React.useEffect(() => {
    if (value && typeof value === "object" && value?.user_uuid?.length > 0) {
      const option: IProperty = {
        ...INITIAL_STATE,
        property_details_uuid: value.property_details_uuid,
        property_details_name: value.property_details_name,
      };
      setOptions([option]);
    }
  }, [value]);

  return (
    <>
      {label && (
        <Box display="flex" justifyContent={"flex-start"} alignItems="center">
          <CustomFormLabel display={"block"}>{` ${label}  `}</CustomFormLabel>
          {/* {search.length > 0 && options.length === 0 && !loading && (
            <Box
              sx={{
                paddingLeft: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                marginTop: 1,
              }}
              onClick={handleToggle}
            >
              <AddCircleIcon fontSize="small" color="primary" />
              <Typography
                variant="h6"
                color="primary"
                marginLeft={0.5}
                marginTop={0.3}
                fontWeight={500}
              >
                Add Br
              </Typography>
            </Box>
          )} */}
        </Box>
      )}
      <Stack direction={"row"} justifyContent={"space-between"} spacing={1}>
        <Autocomplete
          id="google-map-demo"
          fullWidth
          disabled={disabled}
          sx={{
            ".MuiOutlinedInput-root": {
              paddingTop: "2px",
              paddingBottom: "2px",
              fontSize: "0.8rem",
              color: "rgb(38, 38, 38)",
              width: "100%",
              backgroundColor: disabled ? "#f8f9fb" : "inherit",
            },
          }}
          getOptionLabel={getOptionLabel}
          isOptionEqualToValue={(option, value) =>
            typeof option === "string"
              ? option === value //@ts-ignore
              : option.customer_name === value.customer_name
          }
          filterOptions={(x) => x}
          options={options}
          autoComplete
          includeInputInList
          value={fieldValue}
          loading={loading}
          noOptionsText="No Matched Data Found"
          //@ts-ignore
          onChange={(
            event: React.ChangeEvent<HTMLElement>,
            newValue: IProperty | null,
          ) => {
            if (newValue) {
              onSelect(newValue);
            }
          }}
          onInputChange={(event, newInputValue) => {
            if ((event && event.type === "change") || !newInputValue) {
              setSearchText(newInputValue);
            }
          }}
          renderInput={(params) => (
            <CustomTextField
              {...params}
              fullWidth
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <React.Fragment>
                    {loading && <CircularProgress color="inherit" size={20} />}
                    {params.InputProps.endAdornment}
                  </React.Fragment>
                ),
              }}
              disabled={disabled}
              error={error ? true : false}
              helperText={error}
            />
          )}
        />
      </Stack>
    </>
  );
};
