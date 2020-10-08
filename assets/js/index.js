$(function() {
    getuserinfo();
    $('#btnout').on('click', function(e) {
        e.preventDefault();
        layui.layer.confirm('是否确定退出登录?', {
            icon: 3,
            title: '提示'
        }, function(index) {
            //do something
            localStorage.removeItem('token');
            location.href = '/login.html'
            layer.close(index);
        });
    })
});

function getuserinfo() {
    $.ajax({
        method: 'get',
        url: '/my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function(res) {
            if (res.status !== 0) {
                return layui.layer.msg(res.message)
            };
            // console.log(res);
            renderuserinfo(res.data)
        },
        // complete: function(res) {
        //     console.log(res);
        //     if (res.responseJSON.status == 1 && res.responseJSON.message == "身份认证失败！") {
        //         localStorage.removeItem('token');
        //         location.href = '/login.html'
        //     }
        // }
    })
}

function renderuserinfo(user) {
    var name = user.nickname || user.username;
    $('#welcome').html('欢迎&nbsp;&nbsp' + name);
    if (user.user_pic !== null) {
        $('.layui-nav-img').show().prop('src', user.user_pic);
        $('.text-avatar').hide();
    } else {
        var first = name[0].toUpperCase();
        $('.layui-nav-img').hide();
        $('.text-avatar').show().html(first);
    }
}