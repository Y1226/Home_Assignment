import pandas as pd

def xlsx_to_txt(input_file, output_file, delimiter="\t"):
    # Read the Excel file
    df = pd.read_excel(input_file, engine='openpyxl')

    # Convert DataFrame to a TXT file with a chosen delimiter (default: tab)
    df.to_csv(output_file, sep=delimiter, index=False)

    print(f"Conversion complete: {output_file}")

def xlsx_to_csv(input_file, output_file):
    # Read the Excel file
    df = pd.read_excel(input_file)

    # Convert to a csv file
    df.to_csv(output_file, index=False, header=False)

    print(f"Conversion complete: {output_file}")

# Example usage
# xlsx_to_txt("logs.txt.xlsx", "logs.txt")
xlsx_to_csv("time_series.xlsx", "time_series.csv")
