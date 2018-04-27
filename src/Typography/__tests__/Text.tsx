import * as React from 'react';
import { expectSnapshot } from '../../utils/tests';

import Text from '../Text';

const HELLO_WORLD = 'Hello, world!';
const LONG_TEXT = 'This is another string that is just some text. I\'m not sure how helpful this is though.';

describe('Text', () => {
  describe('rendering return value', () => {
    it('should render a text string when there are no additional props provided', () => {
      expectSnapshot(<Text>{HELLO_WORLD}</Text>);
      expectSnapshot(<Text>{LONG_TEXT}</Text>);
    });

    it('should render as the provided type prop', () => {
      expectSnapshot(<Text type="h1">{HELLO_WORLD}</Text>);
      expectSnapshot(<Text type="h2">{HELLO_WORLD}</Text>);
      expectSnapshot(<Text type="h3">{HELLO_WORLD}</Text>);
      expectSnapshot(<Text type="h4">{HELLO_WORLD}</Text>);
      expectSnapshot(<Text type="h5">{HELLO_WORLD}</Text>);
      expectSnapshot(<Text type="h6">{HELLO_WORLD}</Text>);
      expectSnapshot(<Text type="section">{HELLO_WORLD}</Text>);
      expectSnapshot(<Text type="aside">{HELLO_WORLD}</Text>);
      expectSnapshot(<Text type="caption">{HELLO_WORLD}</Text>);
      expectSnapshot(<Text type="p">{HELLO_WORLD}</Text>);
      expectSnapshot(<Text type="span">{HELLO_WORLD}</Text>);
    });

    it('should render as an h1 tag if the display prop is provided', () => {
      expectSnapshot(<Text display={1}>{HELLO_WORLD}</Text>);
      expectSnapshot(<Text display={2}>{HELLO_WORLD}</Text>);
      expectSnapshot(<Text display={3}>{HELLO_WORLD}</Text>);
      expectSnapshot(<Text display={4}>{HELLO_WORLD}</Text>);
    });

    it('should render as an h1 tag if the headline prop is enabled', () => {
      expectSnapshot(<Text headline={true}>{HELLO_WORLD}</Text>);
    });

    it('should render as the h2 tag if the title prop is enabled', () => {
      expectSnapshot(<Text title={true}>{HELLO_WORLD}</Text>);
    });

    it('should render as an h4 tag if the subheading prop is enabled or set to 1', () => {
      expectSnapshot(<Text subheading={true}>{HELLO_WORLD}</Text>);
      expectSnapshot(<Text subheading={1}>{HELLO_WORLD}</Text>);
    });

    it('should render as an h3 tag if the subheading prop is set to 2', () => {
      expectSnapshot(<Text subheading={2}>{HELLO_WORLD}</Text>);
    });

    it('should render as a p tag if the p prop is true or 1', () => {
      expectSnapshot(<Text p={true}>{HELLO_WORLD}</Text>);
      expectSnapshot(<Text p={1}>{HELLO_WORLD}</Text>);
    });

    it('should render as an aside if the p prop is set to 2', () => {
      expectSnapshot(<Text p={2}>{HELLO_WORLD}</Text>);
    });

    it('should render as a caption if the caption prop is enabled', () => {
      expectSnapshot(<Text caption={true}>{HELLO_WORLD}</Text>);
    });

    it('should render as the corresponding heading tag when the h prop is provided', () => {
      expectSnapshot(<Text h={1}>{HELLO_WORLD}</Text>);
      expectSnapshot(<Text h={2}>{HELLO_WORLD}</Text>);
      expectSnapshot(<Text h={3}>{HELLO_WORLD}</Text>);
      expectSnapshot(<Text h={4}>{HELLO_WORLD}</Text>);
      expectSnapshot(<Text h={5}>{HELLO_WORLD}</Text>);
      expectSnapshot(<Text h={6}>{HELLO_WORLD}</Text>);
    });

    it('should render as a span if a font weight is provided', () => {
      expectSnapshot(<Text weight="light">{HELLO_WORLD}</Text>);
      expectSnapshot(<Text weight="regular">{HELLO_WORLD}</Text>);
      expectSnapshot(<Text weight="medium">{HELLO_WORLD}</Text>);
      expectSnapshot(<Text weight="semibold">{HELLO_WORLD}</Text>);
      expectSnapshot(<Text weight="bold">{HELLO_WORLD}</Text>);
    });

    it('should render as a span if a text alignment is provided', () => {
      expectSnapshot(<Text align="left">{HELLO_WORLD}</Text>);
      expectSnapshot(<Text align="center">{HELLO_WORLD}</Text>);
      expectSnapshot(<Text align="right">{HELLO_WORLD}</Text>);
      expectSnapshot(<Text align="inherit">{HELLO_WORLD}</Text>);
      expectSnapshot(<Text align="initial">{HELLO_WORLD}</Text>);
      expectSnapshot(<Text align="justify">{HELLO_WORLD}</Text>);
    });

    it('should render as a span if a text decoration is provided', () => {
      expectSnapshot(<Text decoration="line-through">{HELLO_WORLD}</Text>);
      expectSnapshot(<Text decoration="overline">{HELLO_WORLD}</Text>);
      expectSnapshot(<Text decoration="underline">{HELLO_WORLD}</Text>);
      expectSnapshot(<Text decoration="none">{HELLO_WORLD}</Text>);
      expectSnapshot(<Text decoration="inherit">{HELLO_WORLD}</Text>);
      expectSnapshot(<Text decoration="initial">{HELLO_WORLD}</Text>);
    });

    it('should render as the provided type prop even if the display prop is provided', () => {
      expectSnapshot(<Text display={1} type="h1">{HELLO_WORLD}</Text>);
      expectSnapshot(<Text display={1} type="h2">{HELLO_WORLD}</Text>);
      expectSnapshot(<Text display={1} type="h3">{HELLO_WORLD}</Text>);
      expectSnapshot(<Text display={1} type="h4">{HELLO_WORLD}</Text>);
      expectSnapshot(<Text display={1} type="h5">{HELLO_WORLD}</Text>);
      expectSnapshot(<Text display={1} type="h6">{HELLO_WORLD}</Text>);
      expectSnapshot(<Text display={1} type="section">{HELLO_WORLD}</Text>);
      expectSnapshot(<Text display={1} type="aside">{HELLO_WORLD}</Text>);
      expectSnapshot(<Text display={1} type="caption">{HELLO_WORLD}</Text>);
      expectSnapshot(<Text display={1} type="p">{HELLO_WORLD}</Text>);
      expectSnapshot(<Text display={1} type="span">{HELLO_WORLD}</Text>);

      expectSnapshot(<Text display={2} type="h1">{HELLO_WORLD}</Text>);
      expectSnapshot(<Text display={2} type="h2">{HELLO_WORLD}</Text>);
      expectSnapshot(<Text display={2} type="h3">{HELLO_WORLD}</Text>);
      expectSnapshot(<Text display={2} type="h4">{HELLO_WORLD}</Text>);
      expectSnapshot(<Text display={2} type="h5">{HELLO_WORLD}</Text>);
      expectSnapshot(<Text display={2} type="h6">{HELLO_WORLD}</Text>);
      expectSnapshot(<Text display={2} type="section">{HELLO_WORLD}</Text>);
      expectSnapshot(<Text display={2} type="aside">{HELLO_WORLD}</Text>);
      expectSnapshot(<Text display={2} type="caption">{HELLO_WORLD}</Text>);
      expectSnapshot(<Text display={2} type="p">{HELLO_WORLD}</Text>);
      expectSnapshot(<Text display={2} type="span">{HELLO_WORLD}</Text>);

      expectSnapshot(<Text display={3} type="h1">{HELLO_WORLD}</Text>);
      expectSnapshot(<Text display={3} type="h2">{HELLO_WORLD}</Text>);
      expectSnapshot(<Text display={3} type="h3">{HELLO_WORLD}</Text>);
      expectSnapshot(<Text display={3} type="h4">{HELLO_WORLD}</Text>);
      expectSnapshot(<Text display={3} type="h5">{HELLO_WORLD}</Text>);
      expectSnapshot(<Text display={3} type="h6">{HELLO_WORLD}</Text>);
      expectSnapshot(<Text display={3} type="section">{HELLO_WORLD}</Text>);
      expectSnapshot(<Text display={3} type="aside">{HELLO_WORLD}</Text>);
      expectSnapshot(<Text display={3} type="caption">{HELLO_WORLD}</Text>);
      expectSnapshot(<Text display={3} type="p">{HELLO_WORLD}</Text>);
      expectSnapshot(<Text display={3} type="span">{HELLO_WORLD}</Text>);

      expectSnapshot(<Text display={4} type="h1">{HELLO_WORLD}</Text>);
      expectSnapshot(<Text display={4} type="h2">{HELLO_WORLD}</Text>);
      expectSnapshot(<Text display={4} type="h3">{HELLO_WORLD}</Text>);
      expectSnapshot(<Text display={4} type="h4">{HELLO_WORLD}</Text>);
      expectSnapshot(<Text display={4} type="h5">{HELLO_WORLD}</Text>);
      expectSnapshot(<Text display={4} type="h6">{HELLO_WORLD}</Text>);
      expectSnapshot(<Text display={4} type="section">{HELLO_WORLD}</Text>);
      expectSnapshot(<Text display={4} type="aside">{HELLO_WORLD}</Text>);
      expectSnapshot(<Text display={4} type="caption">{HELLO_WORLD}</Text>);
      expectSnapshot(<Text display={4} type="p">{HELLO_WORLD}</Text>);
      expectSnapshot(<Text display={4} type="span">{HELLO_WORLD}</Text>);
    });
  });

  it('should provide the className if the children is a callback function', () => {
    expectSnapshot((
      <Text align="left">
        {({ className }) => <div className={className}>{HELLO_WORLD}</div>}
      </Text>
    ));
  });
});
