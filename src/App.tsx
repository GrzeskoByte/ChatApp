import React, { useEffect, Suspense, lazy, useState } from "react";

import { Provider } from "mobx-react";
import { Spin } from "antd";
import { UserStore } from "./_stores/index";
import { auth } from "./_utilities/Firebase";
import "./App.css";
import { Loading } from "antd-mobile";

const Layout = lazy(() => import("./Layout/Layout"));
const LoginForm = lazy(() => import("./Components/LoginForm/LoginForm"));

export const App: React.FC = () => {
  const [isUserSignedIn, setIsUserSignedIn] = useState<Boolean>(false);
  const [isLoading, setIsLoading] = useState<Boolean>(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsUserSignedIn(Boolean(user));
      setIsLoading(false);
    });

    return unsubscribe;
  }, []);

  return (
    <Suspense fallback={<Spin />}>
      {isUserSignedIn ? (
        <Layout>
          <div></div>
        </Layout>
      ) : isLoading ? (
        <Spin></Spin>
      ) : (
        <LoginForm />
      )}
    </Suspense>
  );
};
