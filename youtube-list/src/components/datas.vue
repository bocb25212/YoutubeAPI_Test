<template>
    	<div class="row">
  			<div v-for="datas in paginatedData" :key="datas.array"  class="col-lg-3 col-md-3 col-sm-6" style="margin-bottom:10px; margin-top:10px;">
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
  			<div>
  				<button @click="firstPage">
  					頁首
  				</button>
  					<button v-for="(page,index)  in pageCount" :key="page"  @click="calcPage(index)" :class="{active: index === pageNumber }"> 
						{{index + 1}}	
					</button>
  				<button :disabled="pageNumber === 0" @click="prevPage">
  					上一頁 
  				</button>

  				<button :disabled="pageNumber >= pageCount -1" @click="nextPage">
  					下一頁
  				</button>
  	  			<button @click="lastPage">
  					頁尾
  				</button>
  			</div>	
  		</div>
</template>

<script>
    export default {
    	  name: 'datas-list',
    	  data(){
    	    return {
    	      pageNumber: 0
    	    }
    	  },
    	  props:{
    	    listData:{
    	      type:Array,
    	      required:true
    	    },
    	    size:{
    	      type:Number,
    	      required:false,
    	      default: 8
    	    }
    	  },
    	  methods:{
    	      nextPage(){
    	        this.pageNumber++;
    	      },
    	      prevPage(){
    	        this.pageNumber--;
    	      },
    	      firstPage(){
    	    	this.pageNumber = 0;
     	      },
     	      lastPage(){
        	    let l = this.listData.length,
    	        s = this.size;
     	    	this.pageNumber = Math.ceil(l/s) -1;
    	      },
      	      calcPage(index){
    	    	this.pageNumber = index;
        	  }
    	  },
    	  computed:{
    	    pageCount(){
    	      let l = this.listData.length,
    	          s = this.size;
    	      return Math.ceil(l/s);
    	    },
    	    paginatedData(){
    	      const start = this.pageNumber * this.size,
    	            end = start + this.size;
    	      return this.listData
    	            .slice(start, end);
    	    }
    	  }
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