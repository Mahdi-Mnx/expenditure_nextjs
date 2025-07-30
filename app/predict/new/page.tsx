import { Suspense } from "react";
import NewPredictionScreen from "@/components/predict/NewPredictionScreen";

export default function NewPredictionPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NewPredictionScreen />
    </Suspense>
  );
}
