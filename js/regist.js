$('button').click(function(){
    if($('[name="username"]').val()===''){
        $('form>p:first').css({opacity:1})
        return false
    }else{$('form>p:first').css({opacity:0})}
    if($('[name="password"]').val()===''){
        $('form>p:last').css({opacity:1})
        return false
    }else{$('form>p:last').css({opacity:0})}
    $.ajax({
        url:'../sever/regist.php',
        data:`username=${$('[name="username"]').val()}&password=${$('[name="password"]').val()}`,
        type:'post',
        dataType:'json',
        success(res){
            let code=res.code-0
            if(code===0){
                $('#main>p').addClass('active')
            }else{
                $('#main>p').removeClass('active')
                // window.localStorage.setItem('login',JSON.stringify({
                //     code:1,
                //     username:res.username
                // }))
                window.location.href='./login.html'
            }
        }
    })
})