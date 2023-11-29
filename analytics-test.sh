num_requests=45

endpoint_url="http://localhost:3000/aimulti/yWfVZr2N"



send_request() {
    curl --location "${endpoint_url}" \ 
    --data ''
}

for((i=1; i<=$num_requests; i++)); do
    send_request &
done

wait

