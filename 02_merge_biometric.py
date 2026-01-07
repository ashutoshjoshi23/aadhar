"""
02_merge_biometric.py
Merge biometric update CSV files into single dataset

UIDAI Hackathon 2025
"""

import pandas as pd
import sys
import os

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from utils.config import *
from utils.helper_functions import *

def main():
    print("=" * 80)
    print("BIOMETRIC DATA MERGING")
    print("=" * 80)
    
    print(f"\nLoading {len(BIOMETRIC_FILES)} biometric files...")
    merged_df = merge_csv_files(BIOMETRIC_FILES, RAW_DATA_DIR)
    
    if merged_df is None:
        print("✗ Failed to merge files")
        return
    
    check_missing_values(merged_df, "Biometric Data")
    check_duplicates(merged_df, "Biometric Data")
    print_dataframe_info(merged_df, "Merged Biometric Data")
    
    total_updates = merged_df['num_biometric_updates'].sum()
    print(f"\n✓ Total Biometric Updates: {format_number(total_updates)}")
    
    save_dataframe(merged_df, MERGED_BIOMETRIC_FILE)
    
    print("\n--- Age Group Distribution ---")
    age_dist = merged_df.groupby('age_group')['num_biometric_updates'].sum()
    for age_group, count in age_dist.items():
        percentage = (count / total_updates) * 100
        print(f"  {age_group}: {format_number(count)} ({percentage:.1f}%)")
    
    print("\n" + "=" * 80)
    print("✓ BIOMETRIC DATA MERGE COMPLETED!")
    print("=" * 80)

if __name__ == "__main__":
    main()
