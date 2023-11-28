num_requests=39

endpoint_url="http://localhost:3000/aimulti/X6nuCtgu"



send_request() {
    curl --location "${endpoint_url}" \ 
    --data ''
}

for((i=1; i<=$num_requests; i++)); do
    send_request &
done

wait

