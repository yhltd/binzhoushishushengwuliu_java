let vehicleId = '';

function getList() {
    $('#value').val("");
    $ajax({
        type: 'post',
        url: '/vehicle/getList',
    }, false, '', function (res) {
        if (res.code == 200) {
            setTable(res.data);
            // $("#userTable").colResizable({
            //     liveDrag: true,
            //     gripInnerHtml: "<div class='grip'></div>",
            //     draggingClass: "dragging",
            //     resizeMode: 'fit'
            // });
        }
    })
}

function getChepai() {
    $ajax({
        type: 'post',
        url: '/vehicle/getChepai',
    }, true, '', function (res) {
        if (res.code == 200) {
            for (var i=0; i<res.data.length; i++) {
                $("#value").append("<option>"+res.data[i].chepai+"</option>");
            }
        }
    })
}

$(function () {
    getList();
    getChepai();

    $('#select-btn').click(function () {
        var value = $('#value').val();
        $ajax({
            type: 'post',
            url: '/vehicle/queryList',
            data: {
                chepai: value,
            }
        }, true, '', function (res) {
            if (res.code == 200) {
                setTable(res.data);
            }
        })
    });

    //刷新
    $("#refresh-btn").click(function () {
        getList();
    });

    //点击新增按钮显示弹窗
    $("#add-btn").click(function () {
        $('#add-modal').modal('show');
    });
    $("#add-btn2").click(function () {
        $('#add-modal2').modal('show');
    });

    //新增弹窗里点击关闭按钮
    $('#add-close-btn').click(function () {
        $('#add-modal').modal('hide');
    });
    $('#add-close-btn2').click(function () {
        $('#add-modal2').modal('hide');
    });

    //新增弹窗里点击提交按钮
    $("#add-submit-btn").click(function () {
        let params = formToJson("#add-form");
        if (checkForm('#add-form')) {
            $ajax({
                type: 'post',
                url: '/vehicle/add',
                data: JSON.stringify({
                    addInfo: params,
                }),
                dataType: 'json',
                contentType: 'application/json;charset=utf-8'
            }, false, '', function (res) {
                if (res.code == 200) {
                    alert(res.msg);
                    $('#add-form')[0].reset();
                    getList();
                    $('#add-close-btn').click();
                } else {
                    alert(res.msg);
                }
            })
        }
    });

    $("#add-submit-btn2").click(function () {
        let params = formToJson("#add-form2");
        if (checkForm('#add-form2')) {
            $ajax({
                type: 'post',
                url: '/vehicle/add',
                data: JSON.stringify({
                    addInfo: params,
                }),
                dataType: 'json',
                contentType: 'application/json;charset=utf-8'
            }, false, '', function (res) {
                if (res.code == 200) {
                    alert(res.msg);
                    $('#add-form2')[0].reset();
                    getList();
                    $('#add-close-btn2').click();
                } else {
                    alert(res.msg);
                }
            })
        }
    });

    //点击修改按钮显示弹窗
    $('#update-btn').click(function () {
        let rows = getTableSelection('#vehicleTable');
        if (rows.length > 1 || rows.length == 0) {
            alert('请选择一条数据修改!');
            return;
        }
        if (rows[0].data.type == "车头") {
            $('#update-modal').modal('show');
            setForm(rows[0].data, '#update-form');
            $('#update-guochanJinkou').val(rows[0].data.guochanJinkou);
            $('#update-daiguachefou').val(rows[0].data.daiguachefou);
        } else {
            $('#update-modal2').modal('show');
            setForm(rows[0].data, '#update-form2');
        }
    });

    //修改弹窗点击关闭按钮
    $('#update-close-btn').click(function () {
        $('#update-form')[0].reset();
        $('#update-modal').modal('hide');
    });
    $('#update-close-btn2').click(function () {
        $('#update-form2')[0].reset();
        $('#update-modal2').modal('hide');
    });

    //修改弹窗里点击提交按钮
    $('#update-submit-btn').click(function () {
        var msg = confirm("确认要修改吗？");
        if (msg) {
            if (checkForm('#update-form')) {
                let params = formToJson('#update-form');
                $ajax({
                    type: 'post',
                    url: '/vehicle/update',
                    data: {
                        updateJson: JSON.stringify(params)
                    },
                    dataType: 'json',
                    contentType: 'application/json;charset=utf-8'
                }, false, '', function (res) {
                    if (res.code == 200) {
                        alert(res.msg);
                        $('#update-close-btn').click();
                        $('#update-modal').modal('hide');
                        getList();
                    } else {
                        alert(res.msg);
                    }
                })
            }
        }
    });

    $('#update-submit-btn2').click(function () {
        var msg = confirm("确认要修改吗？");
        if (msg) {
            if (checkForm('#update-form2')) {
                let params = formToJson('#update-form2');
                $ajax({
                    type: 'post',
                    url: '/vehicle/update',
                    data: {
                        updateJson: JSON.stringify(params)
                    },
                    dataType: 'json',
                    contentType: 'application/json;charset=utf-8'
                }, false, '', function (res) {
                    if (res.code == 200) {
                        alert(res.msg);
                        $('#update-close-btn2').click();
                        $('#update-modal2').modal('hide');
                        getList();
                    } else {
                        alert(res.msg);
                    }
                })
            }
        }
    });

    //点击删除按钮
    $('#delete-btn').click(function () {
        var msg = confirm("确认要删除吗？");
        if (msg) {
            let rows = getTableSelection("#vehicleTable");
            if (rows.length == 0) {
                alert('请选择要删除的数据！');
                return;
            }
            let idList = [];
            $.each(rows, function (index, row) {
                idList.push(row.data.id)
            });
            $ajax({
                type: 'post',
                url: '/vehicle/delete',
                data: JSON.stringify({
                    idList: idList
                }),
                dataType: 'json',
                contentType: 'application/json;charset=utf-8'
            }, false, '', function (res) {
                if (res.code == 200) {
                    alert(res.msg);
                    getList();
                } else {
                    alert(res.msg);
                }
            })
        }
    });

    $('#file').change(function () {
        var file = document.getElementById("file").files;
        var formData = new FormData();
        if (file.length == 0) {
            alert("请选择文件");
            return
        }
        //显示
        $('#loading').modal('show');
        for (var i = 0; i < file.length; i++) {    //提交时，我们把filearr中的数据遍历一遍
            formData.append("file", file[0]); //用append添加到formData中，就得用户最终要提交的图片了，多张的话[]必须
        }
        formData.append("id", vehicleId);
        $ajax({
            type: 'post',
            url: '/vehicle/upload',
            data: formData,
            async: true,
            cache: false,//不设置缓存
            processData: false,  // 不处理数据
            contentType: false // 不设置内容类型
        }, false, '', function (res) {
            if (res.code == 200) {
                alert(res.msg);
                formData = new FormData();
                var fileInput = document.getElementById('file');
                fileInput.value = '';
                //影藏
                $('#loading').modal('hide');
                getList();
            } else {
                alert(res.msg);
                formData = new FormData();
                var fileInput = document.getElementById('file');
                fileInput.value = '';
                //影藏
                $('#loading').modal('hide');
            }
        })
    });
});

