import { surveyFormatterFactory } from "./formatter-factory.ts";

const htmlEncode = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const depthToTabs = (depth: number) => "\t".repeat(depth);
const tag = (
  tagName: string,
  { depth, class: classes, singleLine = false }: { depth: number; class?: string | string[]; singleLine?: boolean; },
  ...content: string[]
) => {
  const openTag = `<${tagName}${classes == null ? "" : ` class="${Array.isArray(classes) ? classes.join(" ") : classes}"`}>`;
  const closeTag = `</${tagName}>`;
  if (singleLine) {
    return `${depthToTabs(depth)}${openTag}${content.join("")}${closeTag}${"\n"}`;
  } else {
    return `${depthToTabs(depth)}${openTag}${"\n"}${content.join("")}${"\n"}${depthToTabs(depth)}${closeTag}${"\n"}`;
  }
};
export const toHtml = surveyFormatterFactory({
  onRootNode: ({ children }) => children.join(""),
  onIntermediateNode: ({ depth, flowNode, children }) => tag("div", { class: flowNode.type, depth },
    tag("div", { class: "block-header", depth: depth + 1, singleLine: true },
      flowNode.type === "Block" ? `Block: ${htmlEncode(flowNode.description)} (block names not exposed to participants)` :
      flowNode.type === "BlockRandomizer" ? "Randomize" :
      flowNode.type === "Group" ? "Group" : ""
    ),
    children.join("")
  ),
  onChoice: ({ depthOfQuestion, choiceString }) => tag('li', { class: "choice", depth: depthOfQuestion + 2, singleLine: true }, htmlEncode(choiceString)),
  onQuestion: ({ depth, questionText, children, raw }): string => {
    const { skipToEndOfBlockIfChoices, isLikert7 } = raw;
    const classes = ["question", ...(isLikert7 ? ["likert"] : [])];
    return tag("div", { depth, class: classes },
      tag("div", { class: "question-body", depth: depth + 1, singleLine: true }, questionText),
      children.length == 0 ? "" : tag("ul", { class: "choices", depth: depth + 1 }, ...children),
      (skipToEndOfBlockIfChoices == null || skipToEndOfBlockIfChoices.length === 0) ? "" :
        tag("div", { depth, class: "note", singleLine: true },
          `Skip to end of block if participant selects `,
          skipToEndOfBlockIfChoices.map(c => tag("span", { class: "skip-option", depth: depth + 1, singleLine: true }, htmlEncode(c.Display))
          ).join(", ")
        )
    );
  },
});
