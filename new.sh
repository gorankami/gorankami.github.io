#!/bin/bash

DATE="$(date +%F)"
FILENAME="_new/$DATE-$1.md"

if [[ -f $FILENAME ]];then
    echo "$FILENAME exists"
else
    touch $FILENAME
    echo '---' >> $FILENAME
    echo "date: $DATE" >> $FILENAME
    echo -e 'tags:\ncategory: \nexcerpt_separator: <!--more-->\n---\n' >> $FILENAME
    echo $2 >> $FILENAME
    echo -e '\n<!--more-->' >> $FILENAME
fi
