import React from 'react';
import {View, ViewProps} from './Themed';

export const Divider: React.FunctionComponent<ViewProps> = ({
  style,
  ...props
}) => {
  const borderStyle = {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  };

  return <View style={[borderStyle, style]} {...props} />;
};
