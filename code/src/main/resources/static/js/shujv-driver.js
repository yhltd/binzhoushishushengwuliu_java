function getZhujia() {
    $ajax({
        type: 'post',
        url: '/combination/getZhujia',
    }, false, '', function (res) {
        if (res.code == 200) {
            for (var i = 0; i < res.data.length; i++) {
                $("#add-zhujia").append("<option>" + res.data[i].zhujia + "</option>");
            }
        }
    })
}

function getFujia() {
    $ajax({
        type: 'post',
        url: '/combination/getFujia',
    }, false, '', function (res) {
        if (res.code == 200) {
            for (var i = 0; i < res.data.length; i++) {
                $("#add-fujia").append("<option>" + res.data[i].fujia + "</option>");
            }
        }
    })
}

$(function () {
    getZhujia();
    getFujia();


    $("#zhujia").hide();
    $("#fujia").hide();
    $("#yincang1").hide();
    $("#yincang2").hide();
    $("#yincang3").hide();
    $("#yincang4").hide();
    $("#yincang5").hide();
    $("#yincang6").hide();

    $('#add-weihuo').click(function () {
        $("#zhujia-label").text("危货驾驶员");
        $("#zhujia").show();
        $("#fujia").show();

        $("#chetou_label").text("“危货”车头号");
        $("#guache_label").text("“危货”挂车号");
        $("#yincang2").show();
    });

    $('#add-puhuo').click(function () {
        $("#zhujia-label").text("普货驾驶员");
        $("#zhujia").show();
        $("#fujia").hide();
        $("#fujia").hide();

        $("#chetou_label").text("“普货”车头号");
        $("#guache_label").text("“普货”挂车号");
        $("#yincang2").show();
    });

    $('#add-is').click(function () {
        $("#yincang3").show();
    });

    $('#add-not').click(function () {
        $("#yincang3").hide();

        var file6 = document.getElementById('file6');
        file6.value = '';
        var file7 = document.getElementById('file7');
        file7.value = '';
        var file8 = document.getElementById('file8');
        file8.value = '';
        var file9 = document.getElementById('file9');
        file9.value = '';
        var file10 = document.getElementById('file10');
        file10.value = '';

        $('#img6').removeAttr('src');
        $('#img7').removeAttr('src');
        $('#img8').removeAttr('src');
        $('#img9').removeAttr('src');
        $('#img10').removeAttr('src');
    });

    $('#add-zhongche').click(function () {
        $("#yincang1").show();
        $("#yincang7").show();
    });
    $('#add-kongche').click(function () {
        $("#yincang1").hide();
        $("#yincang7").hide();
        $('#add-shishoudunwei').val("");
        $('#add-tonnage').val("");
        var file1 = document.getElementById('file1');
        file1.value = '';
        $('#img1').removeAttr('src');
    });

    $('#add-isZafei').click(function () {
        $("#yincang4").show();
    });
    $('#add-notZafei').click(function () {
        $("#yincang4").hide();

        var file11 = document.getElementById('file11');
        file11.value = '';
        var file12 = document.getElementById('file12');
        file12.value = '';
        var file13 = document.getElementById('file13');
        file13.value = '';
        var file14 = document.getElementById('file14');
        file14.value = '';
        var file15 = document.getElementById('file15');
        file15.value = '';
        var file16 = document.getElementById('file16');
        file16.value = '';
        var file17 = document.getElementById('file17');
        file17.value = '';

        $('#img11').removeAttr('src');
        $('#img12').removeAttr('src');
        $('#img13').removeAttr('src');
        $('#img14').removeAttr('src');
        $('#img15').removeAttr('src');
        $('#img16').removeAttr('src');
        $('#img17').removeAttr('src');
        $('#img18').removeAttr('src');
        $('#img19').removeAttr('src');
        $('#img20').removeAttr('src');
        $('#img21').removeAttr('src');
    });

    $('#addRow').click(function () {
        $('#add-modal').modal('show');
    });

    $('#add-submit-btn-luxian').click(function () {
        var tr = "<tr><td><input type='checkbox' name='checkbox'></td><td>" +
            $('#add-qidian').val() + "</td><td>" +
            $('#add-zhongdian').val() + "</td><td>" +
            $('#add-luqiaofei').val() + "</td><td>" +
            $('#add-gonglishu').val() + "</td><td>" +
            $('#add-zongyouhao').val() + "</td><td>" +
            $('#add-pingjunyouhao').val() + "</td></tr>";
        $('#table').append(tr);
        $('#add-close-btn-luxian').click();
        $('#add-form-luxian')[0].reset();
    });

    $('#add-close-btn-luxian').click(function () {
        $('#add-modal').modal('hide');
    });

    $('#delRow').click(function () {
        var checked = $("input[type='checkbox'][name='checkbox']");
        $(checked).each(function (index, value) {
            if (checked[index].checked == true) {
                $(this).parent().parent().remove();
            }
        });
    });


    //提交
    $('#add-submit-btn').click(function () {
        if ($('input:radio[name="type"]:checked').val() == null) {
            alert("请选择车辆类型！");
            return;
        }
        if ($('input:radio[name="vehicle"]:checked').val() == null) {
            alert("请选择车辆信息！");
            return;
        }
        if ($('input:radio[name="jiayou"]:checked').val() == null) {
            alert("请选择是否产生杂费！");
            return;
        }
        if ($('input:radio[name="zafei"]:checked').val() == null) {
            alert("请选择是否产生杂费！");
            return;
        }

        var thRiqi = $('#add-riqi').val();
        var zhujia = $('#add-zhujia').val();
        var fujia = $('#add-fujia').val();
        var thNum = $('#add-tonnage').val();
        var xhNum = $('#add-shishoudunwei').val();
        var chetou = $('#add-chetou').val();
        var guache = $('#add-guache').val();
        var niaosu = $('#add-niaosu').val();

        var shoufeizhan = "";
        var bt_licheng = 0;
        var bc_jiayou = 0;
        $('#table').find("tr").each(function (index, value) {
            if (index > 0) {
                if (shoufeizhan == "") {
                    shoufeizhan = $(this).find("td").eq(1).html() + "--" + $(this).find("td").eq(2).html() + "(" + $(this).find("td").eq(3).html() + ")";
                } else {
                    shoufeizhan += "--" + $(this).find("td").eq(1).html() + "--" + $(this).find("td").eq(2).html() + "(" + $(this).find("td").eq(3).html() + ")";
                }
                bt_licheng += bt_licheng + parseFloat($(this).find("td").eq(4).html());
                bc_jiayou += bc_jiayou + parseFloat($(this).find("td").eq(5).html());
            }
        });

        var formData = new FormData();
        var file1 = document.getElementById("file1").files;
        if (file1.length > 0) {
            formData.append("file1", file1[0]);
        } else {
            formData.append("file1", null);
        }
        var file2 = document.getElementById("file2").files;
        if (file2.length > 0) {
            formData.append("file2", file2[0]);
        } else {
            formData.append("file2", null);
        }
        var file3 = document.getElementById("file3").files;
        if (file3.length > 0) {
            formData.append("file3", file3[0]);
        } else {
            formData.append("file3", null);
        }
        var file4 = document.getElementById("file4").files;
        if (file4.length > 0) {
            formData.append("file4", file4[0]);
        } else {
            formData.append("file4", null);
        }
        var file5 = document.getElementById("file5").files;
        if (file5.length > 0) {
            formData.append("file5", file5[0]);
        } else {
            formData.append("file5", null);
        }
        var file6 = document.getElementById("file6").files;
        if (file6.length > 0) {
            formData.append("file6", file6[0]);
        } else {
            formData.append("file6", null);
        }
        var file7 = document.getElementById("file7").files;
        if (file7.length > 0) {
            formData.append("file7", file7[0]);
        } else {
            formData.append("file7", null);
        }
        var file8 = document.getElementById("file8").files;
        if (file8.length > 0) {
            formData.append("file8", file8[0]);
        } else {
            formData.append("file8", null);
        }
        var file9 = document.getElementById("file9").files;
        if (file9.length > 0) {
            formData.append("file9", file9[0]);
        } else {
            formData.append("file9", null);
        }
        var file10 = document.getElementById("file10").files;
        if (file10.length > 0) {
            formData.append("file10", file10[0]);
        } else {
            formData.append("file10", null);
        }
        var file11 = document.getElementById("file11").files;
        if (file11.length > 0) {
            formData.append("file11", file11[0]);
        } else {
            formData.append("file11", null);
        }
        var file12 = document.getElementById("file12").files;
        if (file12.length > 0) {
            formData.append("file12", file12[0]);
        } else {
            formData.append("file12", null);
        }
        var file13 = document.getElementById("file13").files;
        if (file13.length > 0) {
            formData.append("file13", file13[0]);
        } else {
            formData.append("file13", null);
        }
        var file14 = document.getElementById("file14").files;
        if (file14.length > 0) {
            formData.append("file14", file14[0]);
        } else {
            formData.append("file14", null);
        }
        var file15 = document.getElementById("file15").files;
        if (file15.length > 0) {
            formData.append("file15", file15[0]);
        } else {
            formData.append("file15", null);
        }
        var file16 = document.getElementById("file16").files;
        if (file16.length > 0) {
            formData.append("file16", file16[0]);
        } else {
            formData.append("file16", null);
        }
        var file17 = document.getElementById("file17").files;
        if (file17.length > 0) {
            formData.append("file17", file17[0]);
        } else {
            formData.append("file17", null);
        }
        var file18 = document.getElementById("file18").files;
        if (file18.length > 0) {
            formData.append("file18", file18[0]);
        } else {
            formData.append("file18", null);
        }
        var file19 = document.getElementById("file19").files;
        if (file19.length > 0) {
            formData.append("file19", file19[0]);
        } else {
            formData.append("file19", null);
        }
        var file20 = document.getElementById("file20").files;
        if (file20.length > 0) {
            formData.append("file20", file20[0]);
        } else {
            formData.append("file20", null);
        }
        var file21 = document.getElementById("file21").files;
        if (file21.length > 0) {
            formData.append("file21", file21[0]);
        } else {
            formData.append("file21", null);
        }

        formData.append("thRiqi", thRiqi);
        formData.append("zhujia", zhujia);
        formData.append("fujia", fujia);
        formData.append("thNum", thNum);
        formData.append("xhNum", xhNum);
        formData.append("chetou", chetou);
        formData.append("guache", guache);
        formData.append("niaosu", niaosu);
        formData.append("shoufeizhan", shoufeizhan);
        formData.append("bt_licheng", bt_licheng);
        formData.append("bc_jiayou", bc_jiayou);

        var arr = [];


        $ajax({
            type: 'post',
            url: '/shujv/driverAdd',
            data: formData,
            async: true,
            cache: false,//不设置缓存
            processData: false,  // 不处理数据
            contentType: false // 不设置内容类型
        }, false, '', function (res) {
            if (res.code == 200) {
                alert(res.msg);
                location.reload();
            } else {
                alert(res.msg);
                formData = new FormData();
                $('#loading').modal('hide');
            }
        })
    })


});

