import LandingPage from "@/components/LandingPage";
import { checkProSubscription } from "@/lib/subscription";

export default async function Home() {
  const isPaid = await checkProSubscription();
  return (
    <>
      <LandingPage isPaid={isPaid} />
    </>
  );
}
