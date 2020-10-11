$(function() {
    //校验
    var layer = layui.layer;
    var form = layui.form;
    form.verify({
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        newpwd: function(value) {
            if (value == $('[name=oldPwd]').val()) {
                return '新旧密码不能相同'
            }
        },
        repwd: function(value) {
            if (value !== $('[name=newPwd]').val()) {
                return '两次输入密码不一致'
            }
        }
    });

    // 
    $('.layui-form').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            method: 'post',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                };
                layer.msg("密码修改成功");
                $('.layui-form')[0].reset()
            }
        })
    })
})