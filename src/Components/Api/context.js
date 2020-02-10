import { createContext } from 'react'

export const ApiContext = createContext();

export const ApiProvider = ApiContext.Provider;
export const ApiConsumer = ApiContext.Consumer;
