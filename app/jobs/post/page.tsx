import { auth } from "@/auth";
import { redirect } from "next/navigation";
import PostJobForm from "./PostJobForm";

export default async function Page() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/auth/signin");
  }

  return <PostJobForm />;
}
