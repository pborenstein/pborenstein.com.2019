#! /usr/bin/env bash

curl -Ss "https://api.flickr.com/services/rest/?\
method=flickr.people.getPublicPhotos&\
api_key=${FLICKR_API_KEY}&\
user_id=${FLICKR_USER_ID}&format=json&\
nojsoncallback=1&\
per_page=6&\
extras=date_taken,owner_name,\
url_l,\
url_m,\
url_k,\
url_o" | jq  .photos.photo
