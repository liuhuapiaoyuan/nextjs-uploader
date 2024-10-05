"use client";
import { uploadFile } from "@/lib/upload";
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useReducer,
} from "react";

export type UploadFileStatus = "uploading" | "done" | "error";

function generateId() {
  const time = Date.now();
  return time + "_" + Math.random().toString(36).substr(2, 9);
}

export type UploadFile = {
  status: UploadFileStatus;
  name?: string;
  size?: number;
  progress?: number;
  url: string;
  error?: string;
  id: string;
};

export interface IUploadContext {
  upload: (file: File) => void;
  cancelUpload: (index: number) => void;
  remove: (index: number) => void;
  resort: (ids: string[]) => void;
  uploads: UploadFile[];
  maxCount?: number;
  accept?: string;
  multiple?: boolean;
}

export const UploadContext = createContext<IUploadContext>({
  upload: () => {},
  cancelUpload: () => {},
  remove: () => {},
  resort: () => {},
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
  | { type: "update"; payload: Partial<UploadFile>; id: string }
  | { type: "updateByIndex"; payload: Partial<UploadFile>; index: number }
  | { type: "remove"; index: number }
  | { type: "resort"; ids: string[] };

function reducer(state: UploadFile[], action: Action) {
  switch (action.type) {
    case "add":
      return [...state, action.payload];
    case "updateByIndex":
      return state.map((file, index) => {
        if (index === action.index) {
          return { ...file, ...action.payload };
        }
        return file;
      });
    case "update":
      return state.map((file) => {
        if (file.id === action.id) {
          return { ...file, ...action.payload };
        }
        return file;
      });
    case "remove":
      return state.filter((_, index) => index !== action.index);
    case "resort":
      const ids = action.ids;
      return state
        .map((file) => {
          const index = ids.indexOf(file.id);
          return { ...file, index };
        })
        .sort((a, b) => a.index - b.index)
        .map((file) => {
          const { index, ...rest } = file;
          return rest;
        });
    default:
      throw new Error();
  }
}

export type UploadContainerType = PropsWithChildren<{
  files?: UploadFile[];
  maxCount?: number;
  accept?: string;
  multiple?: boolean;
  onError?: (error: Error) => void;
  fileUploadService?: (
    file: File,
    onProgress: (progress: { loaded: number; total: number }) => void
  ) => Promise<string>;
}>;

export function UploadContainer(props: UploadContainerType) {
  const {
    onError,
    fileUploadService,
    files,
    maxCount = 10,
    accept,
    multiple,
  } = props;
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
        id: generateId(),
      };
      if (isSingle && uploads.length != 0) {
        newUpload.id = uploads[0].id;
        dispatch({ type: "update", id: newUpload.id, payload: newUpload });
      } else {
        dispatch({ type: "add", payload: newUpload });
      }

      // 开始上传
      fileUploadService?.(file, (progress) => {
        dispatch({
          type: "update",
          id: newUpload.id,
          payload: {
            status: "uploading",
            progress: progress.loaded,
            size: progress.total,
          },
        });
      }).then(()=>{
        dispatch({
          type: "update",
          id: newUpload.id,
          payload: {
            status: "done",
          },
        });
      }).catch(error=>{
        dispatch({
          type: "update",
          id: newUpload.id,
          payload: {
            status: "error",
            error: error.message,
          },
        });
      })
    };
  };

  const cancelUpload = (index: number) => {
    dispatch({ type: "remove", index: isSingle ? 0 : index });
  };
  const resort = useCallback((ids: string[]) => {
    dispatch({ type: "resort", ids });
  }, []);
  return (
    <UploadContext.Provider
      value={{
        upload,
        resort,
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
 