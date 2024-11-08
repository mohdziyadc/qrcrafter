-- CreateTable
CREATE TABLE "AnonymousUser" (
    "id" TEXT NOT NULL,
    "vistorId" TEXT NOT NULL,
    "numQrCodes" INTEGER NOT NULL DEFAULT 0,
    "lastGeneratedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AnonymousUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AnonymousURLQr" (
    "id" TEXT NOT NULL,
    "url" VARCHAR(500) NOT NULL,
    "anonymousUserId" TEXT NOT NULL,
    "image_url" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "uniqueToken" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AnonymousURLQr_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AnonymousMultiUrlQr" (
    "id" TEXT NOT NULL,
    "urls" TEXT[],
    "titles" TEXT[],
    "name" TEXT NOT NULL,
    "image_url" TEXT NOT NULL,
    "uniqueToken" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "anonymousUserId" TEXT NOT NULL,

    CONSTRAINT "AnonymousMultiUrlQr_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AnonymousContactQr" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "organisation" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "image_url" TEXT NOT NULL,
    "uniqueToken" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "anonymousUserId" TEXT NOT NULL,

    CONSTRAINT "AnonymousContactQr_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AnonymousFreetextQr" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "image_url" TEXT NOT NULL,
    "free_text" VARCHAR(3000) NOT NULL,
    "uniqueToken" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "anonymousUserId" TEXT NOT NULL,

    CONSTRAINT "AnonymousFreetextQr_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AnonymousUser_vistorId_key" ON "AnonymousUser"("vistorId");

-- CreateIndex
CREATE UNIQUE INDEX "AnonymousURLQr_uniqueToken_key" ON "AnonymousURLQr"("uniqueToken");

-- CreateIndex
CREATE UNIQUE INDEX "AnonymousMultiUrlQr_uniqueToken_key" ON "AnonymousMultiUrlQr"("uniqueToken");

-- CreateIndex
CREATE UNIQUE INDEX "AnonymousContactQr_uniqueToken_key" ON "AnonymousContactQr"("uniqueToken");

-- CreateIndex
CREATE UNIQUE INDEX "AnonymousFreetextQr_uniqueToken_key" ON "AnonymousFreetextQr"("uniqueToken");

-- AddForeignKey
ALTER TABLE "AnonymousURLQr" ADD CONSTRAINT "AnonymousURLQr_anonymousUserId_fkey" FOREIGN KEY ("anonymousUserId") REFERENCES "AnonymousUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnonymousMultiUrlQr" ADD CONSTRAINT "AnonymousMultiUrlQr_anonymousUserId_fkey" FOREIGN KEY ("anonymousUserId") REFERENCES "AnonymousUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnonymousContactQr" ADD CONSTRAINT "AnonymousContactQr_anonymousUserId_fkey" FOREIGN KEY ("anonymousUserId") REFERENCES "AnonymousUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnonymousFreetextQr" ADD CONSTRAINT "AnonymousFreetextQr_anonymousUserId_fkey" FOREIGN KEY ("anonymousUserId") REFERENCES "AnonymousUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;
