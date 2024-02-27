import React from 'react';
import { Button, Snackbar } from 'react-native-paper';

const Toas = ({visible, setVisible,mensage}) => {



  const onDismissSnackBar = () => setVisible(false);

  return (
    <>
    

      <Snackbar   style={{backgroundColor:"blue", borderWidth:0, borderColor:"green"}} 
      visible={visible} duration={3000} onDismiss={()=>setVisible(false)}
        action={{
          label: 'fechar',
          onPress: () => {onDismissSnackBar()}, 
        }}>
      
        {mensage}
      </Snackbar>
    </>
  );
};

export default Toas;
