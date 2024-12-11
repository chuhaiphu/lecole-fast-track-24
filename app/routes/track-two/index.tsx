import { useEffect, useState } from "react";
import HeaderComponent from "~/components/header";
import type { Route } from "../track-one/+types";
import FooterComponent from "~/components/footer";
import UserTable from "./user-manager-page/user-table";
import { getAllUsersAPI } from "~/api/user-api";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Track Two" }];
}

export default function TrackTwo() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getAllUsersAPI();
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <>
      <HeaderComponent />
      <UserTable users={users} />
      <FooterComponent />
    </>
  );
}
