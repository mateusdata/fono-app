import React, { Dispatch, PropsWithChildren, SetStateAction, createContext, useState } from 'react';

interface Location {
    latitude: number,
    longitude: number
}

interface FormatGlobal {
    location: Location,
    setLocation: Dispatch<SetStateAction<Location>>,
    thereSession: any,
    setThereSession:Dispatch<SetStateAction<boolean>>,
}

export const ContextGlobal = createContext<FormatGlobal>({} as FormatGlobal);

const GlobalContext: React.FC<PropsWithChildren> = ({ children }) => {
    const [location, setLocation] = useState<any>({
        latitude: null,
        longitude: null
    });
    const [thereSession, setThereSession] = useState<boolean>(false);

    return (
        <ContextGlobal.Provider value={{ location, setLocation, thereSession, setThereSession }}>
            {children}
        </ContextGlobal.Provider>
    );
}

export default GlobalContext;
