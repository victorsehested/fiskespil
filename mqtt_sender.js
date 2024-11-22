function sender(alfa, beta, val, kastet) {
  let besked = {
    from: afsenderID,
    val1: alfa,
    val2: beta,
    val3: val,
    val4: kastet,
  };
  client.publish(topic, JSON.stringify(besked));
  console.log("Data sent:", besked);
}