function setTable(data) {
    if ($('#vehicleTable').html != '') {
        $('#vehicleTable').bootstrapTable('load', data);
    }

    $('#vehicleTable').bootstrapTable({
        data: data,
        sortStable: true,
        classes: 'table table-hover text-nowrap table table-bordered',
        idField: 'id',
        pagination: true,
        pageSize: 50,//单页记录数
        //clickToSelect: true,
        locale: 'zh-CN',
        toolbar: '#table-toolbar',
        toolbarAlign: 'left',
        theadClasses: "thead-light",//这里设置表头样式
        style: 'table-layout:fixed',
        height: document.body.clientHeight * 0.93,
        columns: [
            {
                checkbox: true,
            }, {
                field: '',
                title: '序号',
                align: 'center',
                width: 50,
                formatter: function (value, row, index) {
                    return index + 1;
                }
            }, {
                field: 'type',
                title: '类型',
                align: 'center',
                sortable: true,
                width: 100,
            }, {
                field: 'chepai',
                title: '车牌',
                align: 'center',
                sortable: true,
                width: 100,
            }, {
                field: '',
                title: '图片',
                align: 'center',
                sortable: true,
                width: 100,
                formatter: function (value, row, index) {
                    return '<button onclick="javascript:fileUp(' + row.id + ')" class="btn btn-primary">上传</button>&nbsp;&nbsp;&nbsp;&nbsp;<button onclick="javascript:fileDown(' + row.id + ')" class="btn btn-primary">下载</button>'
                    //return '<button onclick="javascript:pass(' + row.id + ','+ row.userId +')" class="btn-sm btn-primary">通过</button> <button onclick="javascript:refuse(' + row.id + ','+ row.userId +')" class="btn-sm btn-primary">拒绝</button>'
                }
            }, {
                field: 'filepath',
                title: '图片',
                align: 'center',
                sortable: true,
                width: 100,
                formatter: function (value, row, index) {
                    if (value != null && value != "") {
                        var a = value.split("/");
                        a = "/" + a[a.length - 1];
                        return '<a href="' + a + '" style="display:block" target="_blank"><img src="' + a + '" style="width: 50px;"></a>'
                    }
                }
            }
        ],
        // onClickRow: function (row, el) {
        //     let isSelect = $(el).hasClass('selected');
        //     if (isSelect) {
        //         $(el).removeClass('selected')
        //     } else {
        //         $(el).addClass('selected')
        //     }
        // }
    })
}

function fileUp(id) {
    vehicleId = id;
    $('#file').trigger('click');
}


function fileDown(id) {
    window.open("/vehicle/getFile?id=" + id);
}