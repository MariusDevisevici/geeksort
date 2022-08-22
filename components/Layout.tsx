import { useSession, signOut } from "next-auth/react";
import Nav from "./Nav";

function Layout({ children }: { children: JSX.Element }) {
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
    return <>loading</>;
  }
  if (status === "unauthenticated") {
    return <>{children}</>;
  }
}

export default Layout;
