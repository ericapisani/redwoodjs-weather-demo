-- CreateTable
CREATE TABLE "WeatherReport" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "worldCityId" TEXT NOT NULL,
    "headline" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "tempFahrenheit" INTEGER NOT NULL,
    "feelsLikeFahrenheit" INTEGER NOT NULL,
    "tempMinFahrenheit" INTEGER NOT NULL,
    "tempMaxFahrenheit" INTEGER NOT NULL,
    "tempCelcius" INTEGER NOT NULL,
    "feelsLikeCelcius" INTEGER NOT NULL,
    "tempMinCelcius" INTEGER NOT NULL,
    "tempMaxCelcius" INTEGER NOT NULL,
    "temp" DOUBLE PRECISION NOT NULL,
    "feelsLike" DOUBLE PRECISION NOT NULL,
    "tempMin" DOUBLE PRECISION NOT NULL,
    "tempMax" DOUBLE PRECISION NOT NULL,
    "pressure" INTEGER NOT NULL,
    "humidity" INTEGER NOT NULL,
    "windSpeed" DOUBLE PRECISION NOT NULL,
    "windDegrees" INTEGER NOT NULL,
    "sunrise" TIMESTAMP(3) NOT NULL,
    "sunset" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WeatherReport_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "WeatherReport" ADD CONSTRAINT "WeatherReport_worldCityId_fkey" FOREIGN KEY ("worldCityId") REFERENCES "WorldCity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
