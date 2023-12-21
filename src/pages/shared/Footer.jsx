import { Typography } from "@material-tailwind/react";
import Container from "../../components/container/Container";
import { Link } from "react-router-dom";
import { FaLinkedin, FaGithubSquare, FaFacebookSquare } from "react-icons/fa";

export default function SimpleFooter() {
  return (
    <footer className="border-t border-blue-gray-50  bg-gradient-to-tr from-secondary to-primary">
      <Container>
        <div className="flex w-full text-white mx-auto flex-row flex-wrap items-center justify-center gap-y-6 gap-x-12  py-6 text-center md:justify-between">
          <Typography className="font-normal">
            &copy; 2023 All Rights Reserved By{" "}
            <Link
              target="_blank"
              className="hover:text-white/65 border-b border-b-white"
              to="https://md-shahed.netlify.app"
            >
              MD Shahed
            </Link>
          </Typography>
          <ul className="flex flex-wrap items-center gap-y-2 gap-x-8">
            <li>
              <Typography className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500 text-3xl">
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://www.linkedin.com/in/md-shahed"
                >
                  <FaLinkedin />
                </a>
              </Typography>
            </li>
            <li>
              <Typography className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500 text-3xl">
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://www.facebook.com/shahed.king.771"
                >
                  <FaFacebookSquare />
                </a>
              </Typography>
            </li>
            <li>
              <Typography className="font-normal transition-colors hover:text-gray-900 focus:text-blue-500 text-3xl">
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://github.com/Shahed007"
                >
                  <FaGithubSquare />
                </a>
              </Typography>
            </li>
          </ul>
        </div>
      </Container>
    </footer>
  );
}
