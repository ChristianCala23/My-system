from flask import Flask, request, jsonify
from flask_cors import CORS  # Add this import

app = Flask(__name__)
CORS(app, resources={r"/sort": {"origins": "http://localhost:5173"}})  # This will enable CORS for all routes


@app.route('/sort', methods=['POST'])
def sort_data():
    data = request.json
    array = data.get('array', [])
    algorithm = data.get('algorithm', 'bubble')
    
    # Implement different sorting algorithms
    if algorithm == 'bubble':
        sorted_array = bubble_sort(array.copy())
    elif algorithm == 'quick':
        sorted_array = quick_sort(array.copy())
    elif algorithm == 'merge':
        sorted_array = merge_sort(array.copy())
    else:
        sorted_array = array
    
    return jsonify({
        'original': array,
        'sorted': sorted_array,
        'algorithm': algorithm
    })

def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        for j in range(0, n-i-1):
            if arr[j] > arr[j+1]:
                arr[j], arr[j+1] = arr[j+1], arr[j]
    return arr

def quick_sort(arr):
    if len(arr) <= 1:
        return arr
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    return quick_sort(left) + middle + quick_sort(right)

def merge_sort(arr):
    if len(arr) <= 1:
        return arr
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    return merge(left, right)

def merge(left, right):
    result = []
    i = j = 0
    while i < len(left) and j < len(right):
        if left[i] < right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1
    result.extend(left[i:])
    result.extend(right[j:])
    return result

if __name__ == '__main__':
    app.run(debug=True)