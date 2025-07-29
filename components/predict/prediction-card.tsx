import {
  BarChart3,
  Clock,
  MapPin,
  Home,
  Users,
  TrendingUp,
  Edit3,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface PredictionCardProps {
  prediction: any;
  onEdit: (prediction: any) => void;
  onDelete: (id: string) => void;
  formatCurrency: (amount: number) => string;
  formatDate: (dateString: string) => string;
}

export function PredictionCard({
  prediction,
  onEdit,
  onDelete,
  formatCurrency,
  formatDate,
}: PredictionCardProps) {
  const totalInputs =
    prediction.input_data.Food_Expenditure +
    prediction.input_data.NonFood_Expenditure +
    prediction.input_data.Housing_Expenditure +
    prediction.input_data.Transport_Expenditure +
    prediction.input_data.Utilities_Expenditure;

  return (
    <Card className="bg-slate-800 rounded-xl p-4 mb-4 border border-slate-700">
      {/* Header */}
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <div className="flex items-center mb-1">
            <BarChart3 size={16} className="text-emerald-500" />
            <p className="text-emerald-500 font-bold text-lg ml-2">
              {formatCurrency(prediction.predicted_exp)}
            </p>
          </div>
          <div className="flex items-center">
            <Clock size={12} className="text-slate-500" />
            <p className="text-slate-400 text-xs ml-1">
              {formatDate(prediction.created_at)}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="bg-blue-500/20 hover:bg-blue-500/30 p-2 rounded-lg"
            onClick={() => onEdit(prediction)}
          >
            <Edit3 size={16} className="text-blue-500" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="bg-red-500/20 hover:bg-red-500/30 p-2 rounded-lg"
            onClick={() => onDelete(prediction.id)}
          >
            <Trash2 size={16} className="text-red-500" />
          </Button>
        </div>
      </div>

      {/* Household Info */}
      <div className="flex justify-between mb-3">
        <div className="flex items-center">
          <MapPin size={14} className="text-slate-500" />
          <p className="text-slate-300 text-sm ml-1">
            {prediction.input_data.Region}
          </p>
        </div>
        <div className="flex items-center">
          <Home size={14} className="text-slate-500" />
          <p className="text-slate-300 text-sm ml-1">
            {prediction.input_data.Residence_Type}
          </p>
        </div>
        <div className="flex items-center">
          <Users size={14} className="text-slate-500" />
          <p className="text-slate-300 text-sm ml-1">
            {prediction.input_data.Number_of_Members} members
          </p>
        </div>
      </div>

      {/* Expenditure Breakdown */}
      <div className="bg-slate-700/50 rounded-lg p-3">
        <p className="text-slate-300 text-xs font-medium mb-2">
          Input Breakdown
        </p>
        <div className="flex justify-between">
          <div className="text-center">
            <p className="text-slate-400 text-xs">Food</p>
            <p className="text-white text-sm font-bold">
              {formatCurrency(prediction.input_data.Food_Expenditure)}
            </p>
          </div>
          <div className="text-center">
            <p className="text-slate-400 text-xs">Housing</p>
            <p className="text-white text-sm font-bold">
              {formatCurrency(prediction.input_data.Housing_Expenditure)}
            </p>
          </div>
          <div className="text-center">
            <p className="text-slate-400 text-xs">Transport</p>
            <p className="text-white text-sm font-bold">
              {formatCurrency(prediction.input_data.Transport_Expenditure)}
            </p>
          </div>
        </div>
      </div>

      {/* Model Info */}
      <div className="flex justify-between items-center mt-3 pt-3 border-t border-slate-700">
        <div className="flex items-center">
          <div className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></div>
          <p className="text-slate-400 text-xs">
            Model: {prediction.model_used}
          </p>
        </div>
        <div className="flex items-center">
          <TrendingUp size={12} className="text-slate-500" />
          <p className="text-slate-400 text-xs ml-1">
            {((prediction.predicted_exp / totalInputs - 1) * 100).toFixed(1)}%
            variance
          </p>
        </div>
      </div>
    </Card>
  );
}
