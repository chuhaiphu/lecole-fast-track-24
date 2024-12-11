import { useEffect, useState, useCallback, useMemo } from "react";
import HeaderComponent from "~/components/header";
import type { Route } from "../track-one/+types";
import FooterComponent from "~/components/footer";
import UserTable from "../../components/list/user-list";
import { getAllUsersAPI } from "~/api/user-api";

export function meta({ }: Route.MetaArgs) {
  return [{ title: "Track Two" }];
}

export default function TrackTwo() {
  const [users, setUsers] = useState([]);
    
  // Cache function definition between re-renders
  const fetchUsers = useCallback(async () => {
    try {
      const response = await getAllUsersAPI();
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);
    
  // Memoize UserTable to prevent unnecessary re-renders
  const userTable = useMemo(() => (
    <UserTable users={users} />
  ), [users]);

  return (
    <>
      <HeaderComponent />
      {userTable}
      <FooterComponent />
    </>
  );
}
