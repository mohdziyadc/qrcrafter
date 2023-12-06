import LandingPage from "@/components/LandingPage";
import {
  checkPlusSubscription,
  checkProSubscription,
} from "@/lib/subscription";

export default async function Home() {
  const isPro = await checkProSubscription();
  const isPlus = await checkPlusSubscription();

  return (
    <>
      <LandingPage isPaid={isPro || isPlus} />
    </>
  );
}
