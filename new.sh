#!/bin/bash

DATE="$(date +%F)"
FILENAME="_posts/microblog/$DATE-$1"
touch $FILENAME
echo $2 >> $FILENAME