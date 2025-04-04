# Time and Space Complexity for log_parser

## Time Complexity: O(n + k log k), where n is the amount of lines in the log.txt file, and k is the amount of error types in the file.
##                  O(n) - if k is a small number that makes k log k linear.
## Space Complexity: O(k), where k is the amount of error types in the log.txt file.

## 1. **`divide_file`**:

**Time** = O(1) + O(n) = **O(n)**
- `os.makedirs = O(1)` → it is just creating the one folder to store the files.
- `while True = O(n)` → where `n` is the number of lines in the `log.txt` file:
  - `read = O(10,000)` + `write = O(10,000) = O(10,000)`
  - `while = O(n / 10,000)` → going over the file 10,000 lines at a time.
  - `n/10,000 * 10,000 = n`

**Space** = O(1) + O(lines_per_file) = O(10,000)
- `os.makedirs = O(1)` → a string of the filename is stored in the memory.
- `while True = O(lines_per_file)`:
  - `read = O(10,000)` → hold the lines that are read.
  - `write = not relevant because it is written to the disk.
  - `file_index, output_file = O(1)` → simple strings.

## 2. **`find_error_count_per_part`**:

**Time** = O(n) + O(n) + O(k) + O(k*m) = **O(n) = O(10,000)**
- `pd.read_csv = O(n)` → where `n` is the number of lines in the new txt file.
- `df.groupby().size() = O(n)` → `n` is the number of lines in the new txt file.
- `.to_dict = O(k)` → where `k` (<= n) is the number of unique errors.
- `dictionary creation = O(k*m)`:
  - `.strip .split = O(m)` → where `m` is the number of chars in the string.
  - `value for loop = O(k)` → where `k` is the number of unique errors.
  - the code is splitting `m` chars `k` times → `k*m`

**Space** = O(n) + O(k) + O(k) + O(k) = O(n) = O(10,000)
- `pd.read_csv = O(n)` → where `n` is the number of lines in the new txt file.
- `df.groupby().size() = O(k)` → where `k` (<= n) is the number of unique errors.
- `.to_dict = O(k)`
- `dictionary creation = O(k)`

## 3. **`common_errors`**:

**Time** = O(n) + O(1) + O(n) + O(k log k) + O(n) = **O(n + k log k)**
- `divide_file = O(n)` → explained above.
- `path, counter = O(1)`
- `for loop = O(files_in_folder * lines_per_file) = O(fif * 10,000) = O(n)`:
  - `for loop = O(files_in_folder)`
  - `find_error_per_part = O(10,000)`
  - `counter = O(k)` → where `k` is the amount of unique errors.
  - `O(files_in_folder) * O(10,000 + k) = O(files_in_folder * 10,000)`
  - `O(files_in_folder * 10,000) == O(n)` → amount of lines in `log.txt` file.
- `most_common = O(k log k)` → where `k` is the amount of unique errors.
- `lst[:n] = O(n)` → where `n` <= `k` / `len(lst)`.

**Space** = O(10,000) + O(k) + O(n) = **O(k)** (the other space is temporary, and therefor not counted.)
- `divide_file = O(lines_per_file) = O(10,000)` → explained above.
- `for loop = O(k)` → where `k` is the amount of unique errors.
- `lst[:n] = O(n)` → where `n` <= `k` / `len(lst)`, additional space to store the result.
