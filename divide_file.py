import os

def divide_file(input_file, lines_per_file = 10000, output_folder = "divided_files"):
    # Ensure the output folder exists
    if not os.path.exists(output_folder):
        os.makedirs(output_folder)

    with open(input_file, 'r') as f:
        file_index = 1
        while True:
            # Read the next 10,000 lines
            lines = [f.readline() for _ in range(lines_per_file)]

            # Stop if we've reached the end of the file
            if not lines[0]:
                break

            # Specify the output file path inside the folder
            output_file = os.path.join(output_folder, f"{file_index}.txt")

            # Write the chunk of lines to a new file
            with open(output_file, 'w') as out_f:
                out_f.writelines(lines)

            print(f"Created: {output_file}")
            file_index += 1

divide_file('xlsx_to_txt/logs.txt')

spl