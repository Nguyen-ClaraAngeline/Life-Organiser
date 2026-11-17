import { redirect } from "next/navigation";

// There is no login yet: the app opens directly on the dashboard.
export default function HomePage() {
  redirect("/dashboard");
}
