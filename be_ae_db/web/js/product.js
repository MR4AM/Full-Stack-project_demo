$(function(){
        $.get('http://localhost:8082/getproducts', function(res){
            console.log(res);
        var list=document.getElementById('list');
        var table=document.createElement('table');
        var flashbox=document.querySelector('#flashbox');
        var coverbox=document.querySelector('#coverbox');
        // var col=datalist.length;

    // 获取按钮
        var delBtns=document.getElementsByClassName('delbtn');
        var copyBtns=document.getElementsByClassName('copybtn');
        var closeBtns=document.querySelector('#close');
        var ctrls=document.querySelector('#ctrls');
    // 生成表格函数
        function createTable(datalist){
            var html=`<tr>
                    <td>序号</td>
                    <td>商品ID</td>
                    <td>商品名称</td>
                    <td>价格</td>
                    <td>颜色</td>
                    <td>操作</td>
                </tr>`
            var xtml=datalist.map(function(item,idx){
              return  `<tr>
                        <td>${idx+1}</td>
                        <td>${item.id}</td>
                        <td>${item.name}</td>
                        <td>${item.price}</td>
                        <td>${item.color}</td>
                        <td><button class="copybtn">编辑</button><button class="delbtn">删除</button></td>
                </tr>`
            }).join(''); 
            list.innerHTML='<table>'+html+xtml+'</table>';
        }
        // 生成弹窗函数
        function createflashbox(datalist){
            var html;
            datalist.forEach(function(item,idx){
                copyBtns[idx].onclick=function(){
                     html=  `
                     <h3>商品编辑</h3>
                     <span>商品ID</span><input value="${datalist[idx].id}"></br>
                     <span>商品名称</span><input  value="${datalist[idx].name}"></br>
                     <span>商品价格</span><input  value="${datalist[idx].price}"></br>
                     <span>商品颜色</span><input  value="${datalist[idx].color}"></br>
                     <button id="close">&times;</button><button id="ctrls">保存</button>`;
                    flashbox.innerHTML=html;
                }
            })
        }
         // 编辑窗口居中函数
       function toCenter(){
            flashbox.style.display='block';
           var left=(window.innerWidth-flashbox.offsetWidth)/2;
           var top=(window.innerHeight-flashbox.offsetHeight)/2;
           flashbox.style.left=left+'px';
           flashbox.style.top=top+'px';
       }
       // 编辑窗口拖拽函数
       function toDrag(){
            flashbox.onmousedown=function(e){
                e=e||window.event;
                // 获取光标位置
                var x=e.clientX-flashbox.offsetLeft;
                var y=e.clientY-flashbox.offsetTop;
                document.onmousemove=function(evt){
                    flashbox.style.left=evt.clientX-x+'px';
                    flashbox.style.top=evt.clientY-y+'px';
                }
            }
            document.onmouseup=function(){
                 document.onmousemove=null;
            }
       }
       // esc键关闭编辑窗口函数
       function keyClose(){
            document.onkeyup=function(e){
                e=e||window.event;
                if(e.keyCode===27){
                    flashbox.style.display='none';
                    coverbox.className='none';
                }
            }
       }
     // 商品信息保存函数
     function baochun(){
      var goodlist={};
      var input=document.querySelectorAll('input');
      input.forEach(function(item,idx){
        goodlist[idx]=item.value;
      })
        $.post('http://localhost:8082/saveproduct',{id: goodlist[0], name:goodlist[1],price:goodlist[2],color:goodlist[3]},function(res){

        } )
        $.get('http://localhost:8082/getproducts',function(res){

         createTable(res);
         console.log(666);
        })
     }
    // 删除产品信息函数
    
     // 页面加载后先执行一次两个生成结构的函数
         createTable(res);
         createflashbox(res);
    // 事件委托：利用冒泡把事件委托给父级去处理
        document.onclick=function(e){
            // 兼容event对象
            e=e||window.event;
            // 兼容事件源对象
            var target=e.target||e.srcElement;
            // 删除按钮
            if(target.className==='delbtn'){
                var currentTr=target.parentNode.parentNode;
                currentTr.parentNode.removeChild(currentTr);
                var delidx=currentTr.children[0].innerText-1;
                del_id=$(currentTr).find('td').eq(1).text();
                $.post('http://localhost:8082/delproduct',{id:del_id},function(res){
                    
                })
                res.splice(delidx,1);
                createTable(res);
            }
            // 编辑按钮
            if(target.className==='copybtn'){
                createflashbox(res);
                toCenter();
                toDrag();
                keyClose();
                coverbox.className='coverbox';
            }
            // 关闭弹窗按钮
            if(target.id==='close'){
               flashbox.style.display='none';
               coverbox.className='none';
            }
            // 保存按钮
            if(target.id==='ctrls'){
                baochun();
                // createTable(res);
                flashbox.style.display='none';
               coverbox.className='none';
            }
        }
        })
    })
