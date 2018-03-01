$(function(){
    common.http.get('getproducts',null,(res)=>{
        var table=document.createElement('table');
        var $flashbox=$('#flashbox');
        var $coverbox=$('#coverbox');
        // 生成表格函数
        function createTable(datalist){
            var html=`
                <tr>
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
                        <td>
                            <button class="rewbtn" data-id="${item['_id']}">修改</button>
                            <button class="delbtn" data-id="${item['_id']}">删除</button>
                        </td>
                </tr>`
            }).join('');
            $('#list').html('<table>'+html+xtml+'</table>');
        }
        // 生成弹窗函数
        function createflashbox(){
            var html;
             html=  `
             <h3>商品编辑</h3>
             <span>商品ID</span><input value=""></br>
             <span>商品名称</span><input  value=""></br>
             <span>商品价格</span><input  value=""></br>
             <span>商品颜色</span><input  value=""></br>
             <button id="close">&times;</button><button id="ctrls">保存</button>`;
            // flashbox.innerHTML=html;
            $flashbox.html(html);
        }
        // 商品信息保存函数
        function baochun(){
            var goodlist={};
            var input=document.querySelectorAll('input');
            input.forEach(function(item,idx){
            goodlist[idx]=item.value;
            })
            common.http.post('saveproduct',{id: goodlist[0], name:goodlist[1],price:goodlist[2],color:goodlist[3]},function(){

            })
            common.http.get('getproducts',null,function(data){
                createTable(data);
            })
        }
        // 页面加载后先执行一次两个生成结构的函数
         createTable(res);
        // 事件委托：利用冒泡把事件委托给父级去处理
            // 滚动、窗口大小改变
            $(window).on('scroll resize',function(){
                flashWindow($flashbox);
            })
            function flashWindow($flashbox){
                var left=($(window).width()- $flashbox.outerWidth())/2-$('.nav').width();
                var top=($(window).height()- $flashbox.outerHeight())/2+$(window).scrollTop();
                $flashbox.css({
                    left:left,
                    top: top,
               }).draggable().resizable();
            }
        $('body').on('click',function(e){
             // 删除按钮
            if(e.target.className=='delbtn'){
                var currentTr=$(e.target).closest('tr');
                $(currentTr).remove();
                del_id=$(currentTr).find('.delbtn').data('id');
                common.http.post('delproduct',{id:del_id},function(res){})
            }
            // 编辑按钮
            if(e.target.className=='copybtn'){
                createflashbox();
                flashWindow($flashbox);
                $flashbox.show();
                $coverbox.addClass('coverbox');
            }
            // 关闭弹窗按钮
            if(e.target.id=='close'){
               $flashbox.hide();
                $coverbox.removeClass('coverbox');
            }
             // 保存按钮
            if(e.target.id=='ctrls'){
               baochun();
               $flashbox.hide();
               $coverbox.removeClass('coverbox');
            }
        })
    })
})
 