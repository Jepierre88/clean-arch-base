"use client"

import {PropsWithChildren} from "react";
import {SessionProvider} from "next-auth/react";

export default  function RootProviders({children}: PropsWithChildren){
    return (
        <SessionProvider>{children}</SessionProvider>
    )
}