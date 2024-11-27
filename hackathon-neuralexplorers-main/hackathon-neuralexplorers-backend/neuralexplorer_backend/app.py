import requests
import os
import git
import requests
from flask import Flask, request, jsonify, render_template
from azure.storage.blob import BlobServiceClient
# from flask_cors import CORS
# from requests.auth import HTTPBasicAuth

import time

app = Flask(__name__, static_folder='static')
# Define the API endpoint
url = "https://llm-new-cmagatfxgkb7drcn.southindia-01.azurewebsites.net/copilot"

fileData=""
# Define the input datas


#Funtion to generate and convert the code
@app.route('/generateCode', methods=['POST'])
def generateCode(code,language, target_version):
    
    target_version=3
    
    prompt=f"I want to convert my {language} code to {language} {target_version} version. Convert and return the provided code into {language} {target_version} version without any error. Only provide the code that can be supplied to complie directly in output and remove the introductions which will cause the {language} code to fail. Remove the markdown formatting added in the resultant output and correct the syntax in the output.:  \n"+code
   
    data = {
        "input": prompt
    }

    # Set the headers
    headers = {
        "Content-Type": "application/json"
    }

    # Send the POST request
    response = requests.post(url, json=data, headers=headers)

    file_path = f"{language}_test_output.py"

    output=response.json()

    # response = requests.post(url, json=output["output"], headers=headers)
    # output=response.json()

    # Open the file in write mode and write the string to it
    with open(file_path, "w") as file:
        file.write(output["output"])
    # Print the response
    print(response.json())
    return response.json()

#Funtion to generate the code based on the snippet provided
@app.route('/')
def index():
    return render_template('index.html')

@app.errorhandler(404)
def page_not_found(e):
    return render_template('index.html')


@app.route('/generateUnitTests', methods=['POST'])
def generateUnitTests(code,language):
    
    
    prompt="Generate unit test cases for the code provided taking. Only provide the code that can be supplied to complie directly in output and remove the introductions which will cause the code to fail. Remove the markdown formatting added in the resultant output and correct the syntax in the output.:  \n"+code
    
    data = {
        "input": prompt
    }

    # Set the headers
    headers = {
        "Content-Type": "application/json"
    }

    # Send the POST request
    response = requests.post(url, json=data, headers=headers)

    file_path = f"{language}_unit_test.py"

    output=response.json()

    # response = requests.post(url, json=output["output"], headers=headers)
    # output=response.json()

    # Open the file in write mode and write the string to it
    # with open(file_path, "w") as file:
    #     file.write(output["output"])
    # Print the response
    # print(response.json())
    return response.json()

@app.route('/generateLanguageVersion', methods=['POST'])
def getLanguageVersion(fileData):
    prompt="Get the name of coding language used and the version of the coding language provided.Provide 2 words, the language used and the version of the language:  \n"+fileData
    
    data = {
        "input": prompt
    }

    # Set the headers
    headers = {
        "Content-Type": "application/json"
    }

    # Send the POST request
    response = requests.post(url, json=data, headers=headers)

    # file_path = "python_unit_test.py"

    output=response.json()

    # response = requests.post(url, json=output["output"], headers=headers)
    # output=response.json()

    # Open the file in write mode and write the string to it
    # with open(file_path, "w") as file:
    #     file.write(output["output"])
    # Print the response
    print(output)

def downloadData(local_file_path):
    url = "http://127.0.0.1:5000/download"
    try:
        # Send a GET request to the download endpoint
        response = requests.get(url)
        
        # Check if the request was successful
        if response.status_code == 200:
            # Open the local file in write-binary mode
            with open(local_file_path, 'wb') as file:
                # Write the response content to the local file
                file.write(response.content)
            print(f"Data downloaded successfully and saved to {local_file_path}")
        else:
            print(f"Failed to download data. Status code: {response.status_code}")
    except Exception as e:
        print(f"An error occurred: {str(e)}")

