import * as mod from "https://deno.land/std@0.192.0/html/entities.ts";

export const makeSafeForMarkdown = (text: string) => mod.escape(text);