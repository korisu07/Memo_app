function brTagCount(Element) {
  const brTag = '\n|\r\n|\r';

  const count = (Element.match(new RegExp(brTag, "g")) || []).length;

  return count;
}
