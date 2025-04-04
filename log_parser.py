'''
    סיבוכיות זמן:
    אם מספר השגיאות קטנה יחסית אז התשובה היא: O(n)
    אחרת אם מספר השגיאות (k) גדולה: O(n + k log k)
    הסבר מפורט בREADME
'''


from collections import Counter
from pathlib import Path
import pandas as pd
import os

# Divide the large log.txt file into smaller txt files of 10,000 lines per file.
def divide_file(input_file, lines_per_file = 10000, output_folder = "divided_files"):
    # Ensure the output folder exists, if not create it.
    os.makedirs(output_folder, exist_ok=True)

    with open(input_file, 'r') as f:
        file_index = 1 # Index used to name the new txt files that are created.

        while True:
            # Read the next 10,000 lines.
            lines = [f.readline() for _ in range(lines_per_file)]

            # Stop if we've reached the end of the file.
            if not lines[0]:
                break

            # Specify the output file path inside the folder.
            output_file = os.path.join(output_folder, f"{file_index}.txt")

            # Write the chunk of lines to a new file.
            with open(output_file, 'w') as out_f:
                out_f.writelines(lines)

            file_index += 1 # Update the index.

# In each new txt file of 10,000 lines - find the count of each error.
def find_error_count_per_part(input_file):
        # Read the file into a pandas DataFrame, dividing it into columns of Timestamp and Error.
        df = pd.read_csv(input_file, delimiter=',', header=None)

        # Specify column names.
        df.columns = ['Timestamp', 'Error']

        # Group by 'error' and count the occurrences.
        group = df.groupby('Error').size().to_dict()
        group = {key.strip().split(' ')[1]: value for key, value in group.items()}

        # Return the DataFrameGroupBy object as a dictionary.
        return  group

# Find the n most common errors.
def common_errors(input_file, n):
    divide_file(input_file)

    folder = Path("divided_files")

    cntr = Counter() # Counter to unite results from smaller chunks of the big log file.

    for file_path in folder.iterdir():
        # Check if it's a file
        if file_path.is_file():
            cntr += Counter(find_error_count_per_part(file_path)) # Merge dictionaries.

    lst = cntr.most_common() # Sort counter by most common.

    return lst[:n]


common_errors('xlsx_to_txt/logs.txt', 3)
