let mSend;
function sender(mSend) {
  besked = {
    from:afsenderID, 
    val:mSend
  };
   client.publish(topic, JSON.stringify(besked));
}
