-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "QRCodeAnalytics" (
    "id" TEXT NOT NULL,
    "scanCount" INTEGER NOT NULL DEFAULT 0,
    "qrName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "lastScanAt" TIMESTAMP(3),
    "userId" TEXT NOT NULL,

    CONSTRAINT "QRCodeAnalytics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MultiURLCode" (
    "id" TEXT NOT NULL,
    "qrCode" VARCHAR(3000) NOT NULL,
    "urls" TEXT[],
    "titles" TEXT[],
    "userId" TEXT NOT NULL,

    CONSTRAINT "MultiURLCode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DynamicURL" (
    "id" TEXT NOT NULL,
    "url" VARCHAR(500) NOT NULL,
    "uniqueToken" TEXT NOT NULL,
    "qrCode" VARCHAR(3000) NOT NULL,
    "name" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "qrCodeAnalyticsId" TEXT NOT NULL,

    CONSTRAINT "DynamicURL_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DynamicMultiURL" (
    "id" TEXT NOT NULL,
    "urls" TEXT[],
    "titles" TEXT[],
    "uniqueToken" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "qrCode" VARCHAR(3000) NOT NULL,
    "userId" TEXT NOT NULL,
    "qrCodeAnalyticsId" TEXT NOT NULL,

    CONSTRAINT "DynamicMultiURL_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DynamicFreeText" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "freetext" VARCHAR(5000) NOT NULL,
    "qrCode" VARCHAR(3000) NOT NULL,
    "uniqueToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "qrCodeAnalyticsId" TEXT NOT NULL,

    CONSTRAINT "DynamicFreeText_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DynamicContact" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "organisation" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "qrCode" VARCHAR(3000) NOT NULL,
    "uniqueToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "qrCodeAnalyticsId" TEXT NOT NULL,

    CONSTRAINT "DynamicContact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AiURLQRCode" (
    "id" TEXT NOT NULL,
    "url" VARCHAR(500) NOT NULL,
    "uniqueToken" TEXT NOT NULL,
    "image_url" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "qrCodeAnalyticsId" TEXT NOT NULL,

    CONSTRAINT "AiURLQRCode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MulitUrlAiQr" (
    "id" TEXT NOT NULL,
    "urls" TEXT[],
    "titles" TEXT[],
    "uniqueToken" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "image_url" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "qrCodeAnalyticsId" TEXT NOT NULL,

    CONSTRAINT "MulitUrlAiQr_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AiFreeTextQr" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "freetext" VARCHAR(3000) NOT NULL,
    "image_url" TEXT NOT NULL,
    "uniqueToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "qrCodeAnalyticsId" TEXT NOT NULL,

    CONSTRAINT "AiFreeTextQr_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AiContactQr" (
    "id" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "organisation" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "image_url" TEXT NOT NULL,
    "uniqueToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "qrCodeAnalyticsId" TEXT NOT NULL,

    CONSTRAINT "AiContactQr_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProSubscription" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "stripe_customer_id" TEXT NOT NULL,
    "stripe_subscription_id" TEXT,
    "stripe_price_id" TEXT,
    "stripe_current_period_end" TIMESTAMP(3),

    CONSTRAINT "ProSubscription_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlusSubscription" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "stripe_customer_id" TEXT NOT NULL,
    "stripe_subscription_id" TEXT,
    "stripe_price_id" TEXT,
    "stripe_current_period_end" TIMESTAMP(3),

    CONSTRAINT "PlusSubscription_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE INDEX "userId" ON "Session"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");

-- CreateIndex
CREATE UNIQUE INDEX "DynamicURL_uniqueToken_key" ON "DynamicURL"("uniqueToken");

-- CreateIndex
CREATE UNIQUE INDEX "DynamicURL_qrCodeAnalyticsId_key" ON "DynamicURL"("qrCodeAnalyticsId");

-- CreateIndex
CREATE UNIQUE INDEX "DynamicMultiURL_uniqueToken_key" ON "DynamicMultiURL"("uniqueToken");

-- CreateIndex
CREATE UNIQUE INDEX "DynamicMultiURL_qrCodeAnalyticsId_key" ON "DynamicMultiURL"("qrCodeAnalyticsId");

-- CreateIndex
CREATE UNIQUE INDEX "DynamicFreeText_uniqueToken_key" ON "DynamicFreeText"("uniqueToken");

-- CreateIndex
CREATE UNIQUE INDEX "DynamicFreeText_qrCodeAnalyticsId_key" ON "DynamicFreeText"("qrCodeAnalyticsId");

-- CreateIndex
CREATE UNIQUE INDEX "DynamicContact_uniqueToken_key" ON "DynamicContact"("uniqueToken");

-- CreateIndex
CREATE UNIQUE INDEX "DynamicContact_qrCodeAnalyticsId_key" ON "DynamicContact"("qrCodeAnalyticsId");

-- CreateIndex
CREATE UNIQUE INDEX "AiURLQRCode_uniqueToken_key" ON "AiURLQRCode"("uniqueToken");

-- CreateIndex
CREATE UNIQUE INDEX "AiURLQRCode_qrCodeAnalyticsId_key" ON "AiURLQRCode"("qrCodeAnalyticsId");

-- CreateIndex
CREATE UNIQUE INDEX "MulitUrlAiQr_uniqueToken_key" ON "MulitUrlAiQr"("uniqueToken");

-- CreateIndex
CREATE UNIQUE INDEX "MulitUrlAiQr_qrCodeAnalyticsId_key" ON "MulitUrlAiQr"("qrCodeAnalyticsId");

-- CreateIndex
CREATE UNIQUE INDEX "AiFreeTextQr_uniqueToken_key" ON "AiFreeTextQr"("uniqueToken");

-- CreateIndex
CREATE UNIQUE INDEX "AiFreeTextQr_qrCodeAnalyticsId_key" ON "AiFreeTextQr"("qrCodeAnalyticsId");

-- CreateIndex
CREATE UNIQUE INDEX "AiContactQr_uniqueToken_key" ON "AiContactQr"("uniqueToken");

-- CreateIndex
CREATE UNIQUE INDEX "AiContactQr_qrCodeAnalyticsId_key" ON "AiContactQr"("qrCodeAnalyticsId");

-- CreateIndex
CREATE UNIQUE INDEX "ProSubscription_userId_key" ON "ProSubscription"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "ProSubscription_stripe_customer_id_key" ON "ProSubscription"("stripe_customer_id");

-- CreateIndex
CREATE UNIQUE INDEX "ProSubscription_stripe_subscription_id_key" ON "ProSubscription"("stripe_subscription_id");

-- CreateIndex
CREATE UNIQUE INDEX "PlusSubscription_userId_key" ON "PlusSubscription"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "PlusSubscription_stripe_customer_id_key" ON "PlusSubscription"("stripe_customer_id");

-- CreateIndex
CREATE UNIQUE INDEX "PlusSubscription_stripe_subscription_id_key" ON "PlusSubscription"("stripe_subscription_id");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QRCodeAnalytics" ADD CONSTRAINT "QRCodeAnalytics_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MultiURLCode" ADD CONSTRAINT "MultiURLCode_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DynamicURL" ADD CONSTRAINT "DynamicURL_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DynamicURL" ADD CONSTRAINT "DynamicURL_qrCodeAnalyticsId_fkey" FOREIGN KEY ("qrCodeAnalyticsId") REFERENCES "QRCodeAnalytics"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DynamicMultiURL" ADD CONSTRAINT "DynamicMultiURL_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DynamicMultiURL" ADD CONSTRAINT "DynamicMultiURL_qrCodeAnalyticsId_fkey" FOREIGN KEY ("qrCodeAnalyticsId") REFERENCES "QRCodeAnalytics"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DynamicFreeText" ADD CONSTRAINT "DynamicFreeText_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DynamicFreeText" ADD CONSTRAINT "DynamicFreeText_qrCodeAnalyticsId_fkey" FOREIGN KEY ("qrCodeAnalyticsId") REFERENCES "QRCodeAnalytics"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DynamicContact" ADD CONSTRAINT "DynamicContact_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DynamicContact" ADD CONSTRAINT "DynamicContact_qrCodeAnalyticsId_fkey" FOREIGN KEY ("qrCodeAnalyticsId") REFERENCES "QRCodeAnalytics"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AiURLQRCode" ADD CONSTRAINT "AiURLQRCode_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AiURLQRCode" ADD CONSTRAINT "AiURLQRCode_qrCodeAnalyticsId_fkey" FOREIGN KEY ("qrCodeAnalyticsId") REFERENCES "QRCodeAnalytics"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MulitUrlAiQr" ADD CONSTRAINT "MulitUrlAiQr_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MulitUrlAiQr" ADD CONSTRAINT "MulitUrlAiQr_qrCodeAnalyticsId_fkey" FOREIGN KEY ("qrCodeAnalyticsId") REFERENCES "QRCodeAnalytics"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AiFreeTextQr" ADD CONSTRAINT "AiFreeTextQr_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AiFreeTextQr" ADD CONSTRAINT "AiFreeTextQr_qrCodeAnalyticsId_fkey" FOREIGN KEY ("qrCodeAnalyticsId") REFERENCES "QRCodeAnalytics"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AiContactQr" ADD CONSTRAINT "AiContactQr_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AiContactQr" ADD CONSTRAINT "AiContactQr_qrCodeAnalyticsId_fkey" FOREIGN KEY ("qrCodeAnalyticsId") REFERENCES "QRCodeAnalytics"("id") ON DELETE CASCADE ON UPDATE CASCADE;
