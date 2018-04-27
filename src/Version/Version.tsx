import * as React from 'react';
import { default as Text, TextProps } from '../Typography';

import version from './version';

export interface VersionProps extends TextProps {
}

const Version: React.SFC<VersionProps> = (props) => <Text {...props}>{version}</Text>;

export default Version;
