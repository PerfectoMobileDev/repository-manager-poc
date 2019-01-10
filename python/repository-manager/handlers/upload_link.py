import json
import os
import boto3
import requests

def get_handler(event, context):
    path = event['pathParameters']['path']
    s3_bucket_name = os.environ['BUCKET_NAME']
    return get_upload_link(path,s3_bucket_name)

def func():
    return 1

def get_upload_link(path, s3_bucket_name):

    # Get the service client
    s3 = boto3.client('s3')

    # Generate the POST attributes
    post = s3.generate_presigned_post(
        Bucket=s3_bucket_name,
        Key=path
    )

    # test upload link
    files = {"file": "file_content"}
    uploadResponse = requests.post(post["url"], data=post["fields"], files=files)

    body = {
        "message": post,
        "input": event,
        "uploadResponse": uploadResponse
    }

    response = {
        "statusCode": 200,
        "body": json.dumps(body)
    }

    return response