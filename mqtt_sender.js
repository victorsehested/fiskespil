function sender(x) {
  besked = {
    from:afsenderID, 
    val:'hej'
  };
   client.publish(topic, JSON.stringify(besked));
}
