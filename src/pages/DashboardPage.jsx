import { AppShell } from "@mantine/core";
import { useEffect, useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import { useAuth0 } from "@auth0/auth0-react";
import FallbackLoader from "../components/utility/FallbackLoader";
import NewProfileForm from "../components/dashboard/NewProfileForm";
import { DashboardStats } from "../components/dashboard/DashboardStats";

export default function DashboardPage() {
  const { profileComplete, updateProfileComplete, currentUser, updateCurrentUser } = useContext(AuthContext);
  const [pageReady, setPageReady] = useState(false);
  const { getAccessTokenSilently, user } = useAuth0();
  const [userScores, setUserScores] = useState()
  const [renderComponent, setRenderComponent] = useState("DashboardStats")

  useEffect(() => {
      const checkRegistration = async () => {
      const token = await getAccessTokenSilently()
      const options = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_EXPRESS_URL}/user`,
        options
      );
      const responseData = await response.json();

      var isProfileComplete;

      if (responseData.status === "success") {
        isProfileComplete = Boolean(
          responseData.data.profile.firstName &&
            responseData.data.profile.lastName &&
            responseData.data.equipments.length > 0 &&
            responseData.data.archerProfiles.length > 0
        );
        localStorage.setItem('profileComplete', JSON.stringify(isProfileComplete))
        const options = {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
        const scoreResponse = await fetch(
          `${import.meta.env.VITE_REACT_APP_EXPRESS_URL}/score/currentuser`,
          options
        );
        const scoreData = await scoreResponse.json();
        setUserScores(scoreData.data)

        if (!isProfileComplete) {
        setRenderComponent("NewProfileForm")
        }
        updateCurrentUser(responseData.data)
      } else if (responseData.message === "User not found") {
        const options = {
          method: "POST",
          headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            auth0Id: user.sub,
            email: user.email
          })
        }
        const response = await fetch(
          `${import.meta.env.VITE_REACT_APP_EXPRESS_URL}/user`,
          options
        );
        const responseData = await response.json()
        setRenderComponent("NewProfileForm")
        updateCurrentUser(responseData.data)
      }
      setPageReady(true);
    }
    checkRegistration()
  }, [user, setRenderComponent])

  if (!pageReady) {
    return (
      <AppShell.Main>
        <FallbackLoader />
      </AppShell.Main>
    );
  }

  return (
    <AppShell.Main>
    {renderComponent === "DashboardStats" && <DashboardStats userScores={userScores} />}
    {renderComponent === "NewProfileForm" && <NewProfileForm setRenderComponent={setRenderComponent} />}
    {/* <NewProfileForm /> */}
    </AppShell.Main>
  );
}
