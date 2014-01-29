Tutorya.Collections.Tweets=Backbone.Collection.extend({
	model:Tutorya.Models.Tweet,
	initialize:function  () {
		this.on({
			add:function  (model) {
					var view=new Tutorya.Views.Tweet({model:model});
							view.render();
							$(".items").append(view.$el);
			}
		});
	},
	empty:function  () {
		var self=this;
		for (var i = this.models.length - 1; i >= 0; i--) {
			self.models[i].destroy();
		}
	},
	search:function  (value) {
		var self=this;
		self.empty();

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
				var url = "https://api.twitter.com/1.1/search/tweets.json";
				var accessor = {
				  consumerSecret: "9QiwmRHgELmH5icCDQoMvQIXkpVdbE1gTqsfGLOoA",
				  tokenSecret: tokenSecret,
				};

			var message = {
		  action: url,
		  method: "GET",
		  parameters: {
					q:value,
		    	count:"12",
		  		callback:"?",
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

		$.ajax({
						type:"post",
						url:"/search/twitter",
						dataType: 'json',
						data:{urlTwitter:url},
						success:function  (data) {
							$.each(data.statuses,function  (i,item) {
								var model=new Tutorya.Models.Tweet({
										avatar:item.user.profile_image_url,
										tweet:item.text,
										name:item.user.name,
										user:item.user.screen_name
									});
								window.collections.Tweets.add(model);
							});
						},
						error:function  (jqxhr, textStatus, error) {
							var err = textStatus + ", " + error;
					    alert( "Request Failed: " + err );
					    console.log(this);		
						}
				});
	}
});
window.collections.Tweets=new Tutorya.Collections.Tweets();