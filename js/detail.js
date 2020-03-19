// 头部点击跳转
$('[name="login"]').click(function(){
    window.location.href=`./login.html?url=${location.href}`
})
$('[name="regist"]').click(function(){
    window.location.href=`./regist.html?url=${location.href}`
})
$('[name="cart"]').click(function(){
    window.location.href=`./cart.html?url=${location.href}`
})
// 头部登录退出登录功能


//生成详情页面 
let arr=decodeURI(window.location.search).substring(1).split('=')
getAjax(arr[1])
function getAjax(key){
    $.ajax({
        url:'../sever/goods_select_list.php',
        data:{goods_id:key},
        type:'post',
        dataType:'json',
        success(res){
            let str=`
                <div class="media">
                    <div class="media-left media-middle">
                        <img class="media-object" src="${res.goods_small_logo}" alt="">
                    </div>
                    <div class="media-body">
                      <h4 class="media-heading">${res.goods_name}</h4>
                      <p>
                        <span class="glyphicon glyphicon-yen"></span>
                        ${res.goods_price}
                    </p>
                    <p>
                        <a href="javascript:;" class="btn btn-danger" role="button">立即购买</a><a href="javascript:;" class="btn btn-warning" role="button" name=joincart>加入购物车</a>
                    </p>
                    </div>
                </div>
                ${res.goods_introduce}
                `
            $('.container').html(str)
            setCart(res)
        }
    })
}
function setCart(res){
    $('.container').on('click','[name="joincart"]',function(){
        let login = JSON.parse(localStorage.getItem('login'))
        if(!login){
            window.location.href=`./login.html?url=${location.href}`
        }else{
            let cart=JSON.parse(localStorage.getItem('cart'))
            if(!cart){
                let cartArr=[]
                let cartObj={'msg':res,'num':1,'bool':true}
                cartArr.push(cartObj)
                localStorage.setItem('cart',JSON.stringify(cartArr))
            }else{
                let flag=true
                cart.forEach(item=>{
                    if(item.msg.goods_id===res.goods_id){
                        item.num++
                        flag=false
                    }
                })
                if(flag){
                    let cartObj={'msg':res,'num':1,'bool':true}
                    cart.push(cartObj)
                }
                localStorage.setItem('cart',JSON.stringify(cart))
            }
        }
    })
}


