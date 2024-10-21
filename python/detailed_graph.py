import sys
import json
import pandas as pd
import numpy as np
from statsmodels.tsa.arima.model import ARIMA
from datetime import timedelta
import argparse

def get_temperature_data(data, field_of_interest, days=30):
    data['device_date'] = pd.to_datetime(data['device_date'])
    end_date = data['device_date'].max()
    start_date = end_date - timedelta(days=days)
    filtered_data = data[(data['device_date'] >= start_date) & (data['device_date'] <= end_date)]
    return filtered_data.sort_values(by='device_date')

def line_chart(data):
    field_of_interest = 'chw_in_temp'
    df = get_temperature_data(data, field_of_interest)
    df.set_index('device_date', inplace=True)
    model = ARIMA(df[field_of_interest], order=(1, 1, 1))
    results = model.fit()
    forecast = results.forecast(steps=7)
    last_date = df.index[-1]
    future_dates = [last_date + timedelta(days=i + 1) for i in range(len(forecast))]
    predictive_data = {
        'type': 'time_series_forecast',
        'dates': [date.strftime('%Y-%m-%d') for date in future_dates],
        'values': forecast.values.tolist(),
    }
    current_avg = df[field_of_interest].mean()
    forecast_avg = forecast.mean()
    percent_change = ((forecast_avg - current_avg) / current_avg) * 100
    efficiency_impact = get_efficiency_impact(percent_change)
    recommendation = generate_recommendation(efficiency_impact)
    impact_cards = generate_impact_cards(current_avg, forecast_avg, percent_change, efficiency_impact)
    return {
        'predictive_graph': predictive_data,
        'impact_cards': impact_cards,
        'recommendation': recommendation,
    }

def waterfall_chart(data):
    df = get_temperature_data(data, field_of_interest='chw_in_temp', days=30)
    df['temp_diff'] = df['chw_in_temp'] - df['chw_out_temp']
    predictive_data = {
        'type': 'line_chart',
        'dates': [date.strftime('%Y-%m-%d') for date in df['device_date']],
        'chw_in_temp': df['chw_in_temp'].tolist(),
        'chw_out_temp': df['chw_out_temp'].tolist(),
        'temp_diff': df['temp_diff'].tolist(),
    }
    avg_diff = df['temp_diff'].mean()
    max_diff = df['temp_diff'].max()
    min_diff = df['temp_diff'].min()
    temp_diff_trend = df['temp_diff'].iloc[-1] - df['temp_diff'].iloc[0]
    impact_cards = generate_waterfall_impact_cards(avg_diff, max_diff, min_diff, temp_diff_trend)
    recommendation = generate_waterfall_recommendation(temp_diff_trend)
    return {
        'predictive_graph': predictive_data,
        'impact_cards': impact_cards,
        'recommendation': recommendation
    }

def donut_chart(data):
    df = get_temperature_data(data, field_of_interest='chw_in_temp', days=30)
    df.index = pd.to_datetime(df.index, errors='coerce')
    predictive_data = {
        'type': 'line',
        'labels': df.index.strftime('%Y-%m-%d').tolist(),
        'datasets': [{
            'label': 'Temperature',
            'data': df['chw_in_temp'].tolist(),
        }]
    }
    temp_ranges = {
        'Low': sum(1 for temp in df['chw_in_temp'] if temp < 20),
        'Medium': sum(1 for temp in df['chw_in_temp'] if 20 <= temp < 25),
        'High': sum(1 for temp in df['chw_in_temp'] if temp >= 25)
    }
    total = sum(temp_ranges.values())
    forecast = {k: v / total for k, v in temp_ranges.items() if total > 0}
    impact_cards = generate_donut_impact_cards(forecast)
    dominant_range = max(forecast, key=forecast.get)
    recommendation = generate_donut_recommendation(dominant_range)
    return {
        'predictive_graph': predictive_data,
        'impact_cards': impact_cards,
        'recommendation': recommendation
    }

def combination_chart(data):
    df = get_temperature_data(data, field_of_interest='chw_in_temp', days=365)
    df.set_index('device_date', inplace=True)
    df = df.resample('M').mean()
    temp_model = ARIMA(df['chw_in_temp'], order=(1, 1, 1))
    temp_results = temp_model.fit()
    temp_forecast = temp_results.forecast(steps=3)
    pressure_model = ARIMA(df['vaccum_pr'], order=(1, 1, 1))
    pressure_results = pressure_model.fit()
    pressure_forecast = pressure_results.forecast(steps=3)
    predictive_data = {
        'type': 'overlay_combination',
        'dates': [str(date) for date in temp_forecast.index],
        'temp_values': temp_forecast.values.tolist(),
        'pressure_values': pressure_forecast.values.tolist(),
    }
    temp_change = (temp_forecast.mean() - df['chw_in_temp'].mean()) / df['chw_in_temp'].mean() * 100
    pressure_change = (pressure_forecast.mean() - df['vaccum_pr'].mean()) / df['vaccum_pr'].mean() * 100
    impact_cards = generate_combination_impact_cards(temp_change, pressure_change)
    recommendation = generate_combination_recommendation(temp_change, pressure_change)
    return {
        'predictive_graph': predictive_data,
        'impact_cards': impact_cards,
        'recommendation': recommendation
    }

