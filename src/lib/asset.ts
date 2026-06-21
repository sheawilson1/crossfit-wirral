// Prefix for static assets so they resolve under a GitHub Pages subpath
// (e.g. /crossfit-wirral) as well as at the root in local dev / other hosts.
// NEXT_PUBLIC_BASE_PATH is inlined at build time.
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const asset = (path: string): string => `${BASE_PATH}${path}`;
