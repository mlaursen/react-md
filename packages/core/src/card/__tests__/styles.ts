import { describe, expect, it } from "@jest/globals";
import {
  card,
  cardFooter,
  cardHeader,
  cardHeaderContent,
  cardSubtitle,
  cardTitle,
} from "../styles.js";

describe("card", () => {
  it("should be callable without any arguments", () => {
    expect(card()).toMatchSnapshot();
  });
});

describe("cardHeader", () => {
  it("should be callable without any arguments", () => {
    expect(cardHeader()).toMatchSnapshot();
  });
});

describe("cardHeaderContent", () => {
  it("should be callable without any arguments", () => {
    expect(cardHeaderContent()).toMatchSnapshot();
  });
});

describe("cardTitle", () => {
  it("should be callable without any arguments", () => {
    expect(cardTitle()).toMatchSnapshot();
  });
});

describe("cardSubtitle", () => {
  it("should be callable without any arguments", () => {
    expect(cardSubtitle()).toMatchSnapshot();
  });
});

describe("cardFooter", () => {
  it("should be callable without any arguments", () => {
    expect(cardFooter()).toMatchSnapshot();
  });
});
