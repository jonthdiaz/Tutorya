var request=require("request");

var twitterController=function  (server) {
	server.post("/search/twitter",function  (req,res) {
		request({
			uri:req.body.urlTwitter,
			method:"get"},
			function  (error,response,body) {
			if(!error){
				res.send(body);		
				return;
			}
			res.send("Se ha generado el siguiente error " + error);
		});
	});

	server.post("/statuses/update",function  (req,res) {
		res.json({message:"ya estados en statuses update"});
	});
};
module.exports=twitterController;