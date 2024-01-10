import { Text } from "./Text";
import { Width } from "./Width";

export const wordWrap = (text: Text, width: Width): Text => {
  const SPACE = ' ';
  const NEWLINE = '\n';
  if (text.isEmpty()) return Text.empty();
  if (text.shorterOrEqualThan(width)) return text;
  
  let firstWordWidth: Width = Width.from(width.getValue());
  let remaningWordsStartsAtWidth: Width = Width.from(width.getValue());
  
  if (text.containsSpacesBefore(width)) {
    const indexOfFirstSpace = text.indexOf(SPACE);
    firstWordWidth = Width.from(indexOfFirstSpace);
    remaningWordsStartsAtWidth = Width.from(indexOfFirstSpace + 1);
  }

  const firstWord = text.wrapFirstWordUntil(firstWordWidth).concat(NEWLINE);
  const remainingWords = text.wrapRemainingWordsFrom(remaningWordsStartsAtWidth);

  return firstWord.concat(wordWrap(remainingWords, width));
};