def get_efficiency_impact(percent_change):
    abs_change = abs(percent_change)
    if abs_change < 2:
        return 'Low'
    elif abs_change < 5:
        return 'Medium'
    else:
        return 'High'

def generate_recommendation(impact):
    if impact == 'Low':
        return "The machine's efficiency is good. Continue maintaining current operational parameters."
    elif impact == 'Medium':
        return "Consider adjusting the cooling system or reviewing recent maintenance logs to improve efficiency."
    else:
        return "Immediate attention required. Check for system anomalies and consider reducing load to bring the machine back to normal operating conditions."

def generate_impact_cards(current_avg, forecast_avg, percent_change, efficiency_impact):
    return [
        {
            'title': 'Average Temperature Change',
            'value': f'{forecast_avg - current_avg:.2f}°C',
            'description': 'Predicted change in average temperature'
        },
        {
            'title': 'Percentage Change',
            'value': f'{percent_change:.2f}%',
            'description': 'Percentage change in temperature'
        },
        {
            'title': 'Efficiency Impact',
            'value': efficiency_impact,
            'description': 'Estimated impact on system efficiency'
        }
    ]

def generate_waterfall_impact_cards(avg_diff, max_diff, min_diff, temp_diff_trend):
    return [
        {
            'title': 'Average Temperature Difference',
            'value': f'{avg_diff:.2f}°C',
            'description': 'Average daily temperature difference'
        },
        {
            'title': 'Maximum Temperature Difference',
            'value': f'{max_diff:.2f}°C',
            'description': 'Highest recorded temperature difference'
        },
        {
            'title': 'Minimum Temperature Difference',
            'value': f'{min_diff:.2f}°C',
            'description': 'Lowest recorded temperature difference'
        },
        {
            'title': 'Temperature Difference Trend',
            'value': 'Increasing' if temp_diff_trend > 0 else 'Decreasing',
            'description': f'{abs(temp_diff_trend):.2f}°C change over period'
        }
    ]

def generate_waterfall_recommendation(temp_diff_trend):
    if abs(temp_diff_trend) < 1:
        return "The temperature difference between input and output is stable. Continue current operational practices."
    elif temp_diff_trend > 1:
        return "The temperature difference is increasing. This could indicate improving efficiency, but check if it's within optimal range for your system."
    else:
        return "The temperature difference is decreasing. This might indicate reduced cooling efficiency. Consider inspecting the system for potential issues."

def generate_donut_impact_cards(forecast):
    return [
        {
            'title': 'Dominant Temperature Range',
            'value': max(forecast, key=forecast.get),
            'description': 'Most frequent temperature range'
        },
        {
            'title': 'Low Temperature Percentage',
            'value': f'{forecast["Low"]*100:.2f}%',
            'description': 'Percentage of low temperature readings'
        },
        {
            'title': 'High Temperature Percentage',
            'value': f'{forecast["High"]*100:.2f}%',
            'description': 'Percentage of high temperature readings'
        }
    ]

def generate_donut_recommendation(dominant_range):
    if dominant_range == 'Low':
        return "The majority of readings fall in the low temperature range. Consider evaluating if the cooling system is over-performing."
    elif dominant_range == 'High':
        return "High temperature readings dominate. This could indicate potential inefficiency in the cooling system. Investigate for any issues."
    else:
        return "Temperature readings are within an optimal range. Continue monitoring for consistent performance."

def generate_combination_impact_cards(temp_change, pressure_change):
    return [
        {
            'title': 'Temperature Change',
            'value': f'{temp_change:.2f}%',
            'description': 'Predicted change in average temperature'
        },
        {
            'title': 'Pressure Change',
            'value': f'{pressure_change:.2f}%',
            'description': 'Predicted change in average pressure'
        }
    ]

def generate_combination_recommendation(temp_change, pressure_change):
    if temp_change > 5 or pressure_change > 5:
        return "Significant changes predicted. Immediate investigation recommended to ensure optimal performance."
    return "Predicted changes are within acceptable ranges. Regular monitoring advised."

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument('--chart-type', required=True, choices=['line_chart', 'waterfall_chart', 'donut_chart', 'combination_chart'])
    args = parser.parse_args()

    input_data = sys.stdin.read()
    data = json.loads(input_data)
    df = pd.DataFrame(data)
    
    if args.chart_type == 'line_chart':
        result = line_chart(df)
    elif args.chart_type == 'waterfall_chart':
        result = waterfall_chart(df)
    elif args.chart_type == 'donut_chart':
        result = donut_chart(df)
    elif args.chart_type == 'combination_chart':
        result = combination_chart(df)
    
    print(json.dumps(result))