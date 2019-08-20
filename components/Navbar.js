import React, { Fragment } from "react";
import Link from "next/link";

export default () => {
  let renderMenu = () => {
    let menu = [
      { name: "Add form", linkTo: "/add" },
      { name: "View form", linkTo: "/view" }
    ];
    return menu.map((e, i) => (
      <li key={i} className="nav-item">
        <Link href={e.linkTo}>
          <a className="nav-link">{e.name}</a>
        </Link>
      </li>
    ));
  };
  return (
    <Fragment>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link href="/">
          <a className="navbar-brand">
            Next <span>JS</span>
          </a>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">{renderMenu()}</ul>
        </div>
      </nav>
      <style jsx lang="scss">
        {`
          .navbar-brand {
            text-transform: uppercase;
          }

          .navbar-brand span {
            color: red;
          }
        `}
      </style>
    </Fragment>
  );
};
