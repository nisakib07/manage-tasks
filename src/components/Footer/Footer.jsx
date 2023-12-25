import { FaFacebook, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="bg-zinc-300 py-2 mt-5">
      <footer className="footer p-1 my-8 flex justify-center jus flex-col-reverse items-center md:flex-row gap-10">
        <div className="text-center">
          <p>
            <span className="text-xl font-bold">SCC Technovision Inc.</span>{" "}
          </p>
          <p className="text-center">Copyright 2023</p>
        </div>

        <nav>
          <div className="grid grid-flow-col gap-4 text-2xl">
            <a href="https://www.facebook.com/nisakib19">
              <FaFacebook></FaFacebook>
            </a>
            <a href="https://twitter.com/nadiatul_sakib">
              <FaTwitter></FaTwitter>
            </a>
          </div>
        </nav>
      </footer>
    </div>
  );
};

export default Footer;
