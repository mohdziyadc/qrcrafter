num_requests=1

endpoint_url="http://localhost:3000/api/redirect/gS6gjbHX"



send_request() {
    curl --location "${endpoint_url}" \ 
    --data ''
}

for((i=1; i<=$num_requests; i++)); do
    send_request &
done

wait

