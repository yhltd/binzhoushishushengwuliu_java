$(function () {
    $("#submit-btn").click(function () {
        if (checkForm('#login-form')) {
            let params = formToJson('#login-form');
            $ajax({
                type: 'post',
                url: 'user/login',
                data: {
                    username: params.name,
                    password: params.password
                }
            }, false, '', function (res) {
                if (res.code > 0) {
                    alert(res.msg);
                    $.session.set('power', res.data.power);
                    $.session.set('user_id', res.data.id);
                    if (res.data.power == "司机") {
                        window.location.href = "html/main-driver.html";
                    } else {
                        window.location.href = "html/main.html";
                    }
                } else {
                    alert(res.msg);
                }
            })
        }
    });

    $('#name').on('focus',function(){
        window.scroll(0,0);
    });

    $('#password').on('focus',function(){
        window.scroll(0,0);
    });
});