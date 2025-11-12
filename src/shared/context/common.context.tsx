import { createContext, PropsWithChildren, useContext } from "react";
import { TCommonContextType } from "../types/common/common-context.type";
import UseCommon from "../hooks/common/use-common.hook";


const CommonContext = createContext<TCommonContextType | undefined>(undefined);


export const useCommonContext = () => {
  const context = useContext(CommonContext);
  if (!context) {
    // throw new Error("useCommonContext must be used within a CommonProvider");
    return {} as TCommonContextType
  }
  return context;
};

export const CommonProvider = ({children}:PropsWithChildren)=>{
    const {commonData} = UseCommon();
    return (
      <CommonContext.Provider value={commonData}>
        {children}
      </CommonContext.Provider>
    );
}
