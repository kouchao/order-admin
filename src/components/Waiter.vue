<template>
  <div>
    <el-alert v-for="item in history"
      :title="item.user.name + ': ' + item.user.msg"
      type="success"
      center>
    </el-alert>
  </div>
</template>

<script>
    export default {
      name: "Waiter",
      data(){
        return {
          history: []
        }
      },
      created(){
        this.$socket.emit('login', {
          id: this.$socket.id,
          name: 'admin',
          msg: '登录后台'
        }); //在这里触发connect事件
      },
      sockets:{
        historyChange: function(val){
          this.history.push(val)
        }
      }
    }
</script>

<style scoped>
  .el-alert{
    margin-bottom: 10px;
  }
</style>
