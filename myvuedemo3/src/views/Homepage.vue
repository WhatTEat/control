<template>
  <div class="jumbotron">
    <div class="container">
    <h1>Hello, world!</h1>
    <p>目前我们以经有{{peoplenumber}}万用户在使用我们</p>
      <p>我们已经为用户解决了{{number}}万次的选择</p>
    </div>
  </div>


</template>

<script>
export default {
  name: "Homepage",

  data(){
    return{

      peoplenumber:55,
      number:"200"
    }
  }
}
</script>

<style scoped>
.jumbotron{
  height: 800px;
  background-color: white;
}

</style>
