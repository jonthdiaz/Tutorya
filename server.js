var express=require("express"),
		swig=require("swig");

var server=express();

swig.setDefaults({
	cache:false
});

// Configuracion para renderear vistas
server.engine('html', swig.renderFile);
server.set('view engine', 'html');
server.set('views', './app/views');

//Carga de archivos estaticos
server.use(express.static("./public"));

// Agregamos post
server.configure(function() {
	server.use(express.logger());
	server.use(express.cookieParser());
	server.use(express.bodyParser());
});




var homeController=require("./app/controllers/home.js");
var twitterController=require("./app/controllers/twitter.js");

homeController(server);
twitterController(server);



server.listen(3000,function  () {
	console.log("server corriendo en puerto 3000");
});