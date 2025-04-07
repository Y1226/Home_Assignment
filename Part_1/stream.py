import time
import random
from collections import deque


# Function to simulate streaming data from a file line by line
def stream_from_file(input_file):
    """Simulate streaming data by reading from a file line by line."""
    with open(input_file, 'r') as f:
        for line in f:
            tms, value = line.strip().split(',')  # Assume CSV format
            yield tms, float(value)  # Yield timestamp and value as a tuple


# Function to update moving average in real-time from file data
def update_average_from_file_per_hour(file_path, window_size=5):
    """
    Continuously calculates the moving average of the last `window_size` values
    from the file, simulating stream processing.
    :param file_path: Path to the data file
    :param window_size: Number of data points to consider for the moving average
    """
    stream = deque()  # To hold the stream of data points
    total_sum = 0  # Sum of values in the current window

    for timestamp, value in stream_from_file(file_path):
        print(f"Received value: {value:.2f} at {timestamp}")

        # Add the new value to the stream
        stream.append(value)
        total_sum += value

        # If we exceed the window size, remove the oldest value
        if len(stream) > window_size:
            old_value = stream.popleft()
            total_sum -= old_value

        # Calculate and print the moving average
        moving_avg = total_sum / len(stream)
        print(f"Current Moving Average: {moving_avg:.2f}")

        # Sleep to simulate time delay between new data points
        time.sleep(1)  # Simulating real-time arrival of data


# Start processing the file in a stream-like fashion
update_average_from_file_per_hour('convert_xlsx/time_series.csv', window_size=5)