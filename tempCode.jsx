/*
  useEffect(() => {
    const checkProfileCompletion = async () => {
      console.log('user.email', user.email)
      console.log('user.sub', user.sub)
      if (!profileComplete) {
        const token = await getAccessTokenSilently();
        const getOptions = {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await fetch(
          `${import.meta.env.VITE_REACT_APP_EXPRESS_URL}/user`,
          getOptions
        );
        const responseData = await response.json();
        setCurrentUser(responseData.data);
        // console.log("responseData", responseData);
        // if (responseData.message === "User not found") {
        //   console.log("no profile found");
        // }

        var isProfileComplete;

        if (responseData.message !== "User not found") {
          isProfileComplete = Boolean(
            responseData.data.profile.firstName &&
              responseData.data.profile.lastName &&
              responseData.data.equipments.length > 0 &&
              responseData.data.archerProfiles.length > 0
          );
        } else {
          isProfileComplete = false;
        }

        updateProfileComplete(isProfileComplete);
        localStorage.setItem(
          "profileComplete",
          JSON.stringify(isProfileComplete)
        );
      }
      setPageReady(true);
    };

    checkProfileCompletion();
  }, [profileComplete, getAccessTokenSilently, updateProfileComplete, currentUser]);

*/
