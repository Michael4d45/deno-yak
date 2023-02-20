import { Head } from "$fresh/runtime.ts";
import REPL from "../islands/REPL.tsx";

export default function Home() {
  return (
    <>
      <Head>
        <title>Yak</title>
      </Head>
      <REPL />
    </>
  );
}
