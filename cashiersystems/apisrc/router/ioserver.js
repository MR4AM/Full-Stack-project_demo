module.exports={
    startio(io){
        io.on('connection',(client)=>{
            console.log('连接服务端成功');
            // 接收来自客户端的信息
            client.on('paymes',(_mess)=>{
                 // 将信息推送到各客户端
                io.emit('paymes',_mess);
            })
        })
    }
}