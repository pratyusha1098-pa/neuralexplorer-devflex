import unittest
import os

def run_tests_and_store_results(test_file, result_file):
    # Run the tests and store the results in a file
    with open(result_file, 'a') as f:
        loader = unittest.TestLoader()
        suite = loader.discover(os.path.dirname(test_file), pattern=os.path.basename(test_file))
        runner = unittest.TextTestRunner(f, verbosity=2)
        result = runner.run(suite)
    return result

# Example usage
if __name__ == '__main__':
    test_file = 'ph2_unit_test.py'
    result_file = 'test_results.txt'
    run_tests_and_store_results(test_file, result_file)
    print(f"Test results have been written to {result_file}")