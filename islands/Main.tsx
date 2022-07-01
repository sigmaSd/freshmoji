/** @jsx h */
import { h } from "preact";
import { useEffect, useState } from "preact/hooks";
import { tw } from "twind";
import { Emoji } from "https://deno.land/x/emoji@0.2.1/types.ts";

const Search = ({ setInput }: { setInput: (input: string) => void }) => {
  const inputStyle = tw`form-control placeholder-black::placeholder
        block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-black-500
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none`;
  return (
    <div class={tw`m-5`}>
      <input
        placeholder="search for emoji"
        class={inputStyle}
        onInput={(e) => {
          setInput((e.target! as HTMLInputElement).value);
        }}
      />
    </div>
  );
};

const Emojis = (
  { filter, setShowAlert }: {
    filter: string;
    setShowAlert: (showAlert: boolean) => void;
  },
) => {
  const [emojis, setEmojis] = useState<Emoji[]>([]);
  useEffect(() => {
    fetch("/api/emojis").then((r) => r.json()).then(setEmojis);
  }, []);
  const copyToClipBoard = async (text: string) => {
    await navigator.clipboard.writeText(text);
  };
  return (
    <div class={tw`grid grid-cols-5 gap-4 bg-blue-50 `}>
      {emojis &&
        emojis.filter((e) => e.aliases.some((a) => a.includes(filter)))
          .map((
            e,
          ) => (
            <button
              onClick={() => {
                copyToClipBoard(e.emoji);
                setTimeout(() => setShowAlert(false), 500);
                setShowAlert(true);
              }}
              class={tw`text-4xl border-red-300 border-2 rounded-2xl `}
            >
              {e.emoji}
            </button>
          ))}
    </div>
  );
};

const Alert = ({ showAlert }: { showAlert: boolean }) => {
  return (
    <div
      style={{ display: showAlert ? "" : "none" }}
      class={tw`font-bold text-red-600 text-lg bg-green-300 fixed`}
    >
      Copied to clipboard!
    </div>
  );
};
export default function Main() {
  const [input, setInput] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  return (
    <div>
      <Alert showAlert={showAlert} />
      <div class={tw`grid place-content-center min-h-screen bg-yellow-200 `}>
        <Search setInput={setInput} />
        <Emojis filter={input} setShowAlert={setShowAlert} />
      </div>
    </div>
  );
}
