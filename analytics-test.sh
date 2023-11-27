num_requests=100

endpoint_url="http://localhost:3000/api/a/7%2FOt3WZ8"



send_request() {
    curl --location "${endpoint_url}" \ 
    --data ''
}

for((i=1; i<=$num_requests; i++)); do
    send_request &
done

wait

