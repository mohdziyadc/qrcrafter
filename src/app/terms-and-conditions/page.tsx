import { Separator } from "@/components/ui/separator";
import React from "react";

type Props = {};

const TermsAndConditions = (props: Props) => {
  return (
    <div className="relative">
      <div className="absolute top-0 z-[-2] h-full w-screen bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]"></div>
      <div className="max-w-7xl text-xl py-8  m-auto">
        <h1 className="font-bold text-3xl mb-4">Terms and Conditions</h1>
        <h2 className="font-bold mb-2">Welcome to QRCoded!</h2>
        <p>
          Thank you for choosing QRCoded (the &quot;Service&quot;). By accessing
          or using our website and associated tools, you agree to abide by these
          terms and conditions (&quot;Terms&quot;). If you do not agree with
          these Terms, you may not use the Service. Please also review our
          Privacy Policy, which explains how we collect, use, and protect your
          information. These Terms constitute a legal agreement between you and
          QRCoded (&quot;we&quot;, &quot;our&quot; or &quot;us&quot;).
        </p>
        <Separator className="my-6 bg-white" />
        <div className="policy-divs">
          <h2>1. Software and Services</h2>
          <h3>1.1 License to Use</h3>
          <p>
            Our Services may include web-based or downloadable software. When
            you use our software, you are granted a worldwide, non-exclusive,
            non-transferable license to use it solely for the purpose of
            accessing and using the Service. If any component of our software is
            licensed under an open-source license, we will make the terms of
            that license available to you. Any terms from the open-source
            license may override portions of these Terms.
          </p>
          <h3>1.2 Automatic Updates</h3>
          <p>
            Our software may update automatically on your device to improve
            performance, enhance security, or introduce new features. By using
            our Services, you consent to these updates.
          </p>

          <h2>2. Changes to Services</h2>
          <h3>Improving Our Services:</h3>
          <p>
            We reserve the right to modify, add, or remove features of the
            Service at any time without prior notice. Changes may include the
            addition of new functionalities, the withdrawal of existing
            features, or updates to pricing. We will strive to communicate
            significant updates in advance but cannot guarantee notice in all
            cases.
          </p>
          <h2>3. Pricing</h2>
          <h3>3.1 Free and Paid Features</h3>
          <p>
            <li>
              Static QR Codes: Static QR Codes are provided free of charge.
              These codes encode information directly, making them independent
              of our Service once created.
            </li>
            <li>
              Dynamic QR Codes: Dynamic QR Codes are tied to our platform. They
              link to content hosted on our Service, allowing users to edit
              content and track scans. Dynamic QR Codes may display our branding
              for users on the free plan, which can be removed by upgrading to a
              premium plan.
            </li>
          </p>
          <h3>3.2 Upgrades and Subscriptions</h3>
          <p>
            Additional features, such as advanced analytics or branding removal,
            may require a paid subscription. Details of these features and
            pricing are available on our pricing page.
          </p>
          <h3>3.3 Refund Policy</h3>
          <p>Yet to be decided.</p>
          <h2>4. User Responsibilities</h2>
          <h3>4.1 Compliance with Laws</h3>
          <p>
            You agree to use the Service in compliance with all applicable
            local, state, national, and international laws and regulations. Any
            misuse of the Service to create or distribute malicious or illegal
            content is strictly prohibited.
          </p>
          <h3>4.2 Account Security</h3>
          <p>
            You are responsible for maintaining the confidentiality of your
            account credentials and all activities conducted under your account.
          </p>
          <h3>4.3 Prohibited Activities</h3>
          <p>
            You agree not to:
            <li>Use the Service for illegal purposes.</li>
            <li>Interfere with or disrupt the functionality of the Service.</li>
            <li>
              Reverse engineer, decompile, or attempt to extract the source code
              of the Service.
            </li>
          </p>
          <h2>5. Data and Privacy</h2>
          <p>
            Our use of your data is governed by our Privacy Policy. By using the
            Service, you acknowledge that we may collect, store, and process
            certain data to provide and improve the Service.
          </p>
          <h2>6. Termination</h2>
          <p>
            We reserve the right to suspend or terminate your access to the
            Service at any time if we determine that you have violated these
            Terms or engaged in prohibited activities. Upon termination, any
            rights granted to you under these Terms will immediately cease.
          </p>
          <h2>7. Changes to Terms</h2>
          <p>
            We reserve the right to update these Terms at any time. The most
            current version will always be available on our website. By
            continuing to use the Service after changes are posted, you agree to
            the revised Terms.
          </p>
          <h2>8. Contact Us</h2>
          <p>
            If you have questions or concerns regarding these terms and
            conditions, please contact us at
            <span className="underline ml-1 underline-offset-2">
              support@qrcoded.com
            </span>
            .
          </p>
          <div className="font-semibold italic mt-4">
            Last updated: 30/11/24
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
