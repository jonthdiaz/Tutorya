Tutorya.Views.Search=Backbone.View.extend({
	events:{
		"click #btn-search":"search"	
	},
	initialize:function  ($el) {
		this.$el=$el;

	},
	render:function  () {
		
	},search:function  (e) {
		e.preventDefault();
		var inputSearch=this.$el.find("input").val();
		window.collections.Tweets.search(inputSearch);
	}
});