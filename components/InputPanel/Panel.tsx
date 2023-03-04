import { YakType } from "../../Yak/useYak.ts";
import Input from "./Input.tsx";

const InputPanel = ({ onSubmit }: YakType) => (
  <div class="w-1/3 bg-gray-100">
    <Input {...{ onSubmit }} />
  </div>
);

export default InputPanel;
