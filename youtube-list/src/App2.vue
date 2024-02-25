<template>
  <div id="app">
  	<header>
	<div id="topheader">
		<nav class="navbar navbar-default">
			<div class="container-fluid">
				<div class="navbar-header">
					<a class="navbar-brand">
					<span @click="list('UUhAnqc_AY5_I3Px5dig3X1Q')">korone</span> 
					</a>
				</div>
				<div class="navbar-header">
					<a class="navbar-brand">
					<span @click="list('UU-hM6YJuNYVAmUWxeIr9FeA')">miko</span>
					</a>
				</div>
				<div class="navbar-header">
					<a class="navbar-brand">
					<span @click="list('UUoSrY_IQQVpmIRZ9Xf-y93g')">Gawr gura</span>
					</a>
				</div>
			</div>
		</nav>
	</div>
	</header>
  	<input type="text" placeholder="搜尋.." v-model.trim="keyWord">
  	<button @click="listBySearch(keyWord)">搜尋<i class="fa fa-search"></i></button>
	
<template v-if="!this.$router.resolve(this.$route.path).route.meta.NoNavbar">
    <datasList :list-data="datas" />
</template>
	
	
    
  </div>
  
</template>

<script>
import axios from 'axios'
import datasList from './components/datas.vue'
import mikos from './jsonData/miko.json'

export default {
  		name: 'App',
  		  components: {
   			 datasList
  		},
  		meta: {
        NoNavbar: true
    	},
        data(){
        	return {
        	  datas: [],
        	  keyWord : "",
        	  nextToken : "",
        	  mikos : mikos
            }
        },
        mounted:function(){
        	this.mikos = mikos;	
        },
        methods: {     	
        	list:function( ChannelId ){
                var urlYoutube = "https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails,status&playlistId="+ ChannelId +"&key=AIzaSyC987vVRuHT6m2T_tgbreWthZIrwc3pCF8&maxResults=50";
				
				axios.get(urlYoutube, {
    				params: {
    				}
  				}).then((response) => {
                    const size = response.data.items.length;
                	const array = []
					var i;
                	for(i=0;i<size;i++){
                		array.push(response.data.items[i].snippet);
                	}
                	this.datas = array;
                	console.log(array); 
  				})
  				   .catch((error) => {
    				console.log(error);
  				});
        	},
        	listBySearch:function( keyWord ){
                var urlYoutube = "https://www.googleapis.com/youtube/v3/search?q=" +keyWord+ "&part=snippet&key=AIzaSyC987vVRuHT6m2T_tgbreWthZIrwc3pCF8&maxResults=50&pageToken="+ this.nextToken;

				axios.get(urlYoutube, {
    				params: {
    				}
  				}).then((response) => {
                    const size = response.data.items.length;
                	const array = []
					var i;
                	for(i=0;i<size;i++){
                		array.push(response.data.items[i].snippet);
                		var videoId = new Object();
                		response.data.items[i].snippet.resourceId = videoId;
                		response.data.items[i].snippet.resourceId.videoId = response.data.items[i].id.videoId;
                	}
                	this.datas = array;
                	this.nextToken = response.data.nextPageToken;
                	console.log(array);
                	 
  				})
  				   .catch((error) => {
    				console.log(error);
  				});
        	}
        }
}
</script>

<style scoped>
button{
  width:100px;
  background-color:#eef;
}

button:hover{
  background-color:#eea;
}
button:hover:disabled{
  cursor:not-allowed;
}
.active{
  background-color:#eea;
}
</style>
