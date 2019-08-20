import React, { Component, useContext } from "react";
import fetch from "isomorphic-unfetch";
import Link from "next/link";

import Layout from "../components/Layout";
import { uServer } from "../config";
import Navbar from "../components/Navbar";

View.getInitialProps = async () => {
  const _u = await fetch(`${uServer}/get`);
  const users = await _u.json();
  return { users };
};

function renderUser(users) {
  const _u = users.user;
  return _u.map((e, i) => (
    <div key={i} className="card" style={{ width: "18rem" }}>
      <img
        src={`${uServer}/server/uploads/${e.avatar}`}
        className="card-img-top"
        alt={e.avatar}
      />
      <div className="card-body">
        <h5 className="card-title">name: {e.name}</h5>
        <p className="card-text">age: {e.age}</p>
        <Link href={`/edit/[edit]`} as={`edit/${e._id}`}>
          <a className="btn btn-block btn-primary">Edit</a>
        </Link>
      </div>
    </div>
  ));
}

function View({ users }) {
  return (
    <Layout>
      <Navbar />
      {renderUser(users)}
    </Layout>
  );
}

export default View;
