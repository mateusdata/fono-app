import React from 'react';
import { Text } from 'react-native';
import { Button, Snackbar } from 'react-native-paper';

const Toast = ({
  visible, setVisible, mensage,
  backgroundColor = "#2d292d", textColor = "white",
  labelColor = "white",
  label="fechar",
  duration=4000,
  bottom=0

}) => {

  const onDismissSnackBar = () => setVisible(false);

  return (
    <>
      <Snackbar style={{ backgroundColor: backgroundColor, bottom: bottom}}
        visible={visible} duration={duration} onDismiss={() => setVisible(false)}
        action={{
          labelStyle: { color: labelColor },
          label: label,
          onPress: () => { onDismissSnackBar() },
        }}>
        <Text style={{ color: textColor }}>{mensage}</Text>

      </Snackbar>
    </>
  );
};

export default Toast;
