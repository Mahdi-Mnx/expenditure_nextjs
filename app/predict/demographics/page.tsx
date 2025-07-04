"use client";

import { useRouter } from "next/navigation";
import { PredictionLayout } from "@/components/prediction-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { waterTypeOptions, regionOptions, usePrediction } from "@/contexts/prediction-context"
import { Users, MapPin, DollarSign, Droplets, Zap } from "lucide-react";

export default function DemographicsPage() {
  const { state, dispatch } = usePrediction();
  const router = useRouter();

  const updateInput = (field: string, value: number | string) => {
    dispatch({
      type: "UPDATE_INPUTS",
      payload: { [field]: value },
    });
  };

  const handleNext = () => {
    dispatch({ type: "COMPLETE_STEP", payload: 0 });
    router.push("/predict/expenditures");
  };

  const handlePrevious = () => {
    router.push("/");
  };

  return (
    <PredictionLayout
      currentStep={0}
      title="Household Demographics"
      description="Tell us about your household composition and basic information"
      onNext={handleNext}
      onPrevious={handlePrevious}
      canGoNext={!!state.inputs.hhsize && !!state.inputs.region_n && !!state.inputs.hh_water_type}
    >
      <div className="space-y-6">
        {/* Basic Demographics */}
        <Card className="bg-blue-900/20 border border-blue-500/30">
          <CardHeader>
            <CardTitle className="text-blue-300 flex items-center gap-2">
              <Users className="h-5 w-5" />
              Household Composition
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-slate-300">Household Size</Label>
                <Input
                  type="number"
                  value={state.inputs.hhsize}
                  onChange={(e) =>
                    updateInput("hhsize", Number(e.target.value))
                  }
                  className="bg-slate-700 border-slate-600 text-white focus:border-blue-400"
                  placeholder="Number of people"
                  min="1"
                  max="20"
                />
                <p className="text-sm text-slate-400">
                  Total number of people living in your household
                </p>
              </div>

              <div className="space-y-2">
                <Label className="text-slate-300 flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Region Type
                </Label>
              <Select
                value={state.inputs.region_n?.toString() ?? ""}
                onValueChange={(value) => updateInput("region_n", Number(value))}
              >
                <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                  <SelectValue placeholder="Select Region" />
                </SelectTrigger>
                <SelectContent className="bg-slate-700 border-slate-600">
                  {regionOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value.toString()}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
                <p className="text-sm text-slate-400">
                  This affects regional cost adjustments in predictions
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Economic Status */}
        <Card className="bg-yellow-900/20 border border-yellow-500/30">
          <CardHeader>
            <CardTitle className="text-yellow-300 flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Economic Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-slate-700 rounded-lg">
              <div>
                <Label className="text-slate-300 font-medium">
                  Poverty Status
                </Label>
                <p className="text-sm text-slate-400">
                  Are you currently below the poverty line?
                </p>
              </div>
              <Switch
                checked={state.inputs.poor === 1}
                onCheckedChange={(checked) =>
                  updateInput("poor", checked ? 1 : 0)
                }
              />
            </div>
          </CardContent>
        </Card>

        {/* Utilities & Infrastructure */}
        <Card className="bg-emerald-900/20 border border-emerald-500/30">
          <CardHeader>
            <CardTitle className="text-emerald-300">
              Utilities & Infrastructure
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-center justify-between p-4 bg-slate-700 rounded-lg">
                <div className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-emerald-400" />
                  <div>
                    <Label className="text-slate-300 font-medium">
                      Electricity Access
                    </Label>
                    <p className="text-sm text-slate-400">
                      Do you have electricity?
                    </p>
                  </div>
                </div>
                <Switch
                  checked={state.inputs.hh_electricity === 1}
                  onCheckedChange={(checked) =>
                    updateInput("hh_electricity", checked ? 1 : 0)
                  }
                />
              </div>

              <div className="space-y-2">
                <Label className="text-slate-300 flex items-center gap-2">
                  <Droplets className="h-4 w-4 text-emerald-400" />
                  Water Source
                </Label>
                <Select
                  value={state.inputs.hh_water_type?.toString() ?? ""}
                  onValueChange={(value) => updateInput("hh_water_type", Number(value))}
                >
                  <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                    <SelectValue placeholder="Select Water Source" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-700 border-slate-600">
                    {waterTypeOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value.toString()}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PredictionLayout>
  );
}
