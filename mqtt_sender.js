// Send function to publish data to MQTT
function sender(x) {
  let besked = {
    from: afsenderID, 
    val: x
  };
  client.publish(topic, JSON.stringify(besked)); // Send the data over MQTT
}