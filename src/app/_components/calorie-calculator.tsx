"use client";
import React, { useState } from "react";

export function CalorieCalculator() {
  const [results, setResults] = useState<{
    bmi: string;
    calorieNeeds: string;
    idealWeight: string;
    bmiCategory: string;
  } | null>(null);
  const [showResults, setShowResults] = useState(false);

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const age = event.target.age.value;
    const weight = event.target.weight.value;
    const height = event.target.height.value;
    const gender = event.target.gender.value;

    // Simple BMI calculation
    const heightInMeters = height / 100;
    const bmi = (weight / (heightInMeters * heightInMeters)).toFixed(1);

    // Calculate daily calorie needs (using Mifflin-St Jeor Equation)
    let bmr;
    if (gender === "male") {
      bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }
    const calorieNeeds = (bmr * 1.2).toFixed(0); // Assuming sedentary activity level

    // Calculate ideal weight (using BMI of 22 as the target for healthy weight)
    const idealBMI = 22;
    const idealWeight = (idealBMI * (heightInMeters * heightInMeters)).toFixed(
      1,
    );

    // Determine BMI category
    let bmiCategory;
    if (parseFloat(bmi) < 18.5) {
      bmiCategory = "kurus tingkat ringan";
    } else if (parseFloat(bmi) < 24.9) {
      bmiCategory = "berat badan ideal";
    } else {
      bmiCategory = "kelebihan berat badan";
    }

    // Set results
    setResults({ bmi, calorieNeeds, idealWeight, bmiCategory });
    setShowResults(true);
  };

  return (
    <section className="relative bg-accent-red px-8 pb-28 pt-16">
      <div className="container mx-auto px-4">
        <h2 className="mb-2 pt-12 text-center text-5xl font-bold text-white">
          Personalisasi Kebutuhan Dietmu!
        </h2>
        <p className="mb-8 text-center text-xl text-white">
          Hitung kebutuhan kalori Anda berdasarkan tinggi badan, berat badan,
          umur, jenis kelamin, dan aktivitas Anda.
        </p>
        <div
          className="mx-auto rounded-lg bg-white p-8 shadow-md"
          style={{ width: "70vw", maxWidth: "600px" }}
        >
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="age" className="font-medium text-gray-500">
                  Age
                </label>
                <input
                  type="number"
                  id="age"
                  placeholder="e.g. 25"
                  className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500"
                  style={{ appearance: "none" }} // Remove default browser styles
                  required
                />
              </div>
              <div>
                <label htmlFor="gender" className="font-medium text-gray-500">
                  Gender
                </label>
                <select
                  id="gender"
                  className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500"
                  style={{ appearance: "none" }} // Remove default browser styles
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="weight" className="font-medium text-gray-500">
                  Weight (kg)
                </label>
                <input
                  type="number"
                  id="weight"
                  placeholder="e.g. 70"
                  className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500"
                  style={{ appearance: "none" }} // Remove default browser styles
                  required
                />
              </div>
              <div>
                <label htmlFor="height" className="font-medium text-gray-500">
                  Height (cm)
                </label>
                <input
                  type="number"
                  id="height"
                  placeholder="e.g. 175"
                  className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500"
                  style={{ appearance: "none" }} // Remove default browser styles
                  required
                />
              </div>
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="rounded-[20px] bg-yellow-500 px-6 py-1 text-lg font-bold text-accent-red hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              >
                Calculate
              </button>
            </div>
          </form>
        </div>

        {/* Results Section with Animation */}
        {/* Results Section with Animation */}
        {showResults && results && (
          <div
            className={`transform pt-16 text-center transition-opacity duration-500 ${
              showResults
                ? "translate-y-0 opacity-100"
                : "translate-y-4 opacity-0"
            }`}
          >
            <h3 className="text-4xl font-bold">
              Kebutuhan kalori harian kamu adalah{" "}
              <span className="bg-white px-5 py-1 text-accent-red">
                {results.calorieNeeds} kkal/hari.{" "}
              </span>
            </h3>
            <div
              className="mx-auto mt-4 rounded-xl bg-white px-4 py-4 shadow-md"
              style={{ width: "70vw", maxWidth: "600px" }}
            >
              <p className="text-lg font-normal text-black">
                IMT kamu {results.bmi} yang menunjukkan kamu termasuk{" "}
                <span className="font-bold">{results.bmiCategory}</span>. Saat
                ini, berat badan kamu masih belum ideal. Berat badan idealmu
                adalah {results.idealWeight} kg.{" "}
                <span className="font-bold">
                  kamu membutuhkan {results.calorieNeeds} kkal/hari.{" "}
                </span>
              </p>
            </div>
            <p className="mt-4 text-lg text-gray-100 underline">
              Bingung mau makan apa? maimeals.com akan merekomendasikan meal
              plan yang dapat langsung kamu order.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
