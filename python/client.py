# client.py - Phase 2
# ✅ Server ko number bhejo, phir result receive karo aur display karo

import socket

# ─── CONFIGURATION ───────────────────────────────────────
SERVER_HOST = '127.0.0.1'
SERVER_PORT = 9999
BUFFER = 1024
# ─────────────────────────────────────────────────────────

# Step 1: UDP Socket banao
client_socket = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)

# Step 2: User se number lo
print("=" * 40)
print("       🖥️  UDP Client Ready!")
print("=" * 40)
number = input("🔢 Apna number enter karo: ").strip()

# Step 3: Server ko number bhejo
client_socket.sendto(number.encode('utf-8'), (SERVER_HOST, SERVER_PORT))
print(f"📤 '{number}' server ko bhej diya! Result ka wait kar raha hai...")

# Step 4: Server se result receive karo
# ⚠️ yahan client RUKTA hai (block) jab tak server result na bheje
result, server_addr = client_socket.recvfrom(BUFFER)

# Step 5: Result display karo
print("\n" + "=" * 40)
print("       🎯 SERVER SE RESULT AAYA!")
print("=" * 40)
print(f"  {result.decode('utf-8')}")
print("=" * 40)

# Step 6: Socket band karo
client_socket.close()