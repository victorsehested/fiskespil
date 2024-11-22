let x = 'please';
let y = "virk";

function sender(x,y) {
  besked = {
    from:afsenderID, 
    val:x,
    val2:y
  };
   client.publish(topic, JSON.stringify(besked));
}

