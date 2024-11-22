function sender() {
  besked = {
    from:afsenderID, 
    val:{Alpha:a, Beta:b, Gamma:c, Motion:MotionZ}
    
  };
   client.publish(topic, JSON.stringify(besked));
}
