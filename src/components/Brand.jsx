import { Link } from "react-router-dom";

export function Brand({ name = "KSDev Studio" }) {
  return (
    <Link to="/" className="brand">
      {(name || "KSDev Studio").toLowerCase().replace(/\s*studio$/, "")}
      <span>_</span>
    </Link>
  );
}
