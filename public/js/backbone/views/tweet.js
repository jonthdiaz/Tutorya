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
		var oauthData= {
				generateTimeSpan:function  () {
					return OAuth.timestamp();
				},
				Nonce:function  () {
					return OAuth.nonce(11);
				}
			};

  	var token="302420863-12j9KJkVH0oVcwGiKsyON8myndyhnRFYUMfMw7xw";
		var tokenSecret="iyFEWg4JihDg5nuP1Y2NSNvJn79tLbG3fqO9N661FFfkq";
				var url = "https://api.twitter.com/1.1/statuses/update.json";
				var accessor = {
				  consumerSecret: "9QiwmRHgELmH5icCDQoMvQIXkpVdbE1gTqsfGLOoA",
				  tokenSecret: tokenSecret,
				};

			var message = {
		  action: url,
		  method: "GET",
		  parameters: {
		  		status:"jonathan",
		  		in_reply_to_status_id:"@jonthdiaz",
          oauth_version:"1.0",
          oauth_consumer_key : "AZenN24fmfxInzETxV7qw",
          oauth_token:token,
          oauth_timestamp:oauthData.generateTimeSpan(),
          oauth_nonce:oauthData.Nonce(),
          oauth_signature_method:"HMAC-SHA1",
         }
			};

		OAuth.completeRequest(message, accessor);        
		OAuth.SignatureMethod.sign(message, accessor);
		url = url + "?" + OAuth.formEncode(message.parameters);
		console.log(url);

		$.ajax({
			type:"post",
			url:"/statuses/update",
			dataType:"json",
			data:{url:url},
			success:function  (data) {
				if(data.errors){
					console.log(data.errors[0].message);
				}else{
					console.log(data.message);	
				}
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