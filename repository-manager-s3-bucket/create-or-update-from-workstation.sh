#!/bin/bash

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

$SCRIPT_DIR/create-or-update-s3-bucket-cloudformation-stack.sh dev local $SCRIPT_DIR

