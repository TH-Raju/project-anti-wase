"use client";
import { USER_ROLE } from "@/constants/role";
import { IDecodedInfo, getUserInfo } from "@/services/auth.service";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
export const GlobalContext = createContext({});
export const useGlobalContext = () => {
  return useContext(GlobalContext) as IContextType;
};
export type IContextType = {
  userInfo: Partial<IDecodedInfo> | null | undefined;
  userInfoLoading: boolean;
  refetch: boolean;
  setUserInfoLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setRefetch: React.Dispatch<React.SetStateAction<boolean>>;
};
export default function GlobalContextApi({
  children,
}: {
  children: React.ReactNode;
}) {
  const [userInfoLoading, setUserInfoLoading] = useState(true);
  const [refetch, setRefetch] = useState(true);
  const [userInfo, setUserInfo] = useState<Partial<IDecodedInfo>>({
    email: "",
    id: "",
    role: "",
  });

  const memoizedFetchUserInfo = useMemo(
    () => async () => {
      const userInfo = await getUserInfo();
      setUserInfo(userInfo);
      setUserInfoLoading(false);
    },
    []
  ); // Empty dependency array means this function will be memoized once
  useEffect(() => {
    setUserInfoLoading(true);
    // Call the memoized function to fetch user info asynchronously
    memoizedFetchUserInfo();
  }, [refetch]);
  const value: IContextType = {
    userInfo,
    userInfoLoading,
    setUserInfoLoading,
    setRefetch,
    refetch,
  };
  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
}
