const dgram = require("dgram");

/**
 * Sends a Wake-on-LAN (WOL) magic packet to the given MAC address.
 * @param {string} macAddress - MAC address in format 'xx:xx:xx:xx:xx:xx'
 */
function sendWakeOnLan(macAddress) {
  macAddress = macAddress || "xx:xx:xx:xx:xx:xx"; // Replace with your TV's MAC address
  const mac = macAddress.replace(/[:-]/g, "").toLowerCase();

  if (!/^[0-9a-f]{12}$/.test(mac)) {
    throw new Error("Invalid MAC address format");
  }

  // Create the magic packet: 6 x 0xFF followed by 16 repetitions of the MAC address
  const macBuffer = Buffer.from(mac, "hex");
  const packet = Buffer.concat([
    Buffer.alloc(6, 0xff),
    ...Array(16).fill(macBuffer),
  ]);

  const client = dgram.createSocket("udp4");
  const BROADCAST_ADDR = "255.255.255.255";
  const PORT = 9;

  client.bind(() => {
    client.setBroadcast(true);
    client.send(packet, 0, packet.length, PORT, BROADCAST_ADDR, (err) => {
      if (err) {
        console.error("Failed to send WOL packet:", err);
      } else {
        console.log(`Wake-on-LAN packet sent to MAC address ${macAddress}`);
      }
      client.close();
    });
  });
}

module.exports = {
  sendWakeOnLan,
}
