import {createContext, useState} from "react";


export const GetData = createContext({})

const GetDataProvider = ({children}) => {
    const [userId,setUserId] = useState({});
    const [userName, setUserName] = useState({})


    return <GetData.Provider value={{userId, setUserId, userName, setUserName}}>
        {children}
    </GetData.Provider>

}
export default GetDataProvider;