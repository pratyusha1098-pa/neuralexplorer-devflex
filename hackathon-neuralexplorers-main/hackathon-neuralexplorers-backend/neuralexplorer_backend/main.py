from flask import Flask, request, jsonify
import requests
import os
import git
import requests
# from flask import Flask, request, jsonify
from azure.storage.blob import BlobServiceClient
from flask_cors import CORS
from requests.auth import HTTPBasicAuth
from urllib.parse import urlparse
import time


app = Flask(__name__)

# Replace with your Azure OpenAI Service endpoint and API key
#https://genai-openai-neuralexplorers.openai.azure.com/openai/deployments/gpt-4o/chat/completions?api-version=2024-08-01-preview
AZURE_OPENAI_ENDPOINT = "https://genai-openai-neuralexplorers.openai.azure.com/openai/deployments/gpt-4o/chat/completions?api-version=2024-08-01-preview"
API_KEY = "a997af76fe034b5e847ca9e9e2186582"




#4 >=https://genai-openai-neuralexplorers.openai.azure.com/openai/deployments/gpt-4o/chat/completions?api-version=2024-08-01-preview
#4 >= a997af76fe034b5e847ca9e9e2186582


#3.5turbo url >= https://genai-openai-neuralexplorers.openai.azure.com/openai/deployments/gpt-35-turbo/chat/completions?api-version=2024-08-01-preview
#e.5 > key >- a997af76fe034b5e847ca9e9e2186582

@app.route('/copilot', methods=['POST'])
def copilot():
    # Extract input from the request
    data = request.json
    user_input = data.get('input')

    # Prepare the payload for Azure OpenAI Service
    payload = {
        "messages": [
            {"role": "user", "content": user_input}
        ],
        # "max_tokens": 100
    }

    # Set the headers
    headers = {
        "Content-Type": "application/json",
        "api-key": API_KEY
    }

    # Send the request to Azure OpenAI Service
    response = requests.post(AZURE_OPENAI_ENDPOINT, json=payload, headers=headers)
    response_data = response.json()

    # Extract the output from the response
    copilot_output = response_data.get('choices', [{}])[0].get('text', '')

    copilot_output = response_data.get('choices', [{}])[0].get('message', {}).get('content', '')
    # Return the output as a JSON response
    return jsonify({'output': copilot_output})


@app.route('/download', methods=['POST'])
def download_files_from_azure_api():
    # Replace with your actual connection string
    AZURE_STORAGE_CONNECTION_STRING = "DefaultEndpointsProtocol=https;AccountName=codefilestorage;AccountKey=VPsBooukNTRfBk0gfzIrlEOpErhKNe3hZlf5EGpXrbst43SSKtcf+10oXYeBMjO4D9Kh2YDLK4+AStfNKztg==;EndpointSuffix=core.windows.net"
    CONTAINER_NAME = "ne-container"
    AZURE_DEVOPS_USERNAME = "GH01415752@devcorptenant.com"
    AZURE_DEVOPS_PASSWORD = "NE@hack1234"  
    local_dir= "C:/Users/PMaladhari/Desktop/test"
    connection_string=AZURE_STORAGE_CONNECTION_STRING
    container_name=CONTAINER_NAME
    # local_dir = request.json.get('local_dir')
    # connection_string = request.json.get('connection_string')
    # container_name = request.json.get('container_name')

    if not local_dir or not connection_string or not container_name:
        return jsonify({"error": "Missing required parameters"}), 400

    try:
        download_files_from_azure(local_dir, connection_string, container_name)
        return jsonify({"message": "Files downloaded from Azure Blob Storage successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
def download_files_from_azure(local_dir, connection_string, container_name):
    try:
        # Create the BlobServiceClient object
        blob_service_client = BlobServiceClient.from_connection_string(connection_string)
        
        # Get the container client
        container_client = blob_service_client.get_container_client(container_name)
        
        # List all blobs in the container
        blobs = container_client.list_blobs()
        
        # Ensure the local directory exists
        if not os.path.exists(local_dir):
            os.makedirs(local_dir)
        
        # Download each blob
        for blob in blobs:
            blob_client = container_client.get_blob_client(blob)
            download_file_path = os.path.join(local_dir, blob.name)
            
            # Ensure the directory for the blob exists
            os.makedirs(os.path.dirname(download_file_path), exist_ok=True)
            
            print(f"Downloading {blob.name} to {download_file_path}")
            
            with open(download_file_path, "wb") as download_file:
                download_file.write(blob_client.download_blob().readall())
        
        print("Download completed successfully.")
    except Exception as e:
        print(f"An error occurred: {str(e)}")

if __name__ == '__main__':
    app.run(debug=True)