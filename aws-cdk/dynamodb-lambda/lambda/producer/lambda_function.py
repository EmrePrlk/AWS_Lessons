from __future__ import print_function
import requests
import json
import uuid
import decimal
import os
import boto3



# Get the service resource.
dynamodb = boto3.resource('dynamodb')

# set environment variable
TABLE_NAME = os.environ['TABLE_NAME']


def lambda_handler(event, context):
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table('Earthquakes')

    
    url = 'https://deprem.afad.gov.tr/EventData/GetLast5Events'
    response = requests.get(url)
    data = json.loads(response.content.decode('utf-8'))
    
    for item in data:
        location = item['location']
        magnitude = item['magnitude']
        time = item['eventDate']

        

        
        item = {
            'Location': location,
            'Date': time,
            'Magnitude': magnitude
        }
        table.put_item(Item=item)

    return {
        'statusCode': 200,
        'body': json.dumps('Data added successfully!')
    }