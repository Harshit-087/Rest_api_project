"use client"
import {QueryClientProvider,QueryClient} from "@tanstack/react-query"
import {store,persistor} from '../store/store'
import { Provider } from 'react-redux'
import { PersistGate } from "redux-persist/integration/react";

export default function ProviderClient({children}:{children:React.ReactNode}){
    
    const queryClient = new QueryClient();

    return (
          <Provider store = {store}>
            <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
        </PersistGate>
        </Provider>
    )
}