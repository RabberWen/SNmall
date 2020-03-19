// 登录
let login=JSON.parse(window.localStorage.getItem('login'))
if(!login){
    $('#login').addClass('active').next().removeClass('active')
    window.location.href='./login.html'
}
if(login){
    let code=login.code-0
    let username=login.username
    $('#loginout').addClass('active').prev().removeClass('active')
    .end().find('a:first').text(username)
    .next().click(function(){
        window.localStorage.removeItem('login')
        window.location.reload()
    })
}
// 购物车主体
let cart=JSON.parse(localStorage.getItem('cart'))
function setPage(cart){
    let cartType=0
    let cartNum=0
    let cartPrice=0
    if(!cart||cart.length===0){
        $('.container').html('<div class="kong">您还没有添加商品至购物车</div>')
        return
    }
    let str=`
        <!-- 按钮 -->
        <div class="select">
            <button name="all">全选</button>
            <button name="back">反选</button>
            <button name="not">不选</button>
        </div>
        <!-- 购物车主体始 -->
        <div class="panel-footer">
            <ul class="cart-list">
        `
    cart.forEach((item,key)=>{
        str+=`
        <li class="cart-item">
            <div class="left">
              <input index=${key} type="checkbox" ${item.bool===true?'checked':''}>
            </div>
            <div class="right">
              <div class="media">
                <div class="media-left">
                    <img class="media-object" src="${item.msg.goods_small_logo}">
                </div>
                <div class="media-body">
                  <h4 class="media-heading">${item.msg.goods_name}</h4>
                  <p>
                    <i class="glyphicon glyphicon-yen"></i>
                    <span>${item.msg.goods_price}</span>
                  </p>
                    <div class="btn-group pull-right" role="group" aria-label="">
                        <button name="cut" index=${key} ${item.num<=1?'disabled':''} type="button" class="btn btn-default">-</button>
                        <button name="num" ${item.num>=item.msg.goods_number?'disabled':''} type="button" class="btn btn-default" disabled>${item.num}</button>
                        <button name="add" index=${key} type="button" class="btn btn-default">+</button>
                    </div>
                    <button index=${key} name="del" class="btn btn-danger">我不要了</button>
                </div>
                </div>
            </div>
        </li>
        `
        if(item.bool){
            cartType++
            cartNum+=item.num
            cartPrice+=item.num*item.msg.goods_price
        }
    })
    str+=`
        </ul>
        </div>
        <!-- 价格说明 -->
        <div class="footer">
            <p name="cartType">您选择了${cartType}种商品</p>
            <p name="cartNum">您选择了${cartNum}件商品</p>
            <p name="cartPrice">您选择的商品总价为${cartPrice.toFixed(2)}元</p>
        </div>
    `
    $('.container').html(str)
}
setPage(cart)
$('.container').click(e=>{
    let target=e.target
    if($(target).attr('name')==='all'){
        cart.forEach(item=>{
            item.bool=true
        })
        setPage(cart)
    }
    if($(target).attr('name')==='not'){
        cart.forEach(item=>{
            item.bool=false
        })
        setPage(cart)
    }
    if($(target).attr('name')==='back'){
        $('[type="checkbox"]').each((key,item)=>{
            cart[key].bool=!$(item).prop('checked')
        })
        setPage(cart)
    }
    if($(target).attr('name')==='del'){
        let key=$(target).attr('index')
        cart.splice(key,1)
        setPage(cart)
    }
    if($(target).attr('type')==='checkbox'){
        let key=$(target).attr('index')
        cart[key].bool=$(target).prop('checked')
        setPage(cart)
    }
    if($(target).attr('name')==='cut'){
        let key=$(target).attr('index')
        cart[key].num--
        setPage(cart)
    }
    if($(target).attr('name')==='add'){
        let key=$(target).attr('index')
        cart[key].num++
        setPage(cart)
    }
    localStorage.setItem('cart',JSON.stringify(cart))
})














