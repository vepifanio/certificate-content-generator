-- CreateTable
CREATE TABLE "certificates" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "hours" INTEGER NOT NULL,
    "initialDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "certificates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "documents" (
    "identifier" TEXT NOT NULL,

    CONSTRAINT "documents_pkey" PRIMARY KEY ("identifier")
);

-- CreateTable
CREATE TABLE "documents_on_certificates" (
    "certificateId" TEXT NOT NULL,
    "documentIdentifier" TEXT NOT NULL,

    CONSTRAINT "documents_on_certificates_pkey" PRIMARY KEY ("certificateId","documentIdentifier")
);

-- AddForeignKey
ALTER TABLE "documents_on_certificates" ADD CONSTRAINT "documents_on_certificates_certificateId_fkey" FOREIGN KEY ("certificateId") REFERENCES "certificates"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "documents_on_certificates" ADD CONSTRAINT "documents_on_certificates_documentIdentifier_fkey" FOREIGN KEY ("documentIdentifier") REFERENCES "documents"("identifier") ON DELETE RESTRICT ON UPDATE CASCADE;
