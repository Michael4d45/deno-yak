import { useEffect } from "preact/hooks";
import { Buffer, BufferType, ReaderType } from "./Buffer.ts";

let buffer: BufferType | null = null;

export const getBuffer = () => {
  if (buffer) return buffer;
  buffer = Buffer();
  return buffer;
};

export const useBuffer = (onWrite: ReaderType) => {
  useEffect(() => {
    getBuffer().onWrite(onWrite);

    return () => getBuffer().removeOnWrite(onWrite);
  }, [onWrite]);
};
