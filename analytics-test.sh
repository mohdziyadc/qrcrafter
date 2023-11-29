num_requests=33

endpoint_url="http://localhost:3000/api/redirect/CZFRrfzk"



send_request() {
    curl --location "${endpoint_url}" \ 
    --data ''
}

for((i=1; i<=$num_requests; i++)); do
    send_request &
done

wait

