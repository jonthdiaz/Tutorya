Tutorya.Views.Tweet=Backbone.View.extend({
	className:"item",
	events:{
		"click .content-icon .icon-undo":"createTweet"
	},
	initialize:function  () {
		var self=this;
		this.template=swig.compile($("#item-template").html());
		
		self.model.on({
			destroy:function  () {
				self.$el.remove();
			},
			change:function  () {
				self.render();
			}
		});
	},
	createTweet:function  (e) {
		$.ajax({
			type:"post",
			url:"/statuses/update",
			dataType:"json",
			success:function  (data) {
				console.log(data.message);
			},error:function  (jqxhr, textStatus, error) {
				var err = textStatus + ", " + error;
				alert( "Request Failed: " + err );
				console.log(this);		
			}
		});
	},
	render:function  () {
		var data=this.model.toJSON();
		var html=this.template(data);
		this.$el.html(html);
	}
});