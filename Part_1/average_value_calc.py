from collections import defaultdict
from datetime import datetime

# Tests
def value_is_float(vl):
    try:
        float(vl)
        return True
    except ValueError:
        return False

def valid_timestamp(tms):
    try:
        datetime.strptime(tms, "%Y-%m-%d %H:%M:%S")
        # return dt <= datetime.now() - not a valid check, because all dates are after now()
        return True
    except ValueError:
        return False

def testing(input_file):
    file = set()

    with open(input_file, 'r') as f:
        lines = f.readlines()

        for l in lines:

            tms, vl = l.split(',')

            # Check that the value and date format are correct.
            if value_is_float(vl) and valid_timestamp(tms):
                file.add(l)

    with open(input_file, 'w') as f:
        f.writelines(file)

    return 1

def calc_average(input_file, output_file):

    dic = defaultdict(list)

    with open(input_file, 'r') as f:
        for line in f:
            tms, vl = line.strip().split(',')

            dt = datetime.strptime(tms, "%Y-%m-%d %H:%M:%S")
            ky = f'{dt.date()} {dt.hour}:00:00'

            dic[ky].append(float(vl))

    with open(output_file, 'w') as file:
        file.write("Start Time,Average\n")

        for k, v in dic.items():
            file.write(f'{k},{round(sum(v) / len(v), 2)}\n')

    return 1

# testing('convert_xlsx/time_series.csv')
calc_average('convert_xlsx/time_series.csv', 'convert_xlsx/average_per_hour.csv')
