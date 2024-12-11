import HeaderComponent from "~/components/header";
import type { Route } from "../track-one/+types";
import FooterComponent from "~/components/footer";
import UserTable from "./user-manager-page/user-table";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Track Two" }];
}

export default function TrackTwo() {
  return (
    <>
      <HeaderComponent />
      <UserTable />
      <FooterComponent />
    </>
  );
}
