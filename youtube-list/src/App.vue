<template>
  <div id="App">
  	<header>
	</header>
  <div class="navbar navbar-default navbar-fixed-top">
      <div class="input-group col-md-2">
        <img src="https://cdn.drawception.com/drawings/NZfKPwKDXF.png" width="250" height="80" alt="圖片讀取失敗">
      </div>
    
      <div class="input-group col-md-6">
        <input style="width:85%;" class="form-control py-2" type="text" v-model.trim="keyWord" placeholder="搜尋.." v-on:keyup.enter="listBySearch(keyWord)">
          <button @click="listBySearch(keyWord)" class="btn btn-outline-secondary" type="button">
              <i class="fa fa-search"></i>
          </button>
      </div>

      <div class="input-group col-md-2">
          <img src="https://cdn.drawception.com/drawings/NZfKPwKDXF.png" width="250" height="80" alt="圖片讀取失敗">
      </div>
  </div>




<template>
  <div class="container-water-fall" style="margin-top:80px;">
    <waterfall :col='col' :width="itemWidth" :gutterWidth="gutterWidth"  :data="datas"  @loadmore="loadmore">
      <template >
        <div class="row">
          <div v-for="data in datas" :key="data.array"  class="col-lg-3 col-md-3 col-sm-6" style="margin-bottom:10px; margin-top:10px;">
            <div class="card h-100">
              <a target='_blank' :href=" 'https://www.youtube.com/watch?v=' + data.resourceId.videoId">
                          <img :src="data.thumbnails.medium.url" class="card-img-top" alt="...">
              </a>    
             <div class="card-body">
                <h5 class="card-title">{{data.title}}</h5>
                <p class="card-text"></p>
             </div>
              <div class="card-footer">
                <small class="text-muted">{{data.publishedAt}}</small>
              </div>
            </div>
          </div>
        </div>
      </template>
    </waterfall>
  </div>
</template>


  </div>
  
</template>

<script>
import axios from 'axios'
import mikos from './jsonData/miko.json'

export default {
  		name: 'App',
  		  components: {
          
  		  },
        data(){
        	return {
        	  datas: [ ],
        	  keyWord : "",
        	  nextToken : "",
        	  dataShow:true,
            col:5
            }
        },
        mounted:function(){
           this.datas =  mikos;
        },
        computed:{
          itemWidth(){  
              return (750*0.5*(document.documentElement.clientWidth/375));
          },
          gutterWidth(){
              return (9*0.5*(document.documentElement.clientWidth/375));
          }
        },
        methods: {     	
        	list:function( ChannelId ){
                var urlYoutube = "https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails,status&playlistId="+ ChannelId +"&key=AIzaSyC987vVRuHT6m2T_tgbreWthZIrwc3pCF8&maxResults=50";
                console.log("urlYoutube:"+urlYoutube);
				
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
                	this.dataShow = false;
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
  					console.log("response:"+response.data);
  				
                    const size = response.data.items.length;
                	const array = []
					var i;
                	for(i=0;i<size;i++){
                		array.push(response.data.items[i].snippet);
                		const videoId = new Object();
                		response.data.items[i].snippet.resourceId = videoId;
                		response.data.items[i].snippet.resourceId.videoId = response.data.items[i].id.videoId;
                	}
                	this.datas = array;
                	this.dataShow = false;
                	this.nextToken = response.data.nextPageToken;
                	console.log(array);
                	 
  				})
  				   .catch((error) => {
    				console.log(error);
  				});
        	 },
          loadmore(){
              this.datas = this.datas.concat(this.datas)
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
