import React, { useState } from "react";
import Image from "next/image";
import HeroImage from "public/qrcrafter_hero.png";
import { Card, CardContent } from "./ui/card";
import { Form } from "./ui/form";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

type Props = {};

const InteractiveQRCode = (props: Props) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [url, setUrl] = useState("");

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    // console.log('URL:', url, 'Prompt:', prompt);
    console.log("Submit Clicked");
    // You would typically call your QR code generation API here
  };
  return (
    <div>
      <Card
        className={`relative flex [perspective:1000px] justify-center items-center w-[600px] h-[600px] transition-transform duration-500 [transform-style:preserve-3d] ${
          isFlipped ? "[transform:rotateY(180deg)]" : ""
        }`}
      >
        <CardContent
          className="absolute [backface-visibility:hidden]"
          onClick={handleFlip}
        >
          <div className="mt-6">
            <Image
              src={HeroImage}
              alt="hero_image"
              className="rounded-lg "
              height={600}
              width={600}
            />
          </div>
        </CardContent>
        <CardContent
          className="absolute [backface-visibility:hidden]   border-2 w-full h-full [transform:rotateY(180deg)] "
          onClick={handleFlip}
        >
          <form onSubmit={handleSubmit} className="">
            <div>
              <Label htmlFor="url">URL</Label>
              <Input
                id="url"
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Enter URL"
                required
              />
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default InteractiveQRCode;
