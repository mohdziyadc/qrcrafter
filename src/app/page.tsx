import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import QRForm from "@/components/QRForm";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Navbar />
      {/* <div className="flex flex-col items-center justify-center w-full h-screen">
        <QRForm qrCode={qrCode} setQrCode={setQRCode} />
        <div>
          {qrCode && (
            <Image src={qrCode} alt="qr-code" height={400} width={400} />
          )}
        </div>
      </div> */}
      <Hero />
    </>
  );
}
