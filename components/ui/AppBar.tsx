import React, { useState } from "react";
import Link from "next/link";
import { FormattedMessage } from "react-intl";
import { useRouter } from "next/router";
import { Layout } from "components/core/Layout";

import { Menu } from "react-feather";

const AppBar = () => {
  const router = useRouter();
  const { locale } = router;

  const content = [
    { href: "/", labelId: "home" },
    { href: "/works", labelId: "works" },
    { href: "/about", labelId: "about" },
    { href: "/gallery", labelId: "gallery" },
    { href: "/contact", labelId: "contact" },
  ];

  const generateMenuItems = (content) => {
    const itemsList = content.map((link, index) => (
      <Link href={link.href} key={link.labelId}>
        <a className="lg:inline-flex px-3 text-lightgray items-center hover:text-action font-mono font-hairline text-xs">
          {`0${index + 1} : `}
          <FormattedMessage
            id={`app_bar.${link.labelId}`}
            description={`app bar menu item - ${link.labelId}`}
            defaultMessage={link.labelId}
          />
          {link.label}
        </a>
      </Link>
    ));
    return itemsList.flatMap((value, index, array) =>
      array.length - 1 !== index // check for the last item
        ? [value, " | "]
        : value
    );
  };

  const generateLanguageItems = (languages) => {
    const itemsList = languages.map((language) => (
      <Link href="" locale={language.toLowerCase()} key={language}>
        <a
          className={`lg:inlineflex px-1 font-hairline text-xs font-mono ${
            locale.toLowerCase() === language.toLowerCase()
              ? "text-action"
              : "text-lightgray"
          } items-center hover:text-action`}
        >
          {language}
        </a>
      </Link>
    ));
    return itemsList.flatMap((value, index, array) =>
      array.length - 1 !== index // check for the last item
        ? [value, " | "]
        : value
    );
  };

  return (
    <div className="bg-white">
      <Layout>
        <nav
          className="m-auto flex items-center flex-wrap justify-between w-full py-5"
          id="navigation"
        >
          <div>
            <div className="hidden flex-row w-full items-center lg:flex ">
              {generateMenuItems(content)}
            </div>
            <Menu className="text-gray-600 lg:hidden" />
          </div>
          <div>{generateLanguageItems(["En", "Fr"])}</div>
        </nav>
      </Layout>
    </div>
  );
};

export { AppBar };
