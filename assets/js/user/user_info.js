$(function() {
    var form = layui.form;
    form.verify({
        nickname: function(value) {
            if (value.length > 6) {
                return "昵称为1~6个字符之间";
            }
        },
    });
    var layer = layui.layer;
    getinfo();

    function getinfo() {
        $.ajax({
            method: "get",
            url: "/my/userinfo",
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                form.val("formUserInfo", res.data);
            },
        });
    }

    $("#btnreset").on("click", function(e) {
        e.preventDefault();
        getinfo();
    });

    $(".layui-form").on("submit", function(e) {
        e.preventDefault();
        $.ajax({
            method: "post",
            url: "/my/userinfo",
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg("更新用户信息失败");
                }
                layer.msg("更新用户信息成功");
                window.parent.getuserinfo()
            },
        });
    });
});