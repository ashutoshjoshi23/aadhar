"""
03_merge_demographic.py - Merge demographic update CSV files
"""
import pandas as pd
import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from utils.config import *
from utils.helper_functions import *

def main():
    print("=" * 80)
    print("DEMOGRAPHIC DATA MERGING")
    print("=" * 80)
    print(f"\nLoading {len(DEMOGRAPHIC_FILES)} demographic files...")
    merged_df = merge_csv_files(DEMOGRAPHIC_FILES, RAW_DATA_DIR)
    if merged_df is None:
        return
    check_missing_values(merged_df, "Demographic Data")
    dup_stats = check_duplicates(merged_df, "Demographic Data")
    total_updates = merged_df['num_demographic_updates'].sum()
    print(f"\n✓ Total Demographic Updates: {format_number(total_updates)}")
    save_dataframe(merged_df, MERGED_DEMOGRAPHIC_FILE)
    print("\n✓ DEMOGRAPHIC DATA MERGE COMPLETED!")

if __name__ == "__main__":
    main()
