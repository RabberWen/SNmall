let login=JSON.parse(window.localStorage.getItem('login'))
if(!login){
    $('#login').addClass('active').next().removeClass('active')
}
if(login){
    let code=login.code-0
    let username=login.username
    $('#loginout').addClass('active').prev().removeClass('active')
    .end().find('a').text(username)
    .next().click(function(){
        window.localStorage.removeItem('login')
        window.location.reload()
    })
}

let arr=decodeURI(window.location.search).substring(1).split('=')
getAjax(arr[1],1,30)
function getAjax(key,page,line){
    $.ajax({
        url:'../sever/goods_select.php',
        data:{cat_one_id:key,page:page,line:line},
        dataType:'json',
        success(res){
            let str=''
            res.forEach(function(item){
                str+=`
                <div class="row">
                    <div class="thumbnail col-xs-3">
                    <img src="${item.goods_big_logo}" alt="">
                    <div class="caption">
                    <h3>${item.goods_name}</h3>
                    <p>
                        <span class="glyphicon glyphicon-yen"></span>
                        ${item.goods_price}
                    </p>
                    <p>
                        <a href="javascript:;" class="btn btn-danger" role="button">查看类似商品</a><a href="./detail.html?goods_id=${item.goods_id}" class="btn btn-warning" role="button">查看商品详情</a>
                    </p>
                    </div>
                </div>
                `
            })
            $('.row').html(str)
            $('.pagi').pagination({
                pageCount:res[0].sumPage,
                totalData:res[0].row,
                current:res[0].page,
                mode: 'fixed',
                homePage: '首页',
                endPage: '末页',
                prevContent: '上页',
                nextContent: '下页',
                callback:function(result){
                    getAjax(arr[1],result.getCurrent(),20)
                }
            });
        }
    })
}













