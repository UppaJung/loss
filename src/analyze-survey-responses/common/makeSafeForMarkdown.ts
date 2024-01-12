import * as mod from "https://deno.land/std@0.192.0/html/entities.ts";

/**
 * Make a string safe for markdown (which also means safe for HTML)
 * @param text 
 * @returns 
 */
export const makeSafeForMarkdown = (text: string) => mod.escape(text);