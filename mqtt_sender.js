function sender(a, b, c) {
  besked = {
    from:afsenderID, 
    val:a,b,c
    
  };
   client.publish(topic, JSON.stringify(besked));
}
