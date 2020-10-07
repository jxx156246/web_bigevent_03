$(function() {
    $('#link-reg').on('click', function() {
        $(".login").hide();
        $(".reg").show()
    });
    $('#link-login').on('click', function() {
        $(".login").show();
        $(".reg").hide()
    })
    var form = layui.form;
    form.verify({
        pass: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        repwd: function(value) {
            var pwd = $('.reg [name=password]').val();
            if (pwd !== value) {
                return '两次输入密码不一致'
            }
        }
    });
    $('#form-reg').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            method: 'post',
            url: '/api/reguser',
            data: {
                username: $('.reg [name=username]').val(),
                password: $('.reg [name=password]').val()
            },
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                };
                $("#link-login").click();
            }
        })
    });
    $('#form-login').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            method: 'post',
            url: '/api/login',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                };
                localStorage.setItem('token', res.token);
                location.href = '/index.html'
            }
        })
    })
})