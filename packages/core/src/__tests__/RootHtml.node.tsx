/** @jest-environment node */
/* eslint-disable testing-library/render-result-naming-convention */
import { describe, expect, it } from "@jest/globals";
import { renderToString } from "react-dom/server";

import { RootHtml } from "../RootHtml.js";

describe("RootHtml", () => {
  it("should render the html and body elements with the default props", () => {
    expect(renderToString(<RootHtml />)).toMatchSnapshot();
  });

  it("should allow a custom bodyClassName", () => {
    expect(
      renderToString(<RootHtml bodyClassName="body-class-name" />)
    ).toMatchSnapshot();
  });

  it("should allow the body className to be set through bodyProps when the bodyClassName prop is not provided", () => {
    const html1 = renderToString(
      <RootHtml bodyProps={{ className: "custom-body-class" }} />
    );
    const html2 = renderToString(
      <RootHtml
        bodyProps={{ className: "custom-body-name" }}
        bodyClassName="body-class"
      />
    );

    expect(html1).toContain("custom-body-class");
    expect(html1).toMatchSnapshot();

    expect(html2).not.toContain("custom-body-class");
    expect(html2).toMatchSnapshot();
  });

  it("should allow the lang to be overwritten", () => {
    expect(renderToString(<RootHtml lang="da" />)).toMatchSnapshot();
  });

  it("should allow the dir to be overwritten", () => {
    expect(renderToString(<RootHtml dir="rtl" />)).toMatchSnapshot();
  });

  it("should allow the dir and lang to be overwritten", () => {
    expect(renderToString(<RootHtml lang="ar" dir="rtl" />)).toMatchSnapshot();
  });
});
