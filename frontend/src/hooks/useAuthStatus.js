import { useState, useEffect } from "react";
import { useSelector } from "react-redux";



export const useAuthStatus = () => {
  const [loggedIn, setLoggedin] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(true);

  const { user } = useSelector((state) => state.auth)

  useEffect(() => {
    // check to see if user is loggedin
    if (user) {
      setLoggedin(true);
    } else {
      setLoggedin(false)
    }

    setCheckingStatus(false)
  }, [user])

  return { loggedIn, checkingStatus }
}




