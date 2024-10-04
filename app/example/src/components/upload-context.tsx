"use client";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useReducer,
} from "react";

export type UploadFileStatus = "uploading" | "done" | "error";

function generateId() {
  const time = Date.now()
  return time +"_" + Math.random().toString(36).substr(2, 9);
}

export type UploadFile = {
  status: UploadFileStatus;
  name?: string;
  size?: number;
  progress?: number;
  url: string;
  error?: string;
  id:string
};

export interface IUploadContext {
  upload: (file: File) => void;
  cancelUpload: (index: number) => void;
  remove: (index: number) => void;
  resort: (ids:string[]) => void;
  uploads: UploadFile[];
  maxCount?: number;
  accept?: string;
  multiple?: boolean;
}

export const UploadContext = createContext<IUploadContext>({
  upload: () => {},
  cancelUpload: () => {},
  remove: () => {},
  resort: () =>{},
  uploads: [],
});

export const useUploadContext = () => {
  const context = useContext(UploadContext);
  if (!context) {
    throw new Error("useUploadContext must be used within an UploadContext");
  }
  return context;
};
export type Action =
  | { type: "add"; payload: UploadFile }
  | { type: "update"; payload: UploadFile; index: number }
  | { type: "remove"; index: number }
  | { type: "resort"; ids:string[] };

function reducer(state: UploadFile[], action: Action) {
  switch (action.type) {
    case "add":
      return [...state, action.payload];
    case "update":
      return state.map((file, fileIndex) =>
        fileIndex === action.index ? { ...file, ...action.payload,id:file.id } : file
      );
    case "remove":
      return state.filter((_, index) => index !== action.index);
    case "resort":
      const ids = action.ids;
      return state.map((file) => {
        const index = ids.indexOf(file.id);
        return {...file, index };
      }).sort((a, b) => a.index - b.index).map((file) => {
        const { index,...rest } = file;
        return rest;
      });
    default:
      throw new Error();
  }
}

export function UploadContainer(
  props: PropsWithChildren<{
    files?: UploadFile[];
    maxCount?: number;
    accept?: string;
    multiple?: boolean;
    onError?: (error: Error) => void;
  }>
) {
  const { onError, files, maxCount = 10, accept, multiple } = props;
  // 单图模式，会自动替换
  const isSingle = maxCount == 1;
  const [uploads, dispatch] = useReducer(reducer, files || []);

  const upload = (file: File) => {
    if (!isSingle && uploads.length >= maxCount) {
      console.warn(`Maximum number of files reached (${maxCount})`);
      onError?.(new Error("Maximum number of files reached"));
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const url = reader.result as string;
      const newUpload: UploadFile = {
        status: "uploading",
        name: file.name,
        size: file.size,
        progress: 0,
        url,
        id: generateId()
      };
      if (isSingle && uploads.length!=0) {
        dispatch({ type: "update", index: 0, payload: newUpload });
      } else {
        dispatch({ type: "add", payload: newUpload });
      }
    };
  };

  const cancelUpload = (index: number) => {
    dispatch({ type: "remove", index: isSingle ? 0 : index });
  };

  return (
    <UploadContext.Provider
      value={{
        upload,
        resort(ids) {
          dispatch({ type: "resort", ids });
        },
        maxCount,
        accept,
        multiple,
        cancelUpload,
        remove: (index: number) => {
          dispatch({ type: "remove", index });
        },
        uploads,
      }}
    >
      {props.children}
    </UploadContext.Provider>
  );
}
