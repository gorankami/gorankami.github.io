#!/bin/bash

DATE="$(date +%F)"
FILENAME="_posts/microblog/$DATE-$1.md"

if [[ -f $FILENAME ]];then
    echo "$FILENAME exists"
else
    touch $FILENAME
    echo '---' >> $FILENAME
    echo "date: $DATE" >> $FILENAME
    echo -e 'tags:\ncategory: microblog\nexcerpt_separator: <!--more-->\n---\n' >> $FILENAME
    echo $2 >> $FILENAME
    echo -e '\n<!--more-->' >> $FILENAME
fi