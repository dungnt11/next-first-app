import Head from "next/head";
import { Fragment } from "react";

export default function() {
  return (
    <Fragment>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
        />
      </Head>
    </Fragment>
  );
}
