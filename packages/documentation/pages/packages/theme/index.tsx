import { NextFunctionComponent } from "next";
import Router from "next/router";

const Index: NextFunctionComponent = () => null;

Index.getInitialProps = ({ res, pathname }) => {
  const indexPath = `${pathname}/installation`;
  if (res) {
    res.writeHead(302, {
      Location: indexPath,
    });
  } else {
    Router.replace(indexPath);
  }

  return {};
};

export default Index;
