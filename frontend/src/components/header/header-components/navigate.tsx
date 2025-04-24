import { Link } from "react-router-dom";

export function NavigateComponent({ className }: { className: string }) {
  return (
    <div className={className}>
      <Link to="/">Homepage</Link>
      <Link to="/aboutus">About us</Link>
      <Link to="/allproducts">All products</Link>
    </div>
  );
}
