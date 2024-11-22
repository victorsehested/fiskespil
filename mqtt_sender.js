function sender(a,b,c,motionZ) {
  besked = {
    from:afsenderID, 
    val1:a,
    val2:b,
    val3:c,
    val4:motionZ
  };
   client.publish(topic, JSON.stringify(besked));
}
