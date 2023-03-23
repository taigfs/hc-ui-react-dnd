import { GoogleLogin, googleLogout } from "@react-oauth/google";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";

import { SiteLinks } from "../enum/SiteLinks";
import { useAuthStore } from "../state/AuthStore";

interface GResponse {
  credential: string;
  clientId: string;
}

export const GoogleLoginButton = () => {
  const [gResponse, setGResponse] = useState<GResponse | null>(null);
  const setUser = useAuthStore((state) => state.setUser);

  useEffect(() => {
    if (gResponse) {
      console.log(gResponse.credential);
      const { name, email, picture } = jwtDecode(gResponse.credential) as any;
      console.log(name, email, picture);
      setUser({ name, email, profilePicture: picture, id: email });
      window.location.href = SiteLinks.Projects;
      // axios
      //   .post(`http://localhost:3000/login/google`, gResponse)
      //   .then((res: any) => {
      //     console.log(res);
      //   })
      //   .catch((err: any) => console.log(err));
    }
  }, [gResponse]);

  // log out function to log the user out of google and set the profile array to null
  // const logOut = () => {
  //   googleLogout();
  //   setProfile(null);
  // };

  const onSuccess = (codeResponse: any) => setGResponse(codeResponse);

  const onError = () => {
    console.log("error");
  };

  return <GoogleLogin onSuccess={onSuccess} onError={onError} />;
};
