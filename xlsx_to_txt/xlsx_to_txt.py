import pandas as pd

def xlsx_to_txt(input_file, output_file, delimiter="\t"):
    # Read the Excel file
    df = pd.read_excel(input_file, engine='openpyxl')

    # Convert DataFrame to a TXT file with a chosen delimiter (default: tab)
    df.to_csv(output_file, sep=delimiter, index=False, header=True)

    print(f"Conversion complete: {output_file}")

# Example usage
xlsx_to_txt("logs.txt.xlsx", "logs.txt")
