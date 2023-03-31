import { GoogleLogin } from "@react-oauth/google";
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
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [gResponse, setGResponse] = useState<GResponse | null>(null);
  const setUser = useAuthStore((state) => state.setUser);

  useEffect(() => {
    if (gResponse) {
      axios
      .post(`${backendUrl}/auth/google/login`, {
        token: gResponse.credential
      })
        .then((res: any) => {
          const { name, email, picture } = jwtDecode(gResponse.credential) as any;
          setUser({ name, email, picture, access_token: res.access_token, id: 1 });
          window.location.href = SiteLinks.Projects;
        })
        .catch((err: any) => console.log(err));
    }
  }, [gResponse]);

  const onSuccess = (codeResponse: any) => setGResponse(codeResponse);

  const onError = () => {};

  return <GoogleLogin onSuccess={onSuccess} onError={onError} />;
};
