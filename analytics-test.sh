num_requests=8

endpoint_url="http://localhost:3000/dynamiccontact/gZXf2pRF"



send_request() {
    curl --location "${endpoint_url}" \ 
    --data ''
}

for((i=1; i<=$num_requests; i++)); do
    send_request &
done

wait

