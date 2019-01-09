#!/bin/bash

ACCOUNT=$1
BUILD_NUM=$2

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

REGION=`aws configure get region`

STACK_NAME=repository-manager-s3-bucket-$ACCOUNT-$REGION
TEMPLATE_NAME=repository-manager-s3-bucket-cfn-template.json

STACK_PARAMS="[\
{\"ParameterKey\":\"Environment\",\"ParameterValue\":\"$ACCOUNT\",\"UsePreviousValue\":false}\
]"

$SCRIPT_DIR/create-or-update-cloudformation-stack.sh $STACK_NAME $TEMPLATE_NAME $SCRIPT_DIR/../templates $BUILD_NUM $STACK_PARAMS
exit $?
