-- CreateTable
CREATE TABLE "WorldCity" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "simpleMapsId" BIGINT NOT NULL,
    "city" TEXT NOT NULL,
    "cityAscii" TEXT NOT NULL,
    "lat" DOUBLE PRECISION NOT NULL,
    "lng" DOUBLE PRECISION NOT NULL,
    "country" TEXT NOT NULL,
    "iso2" TEXT NOT NULL,
    "iso3" TEXT NOT NULL,
    "adminName" TEXT,
    "capital" TEXT,
    "population" INTEGER DEFAULT 0,

    CONSTRAINT "WorldCity_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "WorldCity_simpleMapsId_key" ON "WorldCity"("simpleMapsId");

-- CreateIndex
CREATE UNIQUE INDEX "WorldCity_simpleMapsId_city_key" ON "WorldCity"("simpleMapsId", "city");

-- CreateIndex
CREATE UNIQUE INDEX "WorldCity_simpleMapsId_city_cityAscii_country_key" ON "WorldCity"("simpleMapsId", "city", "cityAscii", "country");
