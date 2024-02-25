<template>
    	<div class="row">
  			<div v-for="datas in listData" :key="datas.array"  class="col-lg-3 col-md-3 col-sm-6" style="margin-bottom:10px; margin-top:10px;">
  				<div class="card h-100">
  					<a target='_blank' :href=" 'https://www.youtube.com/watch?v=' + datas.resourceId.videoId">
                          <img :src="datas.thumbnails.medium.url" class="card-img-top" alt="...">
                      </a>    
  					<div class="card-body">
  						<h5 class="card-title">{{datas.title}}</h5>
  						<p class="card-text"></p>
  					</div>
  					<div class="card-footer">
  						<small class="text-muted">{{datas.publishedAt}}</small>
  					</div>
  				</div>
  			</div>
  		</div>
</template>

<script>
    export default {
    	  name: 'datas-list',
    	  props:{
    	    listData:{
    	      type:Array,
    	      required:true
    	    }
    	  },
    };
</script>
<style scoped>

div#pagination {
	text-align: center;
	line-height: 100px;
}

div#pagination a {
	text-decoration: none;
}

.disableHref {
	cursor: default;
	color: #E5E0E0;
	text-decoration: none;
}

.card:hover {
	transform: scale(1.05);
	box-shadow: 0 10px 20px rgba(0, 0, 0, .12), 0 4px 8px rgba(0, 0, 0, .06);
}
button{
  width:100px;
  height:40px;
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