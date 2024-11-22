function sender(a, b, c) {
  besked = {
    from:afsenderID, 
    val:a
    
  };
   client.publish(topic, JSON.stringify(besked));
}
