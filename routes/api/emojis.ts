import { Handlers } from "$fresh/server.ts";
import * as emoji from "https://deno.land/x/emoji@0.2.1/mod.ts";

export const handler: Handlers = {
  GET() {
    return new Response(JSON.stringify(emoji.all()));
  },
};
