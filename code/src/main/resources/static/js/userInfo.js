function getList() {
    $('#name').val("");
    $ajax({
        type: 'post',
        url: '/user/getList',
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

//权限
function getPower(id) {
    $ajax({
        type: 'post',
        url: '/user/getPower',
        data: {
            id: id
        }
    }, false, '', function (res) {
        if (res.code == 200) {
            setPowerTable(res.data);
            for (var i = 0; i < res.data.length; i++) {
                $('#add' + res.data[i].id).val(res.data[i].add);
                $('#del' + res.data[i].id).val(res.data[i].del);
                $('#upd' + res.data[i].id).val(res.data[i].upd);
                $('#sel' + res.data[i].id).val(res.data[i].sel);
            }
            $('#show-power-modal').modal('show');
        }
    })
}

$(function () {
    getList();

    $('#select-btn').click(function () {
        var name = $('#name').val();
        $ajax({
            type: 'post',
            url: '/user/queryList',
            data: {
                name: name,
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

    //新增弹窗里点击关闭按钮
    $('#add-close-btn').click(function () {
        $('#add-modal').modal('hide');
    });

    //新增弹窗里点击提交按钮
    $("#add-submit-btn").click(function () {
        let params = formToJson("#add-form");
        if (checkForm('#add-form')) {
            $ajax({
                type: 'post',
                url: '/user/add',
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

    //点击修改按钮显示弹窗
    $('#update-btn').click(function () {
        let rows = getTableSelection('#userTable');
        if (rows.length > 1 || rows.length == 0) {
            alert('请选择一条数据修改!');
            return;
        }
        $('#update-modal').modal('show');
        setForm(rows[0].data, '#update-form');
        $('#update-power').val(rows[0].data.power);
        $('#update-state').val(rows[0].data.state);
    });

    //修改弹窗点击关闭按钮
    $('#update-close-btn').click(function () {
        $('#update-form')[0].reset();
        $('#update-modal').modal('hide');
    });

    //修改弹窗里点击提交按钮
    $('#update-submit-btn').click(function () {
        var msg = confirm("确认要修改吗？");
        if (msg) {
            if (checkForm('#update-form')) {
                let params = formToJson('#update-form');
                $ajax({
                    type: 'post',
                    url: '/user/update',
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

    //点击删除按钮
    $('#delete-btn').click(function () {
        var msg = confirm("确认要删除吗？");
        if (msg) {
            let rows = getTableSelection("#userTable");
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
                url: '/user/delete',
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


    //权限窗体关闭按钮
    $("#power-close-btn").click(function () {
        $('#show-power-modal').modal('hide');
    });

    //权限窗体提交按钮
    $("#power-submit-btn").click(function () {
        var msg = confirm("确认要提交吗？");
        if (msg) {
            var cishu = 1;
            let rows = getRows("#show-table-power");
            $.each(rows, function (index, row) {
                $ajax({
                    type: 'post',
                    url: '/user/upd',
                    data: {
                        id: row.data.id,
                        add: row.add,
                        del: row.del,
                        upd: row.upd,
                        sel: row.sel,
                        userId: row.data.userId,
                        viewName: row.data.viewName,
                    },
                }, false, '', function (res) {
                    if (cishu == 1) {
                        alert(res.msg);
                        $('#show-power-modal').modal('hide');
                        cishu = cishu + 1;
                    }
                })
            });
        }
    });
});


function setTable(data) {
    if ($('#userTable').html != '') {
        $('#userTable').bootstrapTable('load', data);
    }

    $('#userTable').bootstrapTable({
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
                width: 30,
                formatter: function (value, row, index) {
                    return index + 1;
                }
            }, {
                field: 'username',
                title: '用户名',
                align: 'center',
                sortable: true,
                width: 100,
            }, {
                field: 'password',
                title: '密码',
                align: 'center',
                sortable: true,
                width: 100,
            }, {
                field: 'power',
                title: '权限',
                align: 'center',
                sortable: true,
                width: 100,
            }, {
                field: 'name',
                title: '姓名',
                align: 'center',
                sortable: true,
                width: 100,
            }, {
                field: 'state',
                title: '状态',
                align: 'center',
                sortable: true,
                width: 100,
            }, {
                field: '',
                title: '权限',
                align: 'center',
                sortable: true,
                width: 100,
                formatter: function (value, row, index) {
                    return '<button onclick="javascript:getPower(' + row.id + ')" class="btn btn-primary">查看</button>'
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


function setPowerTable(data) {
    if ($('#show-table-power').html != '') {
        $('#show-table-power').bootstrapTable('load', data);
    }

    $('#show-table-power').bootstrapTable({
        data: data,
        sortStable: true,
        classes: 'table table-hover',
        idField: 'id',
        pagination: true,
        pageSize: 15,
        searchAlign: 'left',
        locale: 'zh-CN',
        columns: [
            {
                field: '',
                title: '序号',
                align: 'center',
                width: 50,
                formatter: function (value, row, index) {
                    return index + 1;
                }
            }, {
                field: 'viewName',
                title: '页面名称',
                align: 'center',
                sortable: true,
                width: 100,
            }, {
                field: 'add',
                title: '新增',
                align: 'center',
                sortable: true,
                width: 100,
                formatter: function (value, row, index) {
                    return '<select type="text" name="add" id="add' + row.id + '" class="form-control" style="font-size: 13px"> <option></option><option>√</option></select>'
                }
            }, {
                field: 'del',
                title: '删除',
                align: 'center',
                sortable: true,
                width: 100,
                formatter: function (value, row, index) {
                    return '<select type="text" name="del" id="del' + row.id + '" class="form-control" style="font-size: 13px"> <option></option><option>√</option></select>'
                }
            }, {
                field: 'upd',
                title: '修改',
                align: 'center',
                sortable: true,
                width: 100,
                formatter: function (value, row, index) {
                    return '<select type="text" name="upd" id="upd' + row.id + '" class="form-control" style="font-size: 13px"> <option></option><option>√</option></select>'
                }
            }, {
                field: 'sel',
                title: '查询',
                align: 'center',
                sortable: true,
                width: 100,
                formatter: function (value, row, index) {
                    return '<select type="text" name="sel" id="sel' + row.id + '" class="form-control" style="font-size: 13px"> <option></option><option>√</option></select>'
                }
            }
        ],
    })
}

function getRows(el) {
    let result = [];
    let tableData = $(el).bootstrapTable('getData');
    $(el + ' tr').each(function (index, tr) {
        let dataIndex = $(tr).data('index');
        if (dataIndex == undefined) return true;

        let add = $(tr).children().eq(2).children().val();
        let del = $(tr).children().eq(3).children().val();
        let upd = $(tr).children().eq(4).children().val();
        let sel = $(tr).children().eq(5).children().val();

        result.push({
            add: add,
            del: del,
            upd: upd,
            sel: sel,
            data: tableData[index - 2]
        })
    });
    return result;
}