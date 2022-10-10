import { useSession, signOut } from "next-auth/react";
import { BarLoader } from "react-spinners";
import Nav from "./Nav";

function Layout({ children }: { children: any }) {
  const { data: session, status } = useSession();
  if (status === "authenticated") {
    return (
      <div className="flex">
        <Nav
          userName={session.user?.name}
          userEmail={session.user?.email}
          signOut={signOut}
          userAvatar={session.user?.image}
        ></Nav>
        {children}
      </div>
    );
  }
  if (status === "loading") {
    return (
      <div className="flex justify-center w-full pt-96">
        <BarLoader color="purple"></BarLoader>
      </div>
    );
  }
  if (status === "unauthenticated") {
    return <div>{children}</div>;
  }
  return <></>;
}

export default Layout;
