import pandas as pd

def read_parquet(input_file):
    df = pd.read_parquet(input_file)
    print(df.head())

read_parquet('convert_xlsx/time_series.parquet')