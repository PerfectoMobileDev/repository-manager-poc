#!/bin/bash

ACCOUNT=$1
BUILD_NUM=$2
LOCAL_TEMPLATE_LOCATION=$3

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

STACK_NAME=repository-manager-s3-bucket-$ACCOPUNT-$AWS_DEFAULT_REGION
TEMPLATE_NAME=repository-manager-s3-bucket-cfn-template.json

STACK_PARAMS="[\
{\"ParameterKey\":\"Environment\",\"ParameterValue\":\"$ACCOUNT\",\"UsePreviousValue\":false}\
]"

$SCRIPT_DIR/create-or-update-cloudformation-stack.sh $STACK_NAME $TEMPLATE_NAME $LOCAL_TEMPLATE_LOCATION $BUILD_NUM $STACK_PARAMS
exit $?
