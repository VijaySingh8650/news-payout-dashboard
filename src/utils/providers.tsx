
'use client';

import { Provider} from "react-redux";
import store from "../store/index";
import Wrapper from "./wrapper";


export function ReduxProvider({ children }: { children: React.ReactNode }) {
  



    return <Provider store={store}>

        <Wrapper>
        {children}
        </Wrapper>
        
        
        </Provider>;
}