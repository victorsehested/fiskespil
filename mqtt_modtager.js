function modtager(topic, modtagetBesked) {
    let modtagerBuffer = JSON.parse(modtagetBesked);
	
    let afsenderen = modtagerBuffer.from;
	if (afsenderen != afsenderID)
	{
	    let value = modtagerBuffer.val;
	    // do something with the received value
      
	}
	
   
}
