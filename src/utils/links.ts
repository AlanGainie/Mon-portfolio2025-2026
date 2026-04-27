export function isValidLink(link?: string): boolean {
  if (!link) return false;
  const value = link.trim();
  return value !== "" && value !== "#";
}

export function isExternalLink(link: string): boolean {
  return /^https?:\/\//i.test(link);
}

export function buildPublicUrl(path: string): string {
  const cleanPath = path.replace(/^\/+/, "");
  return `${import.meta.env.BASE_URL}${cleanPath}`.replace(/([^:]\/)\/+/g, "$1");
}

export function resolveLink(link?: string): string {
  if (!isValidLink(link)) return "#";
  return isExternalLink(link!) ? link! : buildPublicUrl(link!);
}