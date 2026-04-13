import socket

# ─── CONFIGURATION ───────────────────────────────────────
SERVER_HOST = '127.0.0.1'
SERVER_PORT = 9999
BUFFER = 1024
# ─────────────────────────────────────────────────────────

client_socket = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)


print("=" * 40)
print("       🖥️  UDP Client Ready!")
print("=" * 40)
number = input("🔢 Apna number enter karo: ").strip()


client_socket.sendto(number.encode('utf-8'), (SERVER_HOST, SERVER_PORT))
print(f"📤 '{number}' server ko bhej diya! Result ka wait kar raha hai...")


result, server_addr = client_socket.recvfrom(BUFFER)

# Step 5: Result display karo
print("\n" + "=" * 40)
print("       🎯 SERVER SE RESULT AAYA!")
print("=" * 40)
print(f"  {result.decode('utf-8')}")
print("=" * 40)

# Step 6: Socket band karo
client_socket.close()
