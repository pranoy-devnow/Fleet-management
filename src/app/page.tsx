import { redirect } from "next/navigation";

/**
 * The account picker is gone. This build is Medela Internal only, so `/`
 * continues at the staff sign-in form.
 */
export default function HomePage() {
  redirect("/login/medela");
}
