function sender(a,b,c,motionZ,string) {
  besked = {
    from:afsenderID, 
    val1:a,
    val2:b,
    val3:c,
    val4:motionZ
    string:string
  };
   client.publish(topic, JSON.stringify(besked));
}
