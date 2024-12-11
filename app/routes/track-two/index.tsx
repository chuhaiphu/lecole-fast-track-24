import { useEffect, useState, useCallback, useMemo } from "react";
import HeaderComponent from "~/components/header";
import type { Route } from "../track-one/+types";
import FooterComponent from "~/components/footer";
import UserTable from "../../components/list/user-list";
import { getAllUsersAPI } from "~/api/user-api";
import { io } from "socket.io-client";
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


export function meta({ }: Route.MetaArgs) {
  return [{ title: "Track Two" }];
}

export default function TrackTwo() {
  const [users, setUsers] = useState([]);
  const [socket, setSocket] = useState(null);
    
  useEffect(() => {
    const newSocket = io('http://18.212.253.50:3000');
    setSocket(newSocket as any);

    // Listen for socket events
    newSocket.on('success', (data) => {
      toast.success(data.message);
    });

    newSocket.on('error', (data) => {
      toast.error(data.error);
    });

    newSocket.on('user-updated-secret-phrase', (data) => {
      console.log('Received secret phrase update:', data);
      toast.info(data.message);
    });

    newSocket.on('secret-phrase-updated', () => {
      fetchUsers();
    });
    
    return () => {
      newSocket.close();
    };
  }, []);

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
    
  const userTable = useMemo(() => (
    socket ? <UserTable users={users} socket={socket} /> : null
  ), [users, socket]);

  return (
<>
      <HeaderComponent />
      {userTable}
      <FooterComponent />
      <ToastContainer 
        position="bottom-right"
        theme="colored"
        autoClose={2000}
        hideProgressBar={true}
        newestOnTop
        closeOnClick
      />
    </>
  );
}