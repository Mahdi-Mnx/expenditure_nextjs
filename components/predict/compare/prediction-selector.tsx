"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  BarChart3,
  Clock,
  MapPin,
  Home,
  Users,
  Search,
  Check,
} from "lucide-react";
import "./prediction-selector.css";
import { PredictionData } from "@/types/predict";

interface PredictionSelectorProps {
  predictions: PredictionData[];
  selectedPrediction: PredictionData | null;
  onSelect: (prediction: PredictionData) => void;
  excludeId?: string;
  formatCurrency: (amount: number) => string;
  formatDate: (dateString: string) => string;
  placeholder: string;
}

export function PredictionSelector({
  predictions,
  selectedPrediction,
  onSelect,
  excludeId,
  formatCurrency,
  formatDate,
  placeholder,
}: PredictionSelectorProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const filteredPredictions = predictions
    .filter((p) => p.id !== excludeId)
    .filter((p) => {
      if (!searchTerm) return true;
      const searchLower = searchTerm.toLowerCase();
      return (
        p.input_data.Region_Name.toLowerCase().includes(searchLower) ||
        p.input_data.Area_Name.toLowerCase().includes(searchLower) ||
        formatCurrency(p.predicted_exp).toLowerCase().includes(searchLower) ||
        p.model_used.toLowerCase().includes(searchLower)
      );
    });

  const handleSelect = (prediction: PredictionData) => {
    onSelect(prediction);
    setIsOpen(false);
    setSearchTerm("");
  };

  return (
    <div className="prediction-selector">
      {/* Selected Prediction Display */}
      {selectedPrediction ? (
        <Card className="selected-prediction-card">
          <div className="selected-prediction-header">
            <div className="selected-prediction-main">
              <div className="selected-prediction-amount">
                <BarChart3 className="selected-prediction-icon" />
                <span className="selected-prediction-value">
                  {formatCurrency(selectedPrediction.predicted_exp)}
                </span>
              </div>
              <div className="selected-prediction-date">
                <Clock className="selected-prediction-date-icon" />
                <span>{formatDate(selectedPrediction.created_at)}</span>
              </div>
            </div>
            <Button
              className="change-selection-button"
              onClick={() => setIsOpen(true)}
            >
              Change
            </Button>
          </div>

          <div className="selected-prediction-details">
            <div className="selected-prediction-detail">
              <MapPin className="selected-prediction-detail-icon" />
              <span>{selectedPrediction.input_data.Region_Name}</span>
            </div>
            <div className="selected-prediction-detail">
              <Home className="selected-prediction-detail-icon" />
              <span>{selectedPrediction.input_data.Area_Name}</span>
            </div>
            <div className="selected-prediction-detail">
              <Users className="selected-prediction-detail-icon" />
              <span>{selectedPrediction.input_data.hhsize} members</span>
            </div>
          </div>

          <div className="selected-prediction-model">
            <div className="selected-prediction-model-indicator" />
            <span>Model: {selectedPrediction.model_used}</span>
          </div>
        </Card>
      ) : (
        /* Selection Interface */
        <Card className="selector-card">
          <div className="selector-placeholder" onClick={() => setIsOpen(true)}>
            <BarChart3 className="selector-placeholder-icon" />
            <span className="selector-placeholder-text">{placeholder}</span>
          </div>
        </Card>
      )}

      {/* Selection Modal */}
      {isOpen && (
        <div
          className="selector-modal-overlay"
          onClick={() => setIsOpen(false)}
        >
          <div className="selector-modal" onClick={(e) => e.stopPropagation()}>
            <div className="selector-modal-header">
              <h3 className="selector-modal-title">Select Prediction</h3>
              <Button
                className="selector-modal-close"
                onClick={() => setIsOpen(false)}
              >
                ×
              </Button>
            </div>

            <div className="selector-search">
              <div className="selector-search-container">
                <Search className="selector-search-icon" />
                <Input
                  className="selector-search-input"
                  placeholder="Search predictions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="selector-list">
              {filteredPredictions.length === 0 ? (
                <div className="selector-empty">
                  <p>No predictions found matching your search.</p>
                </div>
              ) : (
                filteredPredictions.map((prediction) => (
                  <Card
                    key={prediction.id}
                    className="selector-item"
                    onClick={() => handleSelect(prediction)}
                  >
                    <div className="selector-item-header">
                      <div className="selector-item-main">
                        <div className="selector-item-amount">
                          <BarChart3 className="selector-item-icon" />
                          <span className="selector-item-value">
                            {formatCurrency(prediction.predicted_exp)}
                          </span>
                        </div>
                        <div className="selector-item-date">
                          <Clock className="selector-item-date-icon" />
                          <span>{formatDate(prediction.created_at)}</span>
                        </div>
                      </div>
                      {selectedPrediction?.id === prediction.id && (
                        <Check className="selector-item-check" />
                      )}
                    </div>

                    <div className="selector-item-details">
                      <div className="selector-item-detail">
                        <MapPin className="selector-item-detail-icon" />
                        <span>{prediction.input_data.Region_Name}</span>
                      </div>
                      <div className="selector-item-detail">
                        <Home className="selector-item-detail-icon" />
                        <span>{prediction.input_data.Area_Name}</span>
                      </div>
                      <div className="selector-item-detail">
                        <Users className="selector-item-detail-icon" />
                        <span>{prediction.input_data.hhsize} members</span>
                      </div>
                    </div>
                  </Card>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
