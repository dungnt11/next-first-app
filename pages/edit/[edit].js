import fetch from "isomorphic-unfetch";

import Layout from "../../components/Layout";
import { uServer } from "../../config";
import Add from "../add";

Edit.getInitialProps = async context => {
  const id = context.query.edit;
  let _u = await fetch(`${uServer}/user/${id}`);
  let user = await _u.json();
  if (user.user) return { user };
};

export default function Edit(props) {
  let user = props.user.user;
  return <Layout>{user !== undefined && <Add user={user} />}</Layout>;
}
