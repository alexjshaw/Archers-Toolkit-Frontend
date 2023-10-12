import { AppShell } from "@mantine/core";
import { useEffect, useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import { useAuth0 } from "@auth0/auth0-react";
import FallbackLoader from '../components/utility/FallbackLoader'
import { NewProfileForm } from "../components/dashboard/NewProfileForm";
import TestForm from '../components/dashboard/TestForm'

export default function DashboardPage() {
  const {profileComplete, updateProfileComplete} = useContext(AuthContext)
  const [currentUser, setCurrentUser] = useState({})
  const [pageReady, setPageReady] = useState(false)
  const { getAccessTokenSilently } = useAuth0()

  useEffect(() => {
    const checkProfileCompletion = async () => {
      if (!profileComplete) {
        const token = await getAccessTokenSilently()
        const getOptions = {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
        const response = await fetch(`${import.meta.env.VITE_REACT_APP_EXPRESS_URL}/user`, getOptions)
        const responseData = await response.json()
        setCurrentUser(responseData.data)

        const isProfileComplete = Boolean(
          responseData.data.profile.firstName &&
          responseData.data.profile.lastName &&
          responseData.data.equipments.length > 0 &&
          responseData.data.archerProfiles.length > 0
        );

        updateProfileComplete(isProfileComplete);
        localStorage.setItem('profileComplete', JSON.stringify(isProfileComplete));
      }
      setPageReady(true)
    }

    checkProfileCompletion()
  }, [profileComplete, getAccessTokenSilently, updateProfileComplete])

  if (!pageReady) {
    return (
      <AppShell.Main>
        <FallbackLoader />
      </AppShell.Main>
    )
  }

  return (
    <AppShell.Main>
      {/* {profileComplete ? <p>PROFILE COMPLETE</p> : <NewProfileForm />} */}
      {/* <NewProfileForm currentUser={currentUser}/> */}
      <TestForm currentUser={currentUser}/>
    </AppShell.Main>
  )
}