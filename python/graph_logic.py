# python/graph_logic.py
import json
from statistics import mean
from datetime import datetime
from collections import Counter

# Function to generate graph data
def generate_graphs_data(data):
    chw_in_temps = [entry['chw_in_temp'] for entry in data]
    chw_out_temps = [entry['chw_out_temp'] for entry in data]
    cow_in_temps = [entry['cow_in_temp'] for entry in data]
    cow_out_temps = [entry['cow_out_temp'] for entry in data]
    vaccum_prs = [entry['vaccum_pr'] for entry in data]
    device_dates = [entry['device_date'] for entry in data]

    # Calculate total entries
    total_entries_stats = len(data)

    # Calculate min and max for CHW in and out temperatures
    chw_in_temp_stats = {'min_chw_in_temp': min(chw_in_temps), 'max_chw_in_temp': max(chw_in_temps)}
    chw_out_temp_stats = {'min_chw_out_temp': min(chw_out_temps), 'max_chw_out_temp': max(chw_out_temps)}

    # Calculate average temperatures
    avg_temps = {
        'avg_chw_in_temp': mean(chw_in_temps),
        'avg_chw_out_temp': mean(chw_out_temps),
        'avg_cow_in_temp': mean(cow_in_temps),
        'avg_cow_out_temp': mean(cow_out_temps)
    }

    # Format time to exclude seconds for line chart labels
    formatted_times = [
        datetime.fromisoformat(time.replace("Z", "+00:00")).strftime('%H:%M')
        for time in device_dates
    ]

    # Line chart data
    line_data = {
        'labels': formatted_times,
        'datasets': [
            {'label': 'CHW In', 'data': chw_in_temps, 'borderColor': 'rgb(255, 99, 132)'},
            {'label': 'CHW Out', 'data': chw_out_temps, 'borderColor': 'rgb(54, 162, 235)'},
            {'label': 'COW In', 'data': cow_in_temps, 'borderColor': 'rgb(255, 206, 86)'},
            {'label': 'COW Out', 'data': cow_out_temps, 'borderColor': 'rgb(75, 192, 192)'}
        ]
    }

    # Temp changes Line chart data
    line_chart_data = {
        'x': ["Initial", "CHW In", "CHW Out", "COW In", "COW Out"],
        'y': [0, avg_temps['avg_chw_in_temp'], avg_temps['avg_chw_out_temp'], avg_temps['avg_cow_in_temp'], avg_temps['avg_cow_out_temp']]
    }

    # Gauge meter data for pressure
    avg_pressure = mean(vaccum_prs)
    gauge_data = {
        'value': round(avg_pressure, 2),
        'title': 'Average Pressure',
        'range': [0, 100],
        'steps': [
            {'range': [0, 30], 'color': 'lightgreen'},
            {'range': [30, 70], 'color': 'yellow'},
            {'range': [70, 100], 'color': 'red'}
        ],
        'threshold': {
            'line': {'color': 'red', 'width': 4},
            'value': 85
        }
    }

    # Donut chart data
    temp_type_counts = Counter({
        'CHW In': len(chw_in_temps),
        'CHW Out': len(chw_out_temps),
        'COW In': len(cow_in_temps),
        'COW Out': len(cow_out_temps)
    })
    donut_data = {
        'labels': ['CHW In', 'CHW Out', 'COW In', 'COW Out'],
        'datasets': [
            {
                'data': [temp_type_counts['CHW In'], temp_type_counts['CHW Out'], temp_type_counts['COW In'], temp_type_counts['COW Out']],
                'backgroundColor': ['#A3C9F1', '#D1C4E9', '#B3E5A3', '#FFF9C4']
            }
        ]
    }

    # Extract the actual month from the 'device_dates'
    formatted_months = [datetime.fromisoformat(time.replace("Z", "+00:00")).strftime('%b') for time in device_dates]

    # Combination chart data (average by month)
    combination_data = {
        'labels': formatted_months,  # Example labels, you can pass the actual month data
        'datasets': [
            {
                'type': 'bar',
                'label': 'Avg CHW In Temperature',
                'data': [avg_temps['avg_chw_in_temp'], avg_temps['avg_chw_out_temp']],  # Example data
                'backgroundColor': 'rgba(255, 99, 132, 0.8)',
                'yAxisID': 'y-axis-1',
            },
            {
                'type': 'line',
                'label': 'Avg Pressure',
                'data': [avg_pressure, avg_pressure],  # Example data
                'borderColor': 'rgba(54, 162, 235, 1)',
                'yAxisID': 'y-axis-2',
            }
        ]
    }

    return {
        "total_entries": total_entries_stats,
        "chw_in_temp": chw_in_temp_stats,
        "chw_out_temp": chw_out_temp_stats,
        "avg_temps": avg_temps,
        'line_chart': line_data,
        'tempchange_line_chart': line_chart_data,
        'gauge_chart': gauge_data,
        'donut_chart': donut_data,
        'combination_chart': combination_data,
    }

# Reading input from Node.js
if __name__ == "__main__":
    import sys
    input_data = sys.stdin.read()
    parsed_data = json.loads(input_data)
    result = generate_graphs_data(parsed_data)
    print(json.dumps(result))
