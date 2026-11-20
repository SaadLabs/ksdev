const API = "/api";

export async function request(url, opts = {}) {
  const token = localStorage.getItem("ksdev-token");
  const res = await fetch(API + url, {
    ...opts,
    headers: {
      ...(opts.body && !(opts.body instanceof FormData)
        ? { "Content-Type": "application/json" }
        : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...opts.headers,
    },
    body:
      opts.body && !(opts.body instanceof FormData)
        ? JSON.stringify(opts.body)
        : opts.body,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw Error(data.message || "Something went wrong");
  return data;
}
