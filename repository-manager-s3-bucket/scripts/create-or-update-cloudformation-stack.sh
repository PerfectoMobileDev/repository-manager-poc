#!/bin/bash

STACK_NAME=$1
TEMPLATE_NAME=$2
LOCAL_TEMPLATE_LOCATION=$3
BUILD_NUM=$4
STACK_PARAMS=$5

S3_BASE_URL=s3://perfecto-aws-devops-temp-for-builds/$STACK_NAME/$BUILD_NUM
S3_HTTP_BASE_URL=https://s3.amazonaws.com/perfecto-aws-devops-temp-for-builds/$STACK_NAME/$BUILD_NUM

SOURCE_TEMPLATE_DIR=$LOCAL_TEMPLATE_LOCATION
TEMP_TEMPLATE_DIR=$LOCAL_TEMPLATE_LOCATION/temp

if [ -d "$TEMP_TEMPLATE_DIR" ]; then
  rm -rf $TEMP_TEMPLATE_DIR
fi

mkdir $TEMP_TEMPLATE_DIR

cp $SOURCE_TEMPLATE_DIR/* $TEMP_TEMPLATE_DIR

GIT_REVISION=`git rev-parse HEAD`

# MAPPINGS=`cat $SOURCE_TEMPLATE_DIR/mappings.json | tr -d " \t\n\r"`

if [[ "$OSTYPE" == "darwin"* ]]; then
     for FILENAME in $TEMP_TEMPLATE_DIR/*; do
        sed -i "" 's@<S3_BASE_URL>@'$S3_HTTP_BASE_URL'@g' $FILENAME
        sed -i "" 's@<GIT_REVISION>@'$GIT_REVISION'@g' $FILENAME
        # sed -r -i 's@"Mappings" : \{\}@"Mappings" : '$MAPPINGS'@g' $FILENAME
    done   
else
    for FILENAME in $TEMP_TEMPLATE_DIR/*; do
        sed -r -i 's@<S3_BASE_URL>@'$S3_HTTP_BASE_URL'@g' $FILENAME
        sed -r -i 's@<GIT_REVISION>@'$GIT_REVISION'@g' $FILENAME
        # sed -r -i 's@"Mappings" : \{\}@"Mappings" : '$MAPPINGS'@g' $FILENAME
    done
fi

ORIGINAL_REGION=$AWS_DEFAULT_REGION
export AWS_DEFAULT_REGION="us-east-1"
aws s3 cp $TEMP_TEMPLATE_DIR $S3_BASE_URL --recursive
#--acl bucket-owner-full-control
RESULT=$?
if [ $RESULT -ne 0 ]; then
    echo "Failed to copy template from S3"
    exit 1
fi

export AWS_DEFAULT_REGION=$ORIGINAL_REGION

echo Template Name: "$TEMPLATE_NAME"
echo Stack Params: "$STACK_PARAMS"
echo Stack Name: "$STACK_NAME"

sudo npm install -g cfn-create-or-update
export AWS_DEFAULT_REGION=`aws configure get region`
cfn-create-or-update --stack-name $STACK_NAME --template-url $S3_HTTP_BASE_URL/$TEMPLATE_NAME  --parameters "$STACK_PARAMS" --capabilities CAPABILITY_IAM --wait
exit $?
