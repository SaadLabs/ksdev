import { useEffect, useState } from "react";
import { defaults } from "../data/defaults";
import { request } from "../lib/api";

export function useSite() {
  const [data, setData] = useState({
    settings: defaults,
    projects: [],
    services: [],
    technologies: [],
  });
  const [ready, setReady] = useState(false);
  useEffect(() => {
    request("/site")
      .then((d) => setData({ ...d, settings: { ...defaults, ...d.settings } }))
      .catch(() => {})
      .finally(() => setReady(true));
  }, []);
  return { ...data, ready };
}
