"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  TrendingUp,
  TrendingDown,
  BarChart3,
  ArrowRight,
  RefreshCw,
  Calendar,
  DollarSign,
  Activity,
} from "lucide-react";
import "./comparison-results.css";
import { ComparisonResult, PredictionData } from "@/types/predict";

interface ComparisonResultsProps {
  result: ComparisonResult;
  prediction1: PredictionData;
  prediction2: PredictionData;
  formatCurrency: (amount: number) => string;
  formatDate: (dateString: string) => string;
  onReset: () => void;
}

export function ComparisonResults({
  result,
  prediction1,
  prediction2,
  formatCurrency,
  formatDate,
  onReset,
}: ComparisonResultsProps) {
  const isPositiveDifference = result.percentage_difference > 0;
  const maxCategoryValue = Math.max(
    ...result.category_breakdown.map((cat) =>
      Math.max(cat.actual, cat.predicted)
    )
  );

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case "food":
        return "🍽️";
      case "housing":
        return "🏠";
      case "education":
        return "📚";
      case "utilities":
        return "⚡";
      case "communication":
        return "📱";
      case "savings":
        return "💰";
      default:
        return "📊";
    }
  };

  return (
    <div className="comparison-results">
      {/* Header Summary */}
      <Card className="comparison-summary-card">
        <div className="comparison-summary-header">
          <h2 className="comparison-summary-title">
            <BarChart3 className="comparison-summary-icon" />
            Comparison Analysis
          </h2>
          <Button className="comparison-reset-button" onClick={onReset}>
            <RefreshCw className="comparison-reset-icon" />
            New Comparison
          </Button>
        </div>

        <div className="comparison-summary-content">
          <div className="comparison-totals">
            <div className="comparison-total-item">
              <div className="comparison-total-label">First Prediction</div>
              <div className="comparison-total-value prediction-1">
                {formatCurrency(result.prediction1_total)}
              </div>
              <div className="comparison-total-date">
                <Calendar className="comparison-total-date-icon" />
                {formatDate(prediction1.created_at)}
              </div>
            </div>

            <div className="comparison-arrow">
              <ArrowRight className="comparison-arrow-icon" />
            </div>

            <div className="comparison-total-item">
              <div className="comparison-total-label">Second Prediction</div>
              <div className="comparison-total-value prediction-2">
                {formatCurrency(result.prediction2_total)}
              </div>
              <div className="comparison-total-date">
                <Calendar className="comparison-total-date-icon" />
                {formatDate(prediction2.created_at)}
              </div>
            </div>
          </div>

          <div className="comparison-difference">
            <div className="comparison-difference-absolute">
              <DollarSign className="comparison-difference-icon" />
              <span className="comparison-difference-label">
                Absolute Difference
              </span>
              <span className="comparison-difference-value">
                {formatCurrency(Math.abs(result.absolute_difference))}
              </span>
            </div>

            <div className="comparison-difference-percentage">
              <div
                className={`comparison-percentage-badge ${
                  isPositiveDifference ? "positive" : "negative"
                }`}
              >
                {isPositiveDifference ? (
                  <TrendingUp className="comparison-percentage-icon" />
                ) : (
                  <TrendingDown className="comparison-percentage-icon" />
                )}
                <span>
                  {Math.abs(result.percentage_difference).toFixed(1)}%
                </span>
              </div>
            </div>
          </div>

          <div className="comparison-message">
            <Activity className="comparison-message-icon" />
            <p className="comparison-message-text">
              {result.comparison_message}
            </p>
          </div>
        </div>
      </Card>

      {/* Category Breakdown */}
      <Card className="comparison-breakdown-card">
        <div className="comparison-breakdown-header">
          <h3 className="comparison-breakdown-title">Category Breakdown</h3>
          <p className="comparison-breakdown-subtitle">
            Detailed comparison across different expenditure categories
          </p>
        </div>

        <div className="comparison-breakdown-content">
          {result.category_breakdown.map((category, index) => {
            const isPositive = category.difference > 0;
            const actualPercentage = (category.actual / maxCategoryValue) * 100;
            const predictedPercentage =
              (category.predicted / maxCategoryValue) * 100;

            return (
              <div
                key={category.category}
                className="comparison-category-item"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="comparison-category-header">
                  <div className="comparison-category-info">
                    <span className="comparison-category-icon">
                      {getCategoryIcon(category.category)}
                    </span>
                    <span className="comparison-category-name">
                      {category.category}
                    </span>
                  </div>
                  <div
                    className={`comparison-category-change ${
                      isPositive ? "positive" : "negative"
                    }`}
                  >
                    {isPositive ? (
                      <TrendingUp className="comparison-category-change-icon" />
                    ) : (
                      <TrendingDown className="comparison-category-change-icon" />
                    )}
                    <span>
                      {Math.abs(category.percentage_diff).toFixed(1)}%
                    </span>
                  </div>
                </div>

                <div className="comparison-category-bars">
                  <div className="comparison-category-bar">
                    <div className="comparison-category-bar-label">
                      <span>Prediction 1</span>
                      <span className="comparison-category-bar-value">
                        {formatCurrency(category.actual)}
                      </span>
                    </div>
                    <div className="comparison-category-bar-container">
                      <div
                        className="comparison-category-bar-fill prediction-1-bar"
                        style={{ width: `${actualPercentage}%` }}
                      />
                    </div>
                  </div>

                  <div className="comparison-category-bar">
                    <div className="comparison-category-bar-label">
                      <span>Prediction 2</span>
                      <span className="comparison-category-bar-value">
                        {formatCurrency(category.predicted)}
                      </span>
                    </div>
                    <div className="comparison-category-bar-container">
                      <div
                        className="comparison-category-bar-fill prediction-2-bar"
                        style={{ width: `${predictedPercentage}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="comparison-category-difference">
                  <span className="comparison-category-difference-label">
                    Difference:
                  </span>
                  <span
                    className={`comparison-category-difference-value ${
                      isPositive ? "positive" : "negative"
                    }`}
                  >
                    {isPositive ? "+" : ""}
                    {formatCurrency(category.difference)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Prediction Details */}
      <div className="comparison-details-grid">
        <Card className="comparison-detail-card">
          <div className="comparison-detail-header">
            <h4 className="comparison-detail-title">
              First Prediction Details
            </h4>
            <div className="comparison-detail-badge prediction-1-badge">
              {prediction1.model_used}
            </div>
          </div>
          <div className="comparison-detail-content">
            <div className="comparison-detail-item">
              <span className="comparison-detail-label">Region:</span>
              <span className="comparison-detail-value">
                {prediction1.input_data.Region_Name}
              </span>
            </div>
            <div className="comparison-detail-item">
              <span className="comparison-detail-label">Area:</span>
              <span className="comparison-detail-value">
                {prediction1.input_data.Area_Name}
              </span>
            </div>
            <div className="comparison-detail-item">
              <span className="comparison-detail-label">Household Size:</span>
              <span className="comparison-detail-value">
                {prediction1.input_data.hhsize}
              </span>
            </div>
            <div className="comparison-detail-item">
              <span className="comparison-detail-label">Food Expenditure:</span>
              <span className="comparison-detail-value">
                {formatCurrency(prediction1.input_data.exp_food)}
              </span>
            </div>
          </div>
        </Card>

        <Card className="comparison-detail-card">
          <div className="comparison-detail-header">
            <h4 className="comparison-detail-title">
              Second Prediction Details
            </h4>
            <div className="comparison-detail-badge prediction-2-badge">
              {prediction2.model_used}
            </div>
          </div>
          <div className="comparison-detail-content">
            <div className="comparison-detail-item">
              <span className="comparison-detail-label">Region:</span>
              <span className="comparison-detail-value">
                {prediction2.input_data.Region_Name}
              </span>
            </div>
            <div className="comparison-detail-item">
              <span className="comparison-detail-label">Area:</span>
              <span className="comparison-detail-value">
                {prediction2.input_data.Area_Name}
              </span>
            </div>
            <div className="comparison-detail-item">
              <span className="comparison-detail-label">Household Size:</span>
              <span className="comparison-detail-value">
                {prediction2.input_data.hhsize}
              </span>
            </div>
            <div className="comparison-detail-item">
              <span className="comparison-detail-label">Food Expenditure:</span>
              <span className="comparison-detail-value">
                {formatCurrency(prediction2.input_data.exp_food)}
              </span>
            </div>
          </div>
        </Card>
      </div>

      {/* Timing Information */}
      <Card className="comparison-timing-card">
        <div className="comparison-timing-content">
          <Calendar className="comparison-timing-icon" />
          <div className="comparison-timing-text">
            <span className="comparison-timing-label">
              Creation Time Difference:
            </span>
            <span className="comparison-timing-value">
              {result.created_at_difference}
            </span>
          </div>
        </div>
      </Card>
    </div>
  );
}
