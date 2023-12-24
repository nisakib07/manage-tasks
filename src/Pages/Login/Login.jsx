import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import { ToastContainer, toast } from "react-toastify";
import { FcGoogle } from "react-icons/fc";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const { userSignIn, googleSignIn } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    userSignIn(email, password)
      .then(() => {
        navigate("/tasks");
        toast.success("Logged In Successfully");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const handleGoogleLogin = () => {
    googleSignIn()
      .then(() => {
        navigate("/tasks");
        toast.success("Logged In Successfully");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage: "url(https://i.ibb.co/g4W9CNv/login-bg.jpg)",
      }}>
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-2xl mx-auto">
          <div className="flex-col">
            <div className="w-full rounded-2xl shadow-2xl pb-4 bg-transparent">
              <form className="card-body rounded-lg" onSubmit={handleLogin}>
                <div className="form-control">
                  <label className="label">
                    <span className="text-lg text-emerald-400">Email</span>
                  </label>
                  <input
                    type="email"
                    placeholder="Enter you email"
                    className="input input-bordered"
                    name="email"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="text-lg text-emerald-400">Password</span>
                  </label>
                  <input
                    type="password"
                    placeholder="Enter Password"
                    className="input input-bordered"
                    name="password"
                    required
                  />
                </div>
                <div className="form-control mt-6">
                  <button
                    type="submit"
                    className="btn bg-emerald-500 hover:bg-emerald-400 border-none text-lg">
                    Login
                  </button>
                </div>
              </form>
              <div className="mt-5 text-lg">
                <p className="text-center">Or Sign In With</p>
                <div className="flex justify-center">
                  <button onClick={handleGoogleLogin}>
                    <FcGoogle className="text-2xl mt-4"></FcGoogle>
                  </button>
                </div>
              </div>
              <p className="text-center mt-5 text-lg">
                New Here?
                <span className="text-orange-600">
                  <Link to="/register">Register</Link>
                </span>
              </p>
            </div>
          </div>
        </div>
        <ToastContainer></ToastContainer>
      </div>
    </div>
  );
};

export default Login;
