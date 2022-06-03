-- CreateIndex
CREATE INDEX "WorldCity_city_idx" ON "WorldCity"("city");

-- CreateIndex
CREATE INDEX "WorldCity_cityAscii_idx" ON "WorldCity"("cityAscii");

-- CreateIndex
CREATE INDEX "WorldCity_country_idx" ON "WorldCity"("country");

-- CreateIndex
CREATE INDEX "WorldCity_city_country_idx" ON "WorldCity"("city", "country");

-- CreateIndex
CREATE INDEX "WorldCity_cityAscii_country_idx" ON "WorldCity"("cityAscii", "country");