def download_blobs_from_azure():
    global fileData
    AZURE_STORAGE_CONNECTION_STRING = "DefaultEndpointsProtocol=https;AccountName=codefilestorage;AccountKey=VPsBooukNTRfBk0gfzIrlEOpErhKNe3hZlf5EGpXrbst43SSyiKtcf+10oXYeBMjO4D9Kh2YDLK4+AStfNKztg==;EndpointSuffix=core.windows.net"
    CONTAINER_NAME = "llmcode"
    AZURE_DEVOPS_USERNAME = "GH01415752@devcorptenant.com"
    AZURE_DEVOPS_PASSWORD = "NE@hack1234"  
    # local_dir= "C:/Users/PMaladhari/Desktop/test"
    connection_string=AZURE_STORAGE_CONNECTION_STRING
    container_name=CONTAINER_NAME
    # Define the connection string, container name, and blob name
    # connection_string = 'your_connection_string'
    # container_name = 'mycontainer'
    blob_name = 'path/to/your/file.txt'
    
    # Initialize the BlobServiceClient
    blob_service_client = BlobServiceClient.from_connection_string(connection_string)
    
    # Get the container client
    container_client = blob_service_client.get_container_client(container_name)
    
    # Get the blob client
    blob_client = container_client.get_blob_client("output.py")
    
    # Download the blob content and store it in a variable
    blob_content = blob_client.download_blob().readall()
    
    # Decode the content if it's text data
    blob_text = blob_content.decode('utf-8')
    fileData=   blob_text
    # Print the content of the blob
    # print(blob_text)

def push_data_to_git():
    # Define the local repository path and the target repository URL
    local_repo_path = 'C:/Users/PMaladhari/Desktop/testcode/code1/neuralexplorer_backend'
    target_repo_url = 'https://GH01489350@dev.azure.com/GH01489350/neuralexplorer_backend/_git/neuralexplorer_backend'
    branch_name = 'updated_main'
    
    # Initialize the local repository
    repo = git.Repo(local_repo_path)

    if branch_name in repo.branches:
        repo.git.checkout(branch_name)
    else:
        repo.git.checkout('-b',branch_name)
    # Add all changes to the staging area
    repo.git.add(A=True)
    
    # Commit the changes
    repo.index.commit('Pushing first test code.')
    
    # Push the changes to the specific branch in the target repository
    repo.remotes.origin.push(refspec=f'HEAD:refs/heads/{branch_name}')


def call_copy_api():
    time.sleep(5)
    response = requests.post('http://127.0.0.1:5000/copy')
    print(response.json())
 
