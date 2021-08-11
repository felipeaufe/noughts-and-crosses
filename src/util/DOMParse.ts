export function HTMLParser(template: string): Element{
  const doc: Document = new DOMParser().parseFromString(template, 'text/html');
  return doc.body.firstElementChild as Element;
}