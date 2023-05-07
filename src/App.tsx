import React, { Suspense, lazy, useEffect, useState } from "react";

import { Empty, Spin, Typography } from "antd";
import { observer } from "mobx-react";
import "./App.css";
import { RoomStore, UserStore } from "./_stores/index";
import { auth } from "./_utilities/Firebase";

import Messages from "./Components/Messages/Messages";

const { Title } = Typography;

const Layout = lazy(() => import("./Layout/Layout"));
const LoginForm = lazy(() => import("./Components/LoginForm/LoginForm"));

export const App: React.FC = observer(() => {
  const { getRoomId, getRooms, currentRoomName } = RoomStore;

  const [isUserSignedIn, setIsUserSignedIn] = useState<Boolean>(false);
  const [isLoading, setIsLoading] = useState<Boolean>(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (Boolean(user)) UserStore.setUser(user);

      setIsUserSignedIn(Boolean(user));
      setIsLoading(false);
    });

    return unsubscribe;
  }, []);

  return (
    <Suspense fallback={<Spin />}>
      {isUserSignedIn ? (
        <Layout>
          {getRooms() !== null ? (
            <>
              <Messages />
            </>
          ) : (
            <Empty />
          )}
        </Layout>
      ) : isLoading ? (
        <Spin></Spin>
      ) : (
        <LoginForm />
      )}
    </Suspense>
  );
});
