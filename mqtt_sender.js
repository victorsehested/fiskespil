function sender(vol) {
  besked = {
    from:afsenderID, 
    val:vol
  };
   client.publish(topic, JSON.stringify(besked));
}
