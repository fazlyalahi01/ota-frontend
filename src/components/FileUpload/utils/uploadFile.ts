import { api } from "utils/api";

export const uploadFile = async (
  file: File | null,
  module_name: string,
  defaultReturn: string,
  asPayload: {
    [key: string]: string | number | null;
  },
  options?: {
    [key: string]: any;
  }
) => {
  if (file) {
    const formdata = new FormData();
    formdata.append("files", file);
    formdata.append("module_name", module_name);
    formdata.append("as_payload", JSON.stringify(asPayload));
    if (options) {
      formdata.append("options", JSON.stringify(options));
    }
    const res = await api.post("/general/upload", formdata, {});
    const data: string[] = res.data.data;
    if (data.length > 0) {
      return data[0];
    }
  }
  return defaultReturn;
};
