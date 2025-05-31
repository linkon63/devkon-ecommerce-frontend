import setAccessTokenIntoCookie from "../cookie/setAccessTokenIntoCookie";

type TLoginPayload = {
  trxnId: string;
  email: string;
};

export const userSignIn = async (data: TLoginPayload) => {
  const res = await fetch(`http://localhost:5000/v1/auth/login/public`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    credentials: "include",
    cache: "no-store",
  });

  const userInfo = await res.json();

  const redirect = "/my-account/purchased-products";

  if (userInfo?.data?.accessToken) {
    setAccessTokenIntoCookie(userInfo?.data?.accessToken, {
      redirect,
    });
  }

  return userInfo;
};
