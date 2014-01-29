var homeController=function  (server) {
	server.get("/",function  (req,res) {
		res.render(__dirname+"../../views/home");
	});
};
module.exports=homeController;