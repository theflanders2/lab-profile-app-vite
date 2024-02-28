import { Link } from "react-router-dom";

function HomePage() {
    return (
      <div>
        <Link to="/signup">
            <button>Sign up</button>
        </Link>
        <Link to="/login">
        <button >Log in</button>
        </Link>
      </div>
    );
  }
   
  export default HomePage;