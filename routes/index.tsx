import { Head } from "$fresh/runtime.ts";
import PlayGround from "../islands/PlayGround.tsx";

export default function Home() {
  return (
    <>
      <Head>
        <title>Yak</title>
      </Head>
      <PlayGround />
    </>
  );
}