@app.route('/clone', methods=['POST'])
def clone_repo():
    local_dir = 'C:/Users/PMaladhari/Desktop/test'
    data = request.json
    print(data.get('repo_url'))
    repo_url = data.get('repo_url')
    # local_dir = local_dir
   
    if not repo_url or not local_dir:
        return jsonify({"error": "Repository URL and local directory path are required"}), 400
 
    try:
        git.Repo.clone_from(repo_url, local_dir)
        call_copy_api()
        return jsonify({"message": "Repository cloned successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
 
@app.route('/copy', methods=['POST'])
def copy_files_to_azure():
    local_dir = 'C:/Users/SGoel/Desktop/test'
    connection_string = "DefaultEndpointsProtocol=https;AccountName=codefilestorage;AccountKey=VPsBooukNTRfBk0gfzIrlEOpErhKNe3hZlf5EGpXrbst43SSyiKtcf+10oXYeBMjO4D9Kh2YDLK4+AStfNKztg==;EndpointSuffix=core.windows.net"
    container_name = "ne-container"
 
    try:
        blob_service_client = BlobServiceClient.from_connection_string(connection_string)
        for root, dirs, files in os.walk(local_dir):
            for file in files:
                print(file)
                file_path = os.path.join(root, file)
                print(file_path)
                blob_path = os.path.relpath(file_path, local_dir)
                print(blob_path)
                blob_client = blob_service_client.get_blob_client(container=container_name, blob=blob_path)
                print(blob_client)
                with open(file_path, 'rb') as data1:
                    print("here")
                    blob_client.upload_blob(data1, overwrite=True)
 
        return jsonify({"message": "Files copied to Azure Blob Storage successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


que1="""
    from flask import Flask, render_template, jsonify
from flask_restx import Api, Resource
import datetime

app = Flask(__name__)

@app.route('/')
def index():
    # return render_template('index.html')
    print("hello")
    return {'hello': 'world'}

@app.route('/hello')
def get():
    return {'hello': 'world'}

@app.route('/time')
def get_time():
    now = datetime.datetime.now()
    return {'time': now.strftime("%Y-%m-%d %H:%M:%S")}

@app.route('/greet/<name>')
def greet(name):
    return {'greeting': f'Hello, {name}!'}

@app.route('/items')
def get_items():
    items = ['item1', 'item2', 'item3']
    return jsonify(items)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
    """

que="""
    from flask import Flask, render_template
    from flask_restplus import Api, Resource
    
    app = Flask(__name__)
    
    
    @app.route('/')
    def index():
        # return render_template('index.html')
        print "hello"
        return {'hello': 'world'}
    
    @app.route('/hello')
    def get(self):
        return {'hello': 'world'}
    if __name__ == '__main__':
        app.run(debug=True, host='0.0.0.0')
    """

q2="""
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
 
    <groupId>com.example</groupId>
    <artifactId>my-java-app</artifactId>
    <version>1.0-SNAPSHOT</version>
 
    <dependencies>
        <dependency>
            <groupId>org.eclipse.jetty</groupId>
            <artifactId>jetty-server</artifactId>
            <version>9.4.43.v20210629</version>
        </dependency>
        <dependency>
            <groupId>org.eclipse.jetty</groupId>
            <artifactId>jetty-servlet</artifactId>
            <version>9.4.43.v20210629</version>
        </dependency>
    </dependencies>
 
    <build>
        <plugins>
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-compiler-plugin</artifactId>
                <version>3.8.1</version>
                <configuration>
                    <source>17</source>
                    <target>17</target>
                </configuration>
            </plugin>
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-clean-plugin</artifactId>
                <version>3.1.0</version>
                <executions>
                    <execution>
                        <id>auto-clean</id>
                        <phase>initialize</phase>
                        <goals>
                            <goal>clean</goal>
                        </goals>
                    </execution>
                </executions>
            </plugin>
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-shade-plugin</artifactId>
                <version>3.2.4</version>
                <executions>
                    <execution>
                        <phase>package</phase>
                        <goals>
                            <goal>shade</goal>
                        </goals>
                        <configuration>
                            <createDependencyReducedPom>false</createDependencyReducedPom>
                            <transformers>
                                <transformer implementation="org.apache.maven.plugins.shade.resource.ManifestResourceTransformer">
                                    <mainClass>com.example.MyJavaApp</mainClass>
                                </transformer>
                            </transformers>
                        </configuration>
                    </execution>
                </executions>
            </plugin>
        </plugins>
    </build>
</project>"""

q3="""
package com.example;
 
import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.servlet.DefaultServlet;
import org.eclipse.jetty.servlet.ServletContextHandler;
import org.eclipse.jetty.servlet.ServletHolder;
 
public class MyJavaApp {
    public static void main(String[] args) throws Exception {
        // Create a basic Jetty server object that will listen on port 8080.
        Server server = new Server(80);
 
        // Create a ServletContextHandler to hold the default servlet.
        ServletContextHandler context = new ServletContextHandler(ServletContextHandler.SESSIONS);
        context.setContextPath("/");
        server.setHandler(context);
 
        // Add the default servlet to serve static content.
        ServletHolder holderDefault = new ServletHolder("default", new DefaultServlet());
        holderDefault.setInitParameter("resourceBase", MyJavaApp.class.getResource("/webapp").toExternalForm());
        holderDefault.setInitParameter("dirAllowed", "true");
        context.addServlet(holderDefault, "/");
 
        // Start the server.
        server.start();
        server.join();
    }
}

"""


java_sample=q2 
# +"\n--------------------------------------\n" + q3


# generateUnitTests(que1,python)

download_path = "C:/Users/PMaladhari/Desktop/test_download/data.zip"
download_blobs_from_azure()
# getLanguageVersion(fileData)
# generateCode(fileData,"python","3")
# push_data_to_git()

if __name__ == '__main__':
    app.run(debug=True,port="8000", host='0.0.0.0')
'''
URI="https://genai-openai-neuralexplorers.openai.azure.com/openai/deployments/gpt-4o/chat/completions?api-version=2024-08-01-preview"
# Replace with your OpenAI API key
OPENAI_API_KEY = "a997af76fe034b5e847ca9e9e2186582"
'''