function cheliang() {
    var pd = false;
    var checked = $("input[type='checkbox'][name='cheliang_feiyong']");
    $(checked).each(function (index, value) {
        if (checked[index].checked == true) {
            $('#yincang5').show();
            pd = true;
        }
    });
    if (!pd) {
        $('#yincang5').hide();

        var file11 = document.getElementById('file11');
        file11.value = '';
        var file12 = document.getElementById('file12');
        file12.value = '';
        var file13 = document.getElementById('file13');
        file13.value = '';
        var file14 = document.getElementById('file14');
        file14.value = '';
        var file15 = document.getElementById('file15');
        file15.value = '';
        var file16 = document.getElementById('file16');
        file16.value = '';
        var file17 = document.getElementById('file17');
        file17.value = '';
        $('#img11').removeAttr('src');
        $('#img12').removeAttr('src');
        $('#img13').removeAttr('src');
        $('#img14').removeAttr('src');
        $('#img15').removeAttr('src');
        $('#img16').removeAttr('src');
        $('#img17').removeAttr('src');
    }
}

function shenghuo() {
    var pd = false;
    var checked = $("input[type='checkbox'][name='shenghuo_feiyong']");
    $(checked).each(function (index, value) {
        if (checked[index].checked == true) {
            $('#yincang6').show();
            pd = true;
        }
    });
    if (!pd) {
        $('#yincang6').hide();

        $('#img19').removeAttr('src');
        $('#img20').removeAttr('src');
        $('#img21').removeAttr('src');

        var file18 = document.getElementById('file18');
        file18.value = '';
        var file19 = document.getElementById('file19');
        file19.value = '';
        var file20 = document.getElementById('file20');
        file20.value = '';
        var file21 = document.getElementById('file21');
        file21.value = '';
    }
}

function fileUp(id) {
    var file = document.getElementById("file" + id).files;
    if (file == null || file.length == 0) {
        return;
    }
    if (file[0].type.split("/")[0] == "image") {
        var reader = new FileReader();
        reader.readAsDataURL(file[0]);
        reader.onload = function (e) {
            $('#img' + id).attr("src", this.result);
        }
    }
}

function fileClick(id) {
    var imgSrc = $('#img' + id).attr('src');
    if (typeof (imgSrc) == "undefined") {
        $('#file' + id).trigger('click');
    } else {
        var msg = confirm("确认要删除图片吗？");
        if (msg) {
            var file = document.getElementById('file' + id);
            file.value = '';
            $('#img' + id).removeAttr('src');
        }
    }
}
