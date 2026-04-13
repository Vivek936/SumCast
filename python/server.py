import socket
import urllib.request  # HTTP request bhejne ke liye
import urllib.error
import json            

# ─── CONFIGURATION ───────────────────────────────────────
HOST = '127.0.0.1'
PORT = 9999
BUFFER = 1024
TOTAL_CLIENTS = 3
NODE_API_URL = 'http://127.0.0.1:5000/save'  # Node.js backend ka URL
# ─────────────────────────────────────────────────────────

def send_to_backend(client_numbers, total_sum):
    """
    Node.js backend ko HTTP POST request bhejta hai
    Python mein yeh function urllib se banate hain
    """
    try:
        # JSON data banao
        payload = {
            "clientValues": client_numbers,   # [5, 3, 7]
            "sum": total_sum                   # 15
        }

        # Python dict → JSON string → bytes
        data = json.dumps(payload).encode('utf-8')

        # HTTP Request object banao
        req = urllib.request.Request(
            url=NODE_API_URL,
            data=data,
            headers={'Content-Type': 'application/json'},
            method='POST'
        )

        # Request bhejo aur response lo
        with urllib.request.urlopen(req, timeout=5) as response:
            response_body = response.read().decode('utf-8')
            print(f"\n✅ Backend ne respond kiya: {response_body}")
            return True

    except urllib.error.URLError as e:
        print(f"\n⚠️  Backend se connect nahi ho paya: {e}")
        print("   (Node.js server chal raha hai? Check karo!)")
        return False


# ─── MAIN UDP SERVER ──────────────────────────────────────

# Step 1: Socket banao
server_socket = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
server_socket.bind((HOST, PORT))

print("=" * 50)
print("   ✅ UDP Server Phase 3 — Start Ho Gaya!")
print("=" * 50)
print(f"📡 Address: {HOST}:{PORT}")
print(f"🌐 Backend: {NODE_API_URL}")
print(f"⏳ {TOTAL_CLIENTS} clients ka wait kar raha hai...\n")

# Step 2: Storage lists
client_addresses = []
client_numbers = []

# Step 3: Teeno clients se data lo
for i in range(TOTAL_CLIENTS):
    data, client_addr = server_socket.recvfrom(BUFFER)

    try:
        number = int(data.decode('utf-8').strip())
    except ValueError:
        print(f"⚠️  Invalid data — skip")
        continue

    client_addresses.append(client_addr)
    client_numbers.append(number)
    print(f"📩 Client {i+1} | Address: {client_addr} | Number: {number}")

# Step 4: Sum calculate karo
total_sum = sum(client_numbers)
print("\n" + "─" * 50)
print(f"📊 Numbers: {client_numbers}")
print(f"➕ Sum = {' + '.join(map(str, client_numbers))} = {total_sum}")

# Step 5: Result UDP broadcast karo (Phase 2 wala)
result_message = f"🎯 Result: {' + '.join(map(str, client_numbers))} = {total_sum}"
result_bytes = result_message.encode('utf-8')

print("\n📢 UDP Broadcast kar raha hai...")
for idx, addr in enumerate(client_addresses):
    server_socket.sendto(result_bytes, addr)
    print(f"  ✅ Client {idx+1} ko bheja → {addr}")

# Step 6: Node.js backend ko HTTP POST bhejo
print("\n🌐 Node.js backend ko data bhej raha hai...")
send_to_backend(client_numbers, total_sum)

print("\n🎉 Sab kuch complete! Server band ho raha hai.")
server_socket.close()
