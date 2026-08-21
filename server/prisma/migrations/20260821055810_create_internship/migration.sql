-- CreateTable
CREATE TABLE "Internship" (
    "id" SERIAL NOT NULL,
    "company" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "stipend" DOUBLE PRECISION,
    "appliedDate" TIMESTAMP(3),
    "notes" TEXT NOT NULL,

    CONSTRAINT "Internship_pkey" PRIMARY KEY ("id")
);
