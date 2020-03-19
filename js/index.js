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












