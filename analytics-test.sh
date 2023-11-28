num_requests=24

endpoint_url="http://localhost:3000/aitext/qwLt4nqe"



send_request() {
    curl --location "${endpoint_url}" \ 
    --data ''
}

for((i=1; i<=$num_requests; i++)); do
    send_request &
done

wait

