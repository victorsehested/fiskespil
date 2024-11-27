function sender(x) {
  besked = {
    from:afsenderID, 
    val:x
  };
   client.publish(topic, JSON.stringify(besked));
}
