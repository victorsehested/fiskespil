let string = 'Hej jeg virker';

function sender(string) {
  besked = {
    from:afsenderID, 
    string:string
  };
   client.publish(topic, JSON.stringify(besked));
}
