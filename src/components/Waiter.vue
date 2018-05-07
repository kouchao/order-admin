<template>
  <div>
    <el-alert
      title="消息提示的文案"
      type="info">
    </el-alert>
  </div>
</template>

<script>
    export default {
        name: "Waiter",
        created(){
          this.$socket.emit('login', {
            id: this.$socket.id,
            name: 'admin',
            msg: '登录后台'
          }); //在这里触发connect事件
        },
      sockets:{
        userlogin: function(val){
          console.log(val.user.name + val.user.msg)
        }
      }
    }
</script>

<style scoped>

</style>
