# MVP 

- should be able to send message to a room
- should be able to receive message to a room
- should be able to join to a room

# Logic

- A user has many message
- a room has message to many users 
- a message bellongs to one sender and many receivers

- On get message for room -> SELECT all message with receiver_id === group_id
- On get message for room -> SELECT all message with receiver_id === receiver_id AND sender_id = user_id

