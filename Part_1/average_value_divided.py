from collections import defaultdict
from average_value_calc import testing
from pathlib import Path
import os

def divide_file(input_file, output_folder):

    os.makedirs(output_folder, exist_ok=True)

    with open(input_file, 'r') as f:
        lines = f.readlines()
        lines.sort()

        file_date = lines[0].split(' ')[0] # get the first date
        file = []

        # in the following for loop, checks:
        for i, line in enumerate(lines):
            # if the date not in current line or we are by the last line
            if file_date not in line or i == len(lines) - 1:
                # write the lines until now into a file titled by date.
                output_file = os.path.join(output_folder, f"{file_date}.txt")
                with open(output_file, 'w') as o_file:
                    o_file.writelines(file)
                # empty file and update to new date
                file = []
                file_date = line.split(' ')[0]
            # add date to file
            file.append(line)

def calc_average_per_part(input_file):

    dic = defaultdict(list)

    with open(input_file, 'r') as f:
        for line in f:
            tms, vl = line.strip().split(',')

            ky = tms[:13] + ':00:00'
            dic[ky].append(float(vl))

        lst = []
        for k, v in dic.items():
            lst.append(f'{k},{round(sum(v) / len(v), 2)}\n')

    return lst

def calc_average(input_file, output_file, output_folder):
    divide_file(input_file, output_folder)

    folder = Path(output_folder)
    lst = []

    # go through files, calculate average and write them all into a file.
    for file_path in folder.iterdir():
        if file_path.is_file():
            lst += calc_average_per_part(file_path)

    with open(output_file, 'w') as f:
        f.write("Start Time,Average\n")
        f.writelines(lst)


# testing('convert_xlsx/time_series.csv')
calc_average('convert_xlsx/time_series.csv', 'convert_xlsx/average_per_hour_divided.csv', 'divided_files_average')