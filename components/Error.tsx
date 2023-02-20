import { FunctionComponent } from "preact";

interface Props {
  error: string;
}

const Error: FunctionComponent<Props> = ({ error }) => {
  return (
    <div class="w-full h-full flex flex-col text-red-500">
      <div>Errors</div>
      {error}
    </div>
  );
};

export default Error;
