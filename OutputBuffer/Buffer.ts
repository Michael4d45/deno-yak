export type ReaderType = (str: string) => void;

export const Buffer = () => {
  const readers = new Set<ReaderType>();

  const write = (str: string) => {
    if (readers.size === 0) console.log(str);
    else readers.forEach((read) => read(str));
  };

  const onWrite = (reader: ReaderType) => readers.add(reader);

  const removeOnWrite = (reader: ReaderType) => readers.delete(reader);

  return {
    write,
    onWrite,
    removeOnWrite,
  };
};

export type BufferType = ReturnType<typeof Buffer>;
