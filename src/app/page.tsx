import Demo from "@/components/Demo";
import Features from "@/components/features";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Pricing from "@/components/Pricing";
import QRForm from "@/components/QRForm";
import { getAuthSession } from "@/lib/auth";
import Image from "next/image";

export default async function Home() {
  const session = await getAuthSession();
  return (
    <>
      <Navbar user={session?.user} />
      {/* <div className="flex flex-col items-center justify-center w-full h-screen">
        <QRForm qrCode={qrCode} setQrCode={setQRCode} />
        <div>
          {qrCode && (
            <Image src={qrCode} alt="qr-code" height={400} width={400} />
          )}
        </div>
      </div> */}
      <Hero />
      <Features />
      <Demo />
      <Pricing />
    </>
  );
}
