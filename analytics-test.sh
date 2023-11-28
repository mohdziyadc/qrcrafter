num_requests=17

endpoint_url="http://localhost:3000/dynamicmultiqr/pUOq65Kl"



send_request() {
    curl --location "${endpoint_url}" \ 
    --data ''
}

for((i=1; i<=$num_requests; i++)); do
    send_request &
done

wait

