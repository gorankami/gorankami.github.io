#!/bin/bash

DATE="$(date +%F)"
FILENAME="_drafts/journal/$DATE-$(date +"%A-%H:%M").md"

if [[ -f $FILENAME ]];then
    echo "$FILENAME exists"
else
    touch $FILENAME
    echo '---' >> $FILENAME
    echo "date: $DATE" >> $FILENAME
    echo -e 'tags:\ncategory: journal\n---\n' >> $FILENAME
fi