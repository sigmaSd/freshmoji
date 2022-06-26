/** @jsx h */
import { h } from "preact";
import { useEffect, useState } from "preact/hooks";
import { tw } from "twind";
import { Emoji } from "https://deno.land/x/emoji@0.2.1/types.ts";

const Search = ({ setInput }: { setInput: (input: string) => void }) => {
  const inputStyle = tw`form-control
        block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none`;
  return (
    <div class={tw`m-5`}>
      <input
        class={inputStyle}
        onInput={(e) => {
          setInput((e.target! as HTMLInputElement).value);
        }}
      />
    </div>
  );
};

const Emojis = ({ filter }: { filter: string }) => {
  const [emojis, setEmojis] = useState<Emoji[]>([]);
  useEffect(() => {
    fetch("/api/emojis").then((r) => r.json()).then(setEmojis);
  });
  const copyToClipBoard = async (text: string) => {
    await navigator.clipboard.writeText(text);
  };
  return (
    <div class={tw`grid grid-cols-5 gap-4`}>
      {emojis &&
        emojis.filter((e) => e.aliases.some((a) => a.startsWith(filter))).map((
          e,
        ) => (
          <button
            onClick={() => {
              copyToClipBoard(e.emoji);
            }}
            class={tw`text-4xl`}
          >
            {e.emoji}
          </button>
        ))}
    </div>
  );
};

export default function Main() {
  const [input, setInput] = useState("");
  return (
    <div class={tw`grid place-content-center`}>
      <Search setInput={setInput} />
      <Emojis filter={input} />
    </div>
  );
}
