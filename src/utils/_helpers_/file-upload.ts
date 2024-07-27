import { api } from "utils/api";

export interface IFileUploadProps {
    heading?: string;
    label?: string;
    value: string | IFileUpload[] | null;
    multiple?: boolean;
    disabled?: boolean;
    deleteDisabled?: boolean;
    onMultiChange?: (data: IFileUpload[]) => void;
    onChange?: (file: File) => void;
    onDelete?: () => void;
}

export interface IFileUpload {
    key: string;
    path: string | null;
    file: File | null;
    name?: string;
}


export const uploadFile = async (
    file: File | null,
    module_name: string,
    defaultReturn: string,
    asPayload: {
        [key: string]: string | number | null;
    },
) => {
    if (file) {
        const formdata = new FormData();
        formdata.append("files", file);
        formdata.append("module_name", module_name);
        formdata.append("as_payload", JSON.stringify(asPayload));
        const res = await api.post("/general/upload-files", formdata);
        const data: string[] = res.data.data;
        if (data.length > 0) {
            return data[0];
        }
    }
    return defaultReturn;
};

export const uploadMultipleFile = async (
    files: IFileUpload[],
    module_name: string,
    asPayload: {
      [key: string]: string | number | null;
    }
  ) => {
    let filesCount = 0;
    const formdata = new FormData();
    for (let file of files) {
      if (file.file) {
        filesCount++;
        formdata.append("files", file.file);
      }
    }
    formdata.append("module_name", module_name);
    formdata.append("as_payload", JSON.stringify(asPayload));
    if (filesCount === 0) {
      return {files,
          paths: files.map((item) => item.path),
      };
    }
    const res = await api.post("/general/upload", formdata);
    const data: string[] = res.data.data;
    const finalList = [];
    let i = 0;
    if (data.length > 0) {
      for (let item of files) {
        const url = data[i];
        const obj = { ...item };
        if (item.file) {
          obj.file = null;
          obj.path = url;
          i++;
        }
        finalList.push(obj);
      }
      return {
          files: finalList,
          paths: finalList.map((item) => item.path),
        };
    }
  
    return {
      files,
      paths: files.map((item) => item.path),
    };
  };
