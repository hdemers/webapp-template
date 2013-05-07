#!/bin/bash

if [ -z $VIRTUALENV_DIR ]; then
    echo "ERROR: Please provide a virtualenv."
    exit
fi

# Activate the virtualenv
. $VIRTUALENV_DIR/bin/activate

if [ -e "$ENV_FILE" ]; then
    . $ENV_FILE
fi

exec $@
