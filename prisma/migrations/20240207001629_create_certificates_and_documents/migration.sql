-- CreateTable
CREATE TABLE "certificates" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "hours" INTEGER NOT NULL,
    "initialDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "certificates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "documents" (
    "identifier" TEXT NOT NULL,

    CONSTRAINT "documents_pkey" PRIMARY KEY ("identifier")
);

-- CreateTable
CREATE TABLE "_CertificateToDocument" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CertificateToDocument_AB_unique" ON "_CertificateToDocument"("A", "B");

-- CreateIndex
CREATE INDEX "_CertificateToDocument_B_index" ON "_CertificateToDocument"("B");

-- AddForeignKey
ALTER TABLE "_CertificateToDocument" ADD CONSTRAINT "_CertificateToDocument_A_fkey" FOREIGN KEY ("A") REFERENCES "certificates"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CertificateToDocument" ADD CONSTRAINT "_CertificateToDocument_B_fkey" FOREIGN KEY ("B") REFERENCES "documents"("identifier") ON DELETE CASCADE ON UPDATE CASCADE;
