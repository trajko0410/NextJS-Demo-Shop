import { useEffect, useState } from "react";
import AuthForm from "../../components/auth/AuthForm";
import Loader from "../../components/ui/loader";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function LoginPage() {
  const session = useSession();
  const route = useRouter();
  //console.log(session);

  const [claedPush, setCaledPush] = useState(false);

  useEffect(() => {
    if (!session.status === "authenticated") {
      return;
    }
    if (session.status === "authenticated") {
      if (claedPush) {
        return;
      }
      route.replace("/");
      setCaledPush(true);
    }
  }, [session.status, claedPush]);

  if (session.status === "unauthenticated") {
    return <AuthForm />;
  } else if (session.status === "loading") {
    return <Loader />;
  }
}
