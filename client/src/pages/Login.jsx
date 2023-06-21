import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-4xl font-medium text-center mb-4">Login</h1>
        <form action="" className="max-w-md mx-auto">
          <input type="email" name="email" placeholder="your@email.com" />
          <input type="password" name="email" placeholder="password" />
          <button type="submit" className="primary">
            Login
          </button>
          <div className="text-center py-2 text-gray-500">
            Don&apos;t have an account yet?&nbsp;
            <Link className="underline text-black" to="/register">
              Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
