import React, { Dispatch, PropsWithChildren, SetStateAction, createContext, useState } from 'react'
import { View } from 'react-native'

interface FormatPacinet {
    pac_id:number,
    setPac_id:  Dispatch<SetStateAction<number>>

}

export const ContextPacient = createContext<FormatPacinet>({} as FormatPacinet);

const PacientContext:React.FC<PropsWithChildren> = ({children}) => {
    const [pac_id, setPac_id] = useState<number| null>(null);
  return (
    <ContextPacient.Provider value={{pac_id, setPac_id}}>
      {children}
    </ContextPacient.Provider>
  )
}

export default PacientContext
