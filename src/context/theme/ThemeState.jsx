import { useState } from "react";
import ThemeContext from "./ThemeContext";

const ThemeState = (props)=>{
    var [state,setState] = useState(false);
    const update1 = (value) => {
        setState(value);
    }
    return(
        <ThemeContext.Provider value={{state,update1}}>
            {props.children}
        </ThemeContext.Provider>
    )
}

export default ThemeState;