"use client";
import React, { useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Cookies from "js-cookie";
import Link from "next/link";

// Define the validation schema using Zod
export const UserDetails = z.object({
  age: z.coerce
    .number()
    .min(1, "Age must be a positive number")
    .max(120, "Age must be less than 120"),
  weight: z.coerce.number().min(1, "Weight must be a positive number"),
  height: z.coerce.number().min(1, "Height must be a positive number"),
  gender: z.enum(["male", "female"], {
    errorMap: () => ({ message: "Gender is required" }),
  }),
  activity_level: z.enum(
    [
      "sedentary",
      "lightly_active",
      "moderately_active",
      "active",
      "very_active",
    ],
    {
      errorMap: () => ({ message: "Activity level is required" }),
    },
  ),
  target: z.enum(["maintain", "gain", "loss"], {
    errorMap: () => ({ message: "Target is required" }),
  }),
});

export type UserDetailsType = z.infer<typeof UserDetails>;

export function CalorieCalculator() {
  const [userDetails, setUserDetails] = useState<UserDetailsType | null>(null);

  const [results, setResults] = useState<{
    bmi: number;
    calorieNeeds: number;
    idealWeight: number;
    bmiCategory: string;
  } | null>(null);
  const [showResults, setShowResults] = useState(false);

  // Initialize useForm with Zod resolver
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserDetailsType>({
    resolver: zodResolver(UserDetails),
  });

  const onSubmit: SubmitHandler<UserDetailsType> = (data) => {
    const { age, weight, height, gender, activity_level, target } = data;

    // Simple BMI calculation
    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);

    // Calculate daily calorie needs (using Mifflin-St Jeor Equation)
    let bmr;
    if (gender === "male") {
      bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }

    // Activity level multipliers
    const mult = {
      sedentary: 1.2,
      lightly_active: 1.375,
      moderately_active: 1.55,
      active: 1.725,
      very_active: 1.9,
    };

    // Calculate calorie needs based on activity level
    let calorieNeeds = bmr * (mult[activity_level] ?? 1.2); // Default to sedentary if not found

    // Adjust calorie needs based on target
    switch (target) {
      case "loss":
        calorieNeeds = calorieNeeds - 500; // Subtract 500 calories for weight loss
        break;
      case "gain":
        calorieNeeds = calorieNeeds + 500; // Add 500 calories for weight gain
        break;
      case "maintain":
      default:
        break;
    }

    // Calculate ideal weight (using BMI of 22 as the target for healthy weight)
    const idealBMI = 22;
    const idealWeight = idealBMI * (heightInMeters * heightInMeters);

    // Determine BMI category
    let bmiCategory;
    if (bmi < 18.5) {
      bmiCategory = "kurus tingkat ringan";
    } else if (bmi < 24.9) {
      bmiCategory = "berat badan ideal";
    } else {
      bmiCategory = "kelebihan berat badan";
    }

    // Set results
    setUserDetails(data);
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
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="age" className="font-medium text-gray-500">
                  Age
                </label>
                <input
                  type="number"
                  id="age"
                  placeholder="e.g. 25"
                  {...register("age")}
                  className={`w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500 ${errors.age ? "border-red-500" : ""}`}
                  style={{ appearance: "none" }} // Remove default browser styles
                />
                {errors.age && (
                  <p className="text-red-500">{errors.age.message}</p>
                )}
              </div>
              <div>
                <label htmlFor="gender" className="font-medium text-gray-500">
                  Gender
                </label>
                <select
                  id="gender"
                  {...register("gender")}
                  className={`w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500 ${errors.gender ? "border-red-500" : ""}`}
                  style={{ appearance: "none" }} // Remove default browser styles
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
                {errors.gender && (
                  <p className="text-red-500">{errors.gender.message}</p>
                )}
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
                  {...register("weight")}
                  className={`w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500 ${errors.weight ? "border-red-500" : ""}`}
                  style={{ appearance: "none" }} // Remove default browser styles
                />
                {errors.weight && (
                  <p className="text-red-500">{errors.weight.message}</p>
                )}
              </div>
              <div>
                <label htmlFor="height" className="font-medium text-gray-500">
                  Height (cm)
                </label>
                <input
                  type="number"
                  id="height"
                  placeholder="e.g. 175"
                  {...register("height")}
                  className={`w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500 ${errors.height ? "border-red-500" : ""}`}
                  style={{ appearance: "none" }} // Remove default browser styles
                />
                {errors.height && (
                  <p className="text-red-500">{errors.height.message}</p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="activity_level"
                  className="font-medium text-gray-500"
                >
                  Activity Levels
                </label>
                <select
                  id="activity_level"
                  {...register("activity_level")}
                  className={`w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500 ${errors.activity_level ? "border-red-500" : ""}`}
                  style={{ appearance: "none" }} // Remove default browser styles
                >
                  <option value="">Activity Level</option>
                  <option value="sedentary">Sedentary</option>
                  <option value="lightly_active">Lightly active</option>
                  <option value="moderately_active">Moderately active</option>
                  <option value="active">Active</option>
                  <option value="very_active">Very active</option>
                </select>
                {errors.activity_level && (
                  <p className="text-red-500">
                    {errors.activity_level.message}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="target" className="font-medium text-gray-500">
                  Target
                </label>
                <select
                  id="target"
                  {...register("target")}
                  className={`w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500 ${errors.target ? "border-red-500" : ""}`}
                  style={{ appearance: "none" }} // Remove default browser styles
                >
                  <option value="">Target</option>
                  <option value="maintain">Maintain Weight</option>
                  <option value="gain">Weight Gain</option>
                  <option value="loss">Weight Loss</option>
                </select>
                {errors.target && (
                  <p className="text-red-500">{errors.target.message}</p>
                )}
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
        {showResults && results && (
          <div
            className={`transform pt-16 text-center transition-opacity duration-500 ${
              showResults
                ? "translate-y-0 opacity-100"
                : "translate-y-4 opacity-0"
            }`}
          >
            <h3 className="text-4xl font-bold text-white">
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
                IMT kamu {results.bmi.toFixed(1)} yang menunjukkan kamu termasuk{" "}
                <span className="font-bold">{results.bmiCategory}</span>
                {!(results.bmi < 24.9 && results.bmi > 17.5) &&
                  `. Saat ini, berat badan kamu masih belum ideal`}
                . Berdasarkan kalkulasi, berat badan idealmu adalah{" "}
                {results.idealWeight.toFixed(1)} kg.{" "}
                <span className="font-bold">
                  Kamu membutuhkan {results.calorieNeeds} kkal/hari.{" "}
                </span>
              </p>
            </div>
            <p className="mt-4 text-lg text-gray-100 underline">
              Bingung mau makan apa? maimeals.com akan merekomendasikan meal
              plan yang dapat langsung kamu order.
            </p>
            <Link
              className="mt-12"
              // href={`/chat/${Cookies.get("sessionId") ?? ""}`}
              // href={"http://168.231.119.233:7900/"}
              href={"/chat"}
            >
              <span className="bg-white px-4 text-3xl font-bold text-accent-red">
                Chat dengan bot sekarang
              </span>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
