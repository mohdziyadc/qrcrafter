import Navbar from "@/components/Navbar";
import { Separator } from "@/components/ui/separator";
import React from "react";

type Props = {};

const PrivacyPolicy = (props: Props) => {
  return (
    <div className="relative ">
      <div className="absolute top-0 z-[-2] h-full w-screen bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]"></div>
      <div className="max-w-7xl p-8 text-xl  m-auto">
        <h1 className="font-bold text-3xl mb-4">Privacy Policy for QRCoded</h1>
        <p>
          Thank you for choosing QRCoded! Your privacy is important to us. This
          Privacy Policy outlines the types of data we collect, why we collect
          it, and how we handle it. By using our services, you agree to the
          terms of this Privacy Policy.
        </p>
        <Separator className="my-6 bg-white" />
        <div>
          <p className="font-bold">Quick Summary</p>
          <ul className="ml-6 my-4 space-y-2">
            <li>
              • We collect anonymous statistics about your visit, such as which
              pages you view, through Posthog Analytics.
            </li>
            <li>
              • We use cookies to generate anonymous user IDs and enhance your
              experience.
            </li>
            <li>
              • We do not share personal data with third parties except to
              improve our services or when legally required.
            </li>
          </ul>
        </div>
        <Separator className="my-6 bg-white" />
        <div className="policy-divs">
          <h2>1. Information We Collect</h2>
          <h3>Anonymous Usage Information:</h3>
          <p>
            When you use QRCoded, we automatically collect certain data to
            understand how our service is used and improve it. This includes,
            but is not limited to, pages you visit, time spent on each page, and
            interactions within the app. The collected information does not
            identify you personally and is stored anonymously.
          </p>
          <h3>Cookies and Anonymous User IDs:</h3>
          <p>
            We use cookies to generate anonymous user IDs. These cookies help us
            track usage statistics to analyze traffic patterns and improve user
            experience. You can control cookie settings through your browser,
            but note that disabling cookies may impact your experience on our
            site.
          </p>
          <h3>Dynamic AI QR Codes:</h3>
          <p>
            When you create a dynamic AI QR Code, the data associated with the
            code is stored on our servers. This stored data allows you to update
            the content associated with the QR code without needing to
            regenerate it. However, we do not store personal information unless
            you explicitly provide it within the QR code content.
          </p>

          <h2>2. How We Use Your Information</h2>
          <h3>Improving Our Services:</h3>
          <p>
            The data collected from anonymous usage statistics allows us to
            enhance the functionality and usability of QRCoded. By understanding
            how users interact with our website, we can improve existing
            features and develop new ones.
          </p>
          <h3>AI-Enhanced QR Codes and Future Services:</h3>
          <p>
            Currently, QRCoded offers dynamic AI QR Code generation. In the
            future, we plan to expand this service to include both static QR
            codes (which do not store any data on our servers) and dynamic QR
            codes. This Privacy Policy will be updated to reflect these changes
            as they become available.
          </p>
          <h2>3. Analytics</h2>
          <h3>Posthog Analytics:</h3>
          <p>
            We use Posthog Analytics to measure website usage. Posthog collects
            anonymous information such as pages visited, interactions, and
            device information to give us insights into user behavior. This data
            does not personally identify you, and it is used solely to help us
            improve our website and services.
          </p>
          <h2>4. Data Sharing and Disclosure</h2>
          <h3>No Third-Party Sharing for Marketing:</h3>
          <p>
            We do not share personal data with third-party advertisers or
            marketers. Any information collected is used only by QRCoded to
            improve our services and maintain performance.
          </p>
          <h3>Legal Requirements:</h3>
          <p>
            We may disclose your data if required by law or if we believe such
            action is necessary to protect and defend our rights or property, to
            protect the safety of our users, or to comply with legal processes.
          </p>
          <h2>5. Data Security</h2>
          <p>
            We are committed to keeping your data secure. We implement various
            security measures to protect the data we collect from unauthorized
            access, use, or disclosure. However, please note that no system is
            completely secure, and we cannot guarantee the absolute security of
            your information.
          </p>
          <h2>6. Children&apos;s Privacy</h2>
          <p>
            QRCoded is not intended for use by children under 13, and we do not
            knowingly collect data from children under 13. If you are under 13,
            please do not use our services or provide any information. If we
            become aware of any data collected from a child under 13 without
            verified parental consent, we will promptly delete such data.
          </p>
          <h2>7. Changes to This Privacy Policy</h2>
          <p>
            We may update this Privacy Policy from time to time to reflect
            changes in our practices or for other operational, legal, or
            regulatory reasons. When we make updates, we will revise the
            &quot;last updated&quot; date at the bottom of this page. We
            encourage you to review this policy periodically.
          </p>
          <h2>8. Contact Us</h2>
          <p>
            If you have questions or concerns regarding this Privacy Policy or
            our data handling practices, please contact us at
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

export default PrivacyPolicy;
