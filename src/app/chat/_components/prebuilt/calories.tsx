import { Card } from "@/app/_components/ui/card";
import { Skeleton } from "@/app/_components/ui/skeleton";

export interface CaloriesProps {
  bmi: number;
  cathegory: string;
  bmr: number;
  maintenance_calories: number;
  required_calories: number;
}

export function CaloriesLoading(): JSX.Element {
  return (
    <Card className="flex h-[275px] max-h-[275px] w-[275px] max-w-[275px] flex-col justify-center bg-yellow-400 p-2">
      <div className="mb-1 flex items-center justify-between">
        <Skeleton className="h-[16px] w-[100px]" />
        <Skeleton className="h-[16px] w-[75px]" />
      </div>
      <div className="mb-4 text-left">
        <Skeleton className="h-[16px] w-[125px]" />
      </div>
      <div className="mb-8 flex flex-grow flex-col items-center justify-center">
        <div className="flex flex-row gap-2">
          <Skeleton className="h-[96px] w-[48px] rounded-3xl" />
          <Skeleton className="h-[96px] w-[48px] rounded-3xl" />
          <Skeleton className="h-[32px] w-[32px] rounded-full" />
        </div>
      </div>
      <div className="pb-4">
        <Skeleton className="h-[26px] w-full rounded-3xl" />
      </div>
    </Card>
  );
}

export function Calories(props: CaloriesProps): JSX.Element {
  return (
    <Card className="flex h-[275px] max-h-[275px] w-[275px] max-w-[275px] flex-col justify-center bg-yellow-400 p-2">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-xl font-bold text-accent-red underline">
          Your result:
        </h1>
        <div className="my-2 flex flex-col items-center justify-center font-bold text-black">
          <p className="text-2xl">BMI: {props.bmi}</p>
          <p className="text-xl">({props.cathegory})</p>
        </div>
        <div className="my-2 flex flex-col items-center justify-center rounded-lg bg-white p-2 text-center">
          <p className="text-xl font-medium text-black">BMR: {props.bmr}</p>
          <p className="text-md font-medium text-accent-red">
            maintenance calories: {props.maintenance_calories}
          </p>
          <p className="text-md font-medium text-accent-red">
            required calories: {props.required_calories}
          </p>
        </div>
      </div>
    </Card>
  );
}
