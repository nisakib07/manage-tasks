import { useContext } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../../Provider/AuthProvider";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const { createUser, userProfileUpdate } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const photo = form.photo.value;

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    } else if (!/.*[A-Z].*/.test(password)) {
      toast.error("Password must have a capital letter");
      return;
    } else if (!/[!@#$%^&*()_+{}[\]:;<>,.?~\\\-/]/.test(password)) {
      toast.error("Password must have a special character");
      return;
    }

    createUser(email, password)
      .then(() => {
        userProfileUpdate(name, photo);
        navigate("/");
        toast.success("Successfully Registered");
        form.reset();
      })
      .catch((error) => {
        toast.error(error.message);
        form.reset();
      });
  };
  return (
    <div>
      <div
        className="hero min-h-screen"
        style={{
          backgroundImage: "url(https://i.ibb.co/g4W9CNv/login-bg.jpg)",
        }}>
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className=" max-w-2xl mx-auto mt-10">
            <div className="max-w-2xl mx-auto">
              <div className="w-full rounded-2xl shadow-2xl">
                <form
                  className="card-body bg-transparent rounded-lg"
                  onSubmit={handleRegister}>
                  <div className="form-control">
                    <label className="label">
                      <span className="text-lg text-emerald-400">
                        Full Name
                      </span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your full name"
                      className="input input-bordered"
                      name="name"
                      required
                    />
                  </div>

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
                  <div className="form-control">
                    <label className="label">
                      <span className="text-lg text-emerald-400">
                        Photo URL
                      </span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter Photo URL"
                      className="input input-bordered"
                      name="photo"
                      required
                    />
                  </div>
                  <div className="form-control mt-6">
                    <button
                      type="submit"
                      className="btn bg-emerald-500 hover:bg-emerald-400 border-none">
                      Register
                    </button>
                  </div>

                  <p className="text-center mt-5 text-lg">
                    Already have an account?
                    <span className="text-orange-600">
                      <Link to="/login"> Login</Link>
                    </span>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
