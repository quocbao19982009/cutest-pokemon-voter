/*
  Warnings:

  - You are about to drop the column `voteAgainst` on the `Vote` table. All the data in the column will be lost.
  - You are about to drop the column `voteFor` on the `Vote` table. All the data in the column will be lost.
  - Added the required column `voteAgainstId` to the `Vote` table without a default value. This is not possible if the table is not empty.
  - Added the required column `voteForId` to the `Vote` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Vote" DROP COLUMN "voteAgainst",
DROP COLUMN "voteFor",
ADD COLUMN     "voteAgainstId" INTEGER NOT NULL,
ADD COLUMN     "voteForId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Pokemon" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "spriteUrl" TEXT NOT NULL,

    CONSTRAINT "Pokemon_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Vote_voteForId_idx" ON "Vote"("voteForId");

-- CreateIndex
CREATE INDEX "Vote_voteAgainstId_idx" ON "Vote"("voteAgainstId");

-- AddForeignKey
ALTER TABLE "Vote" ADD CONSTRAINT "Vote_voteForId_fkey" FOREIGN KEY ("voteForId") REFERENCES "Pokemon"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vote" ADD CONSTRAINT "Vote_voteAgainstId_fkey" FOREIGN KEY ("voteAgainstId") REFERENCES "Pokemon"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
