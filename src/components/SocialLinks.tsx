import Link from "next/link";
import React from "react";
import { FaFacebook, FaGithub, FaLinkedin, FaYoutube } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const linksData = [
  { icon: <FaGithub />, href: "http://github.com" },
  { icon: <FaFacebook />, href: "http://facebook.com" },
  { icon: <FaYoutube />, href: "http://youtube.com" },
  { icon: <FaLinkedin />, href: "http://linkedin.com" },
  { icon: <MdEmail />, href: "http://mail.google.com" },
];

function SocialLinks() {
  return (
    <div className="text-xl pt-2 text-white/50 flex items-center gap-x-2">
      {linksData.map((item, index) => (
        <Link
          href={item.href}
          key={index}
          target="blank"
          className="border border-white/20 inline-flex p-2 rounded-full hover:text-skyColor hover:border-skyColor duration-300"
        >
          {item.icon}
        </Link>
      ))}
    </div>
  );
}

export default SocialLinks;
