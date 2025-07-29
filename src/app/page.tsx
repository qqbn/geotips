import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = await getCurrentUser();
  console.log('🔍 [Home] User check:', user ? 'Authenticated' : 'Not authenticated');

  if (user) {
    redirect('/dashboard');
  } else {
    redirect('/auth/login');
  }

  return null;
}
