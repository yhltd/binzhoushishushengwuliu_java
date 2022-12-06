function getList() {
    $('#value').val("");
    $ajax({
        type: 'post',
        url: '/customer/getList',
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

$(function () {
    getList();

    $('#select-btn').click(function () {
        var value = $('#value').val();
        $ajax({
            type: 'post',
            url: '/customer/queryList',
            data: {
                value: value,
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
                url: '/customer/add',
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
        let rows = getTableSelection('#customerTable');
        if (rows.length > 1 || rows.length == 0) {
            alert('请选择一条数据修改!');
            return;
        }
        $('#update-modal').modal('show');
        setForm(rows[0].data, '#update-form');
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
                    url: '/customer/update',
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
            let rows = getTableSelection("#customerTable");
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
                url: '/customer/delete',
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
    })
});

function setTable(data) {
    if ($('#customerTable').html != '') {
        $('#customerTable').bootstrapTable('load', data);
    }

    $('#customerTable').bootstrapTable({
        data: data,
        sortStable: true,
        classes: 'table table-hover text-nowrap table table-bordered',
        idField: 'id',
        pagination: true,
        pageSize: 20,//单页记录数
        clickToSelect: true,
        locale: 'zh-CN',
        toolbar: '#table-toolbar',
        toolbarAlign: 'left',
        theadClasses: "thead-light",//这里设置表头样式
        style: 'table-layout:fixed',
        height: document.body.clientHeight * 0.85,
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
                field: 'jiancheng',
                title: '客户简称',
                align: 'center',
                sortable: true,
                width: 100,
            }, {
                field: 'pinyin',
                title: '拼音简写',
                align: 'center',
                sortable: true,
                width: 100,
            }, {
                field: 'quancheng',
                title: '客户全称',
                align: 'center',
                sortable: true,
                width: 150,
            }, {
                field: 'lianxiren',
                title: '联系人',
                align: 'center',
                sortable: true,
                width: 100,
            }, {
                field: 'phone',
                title: '联系电话',
                align: 'center',
                sortable: true,
                width: 100,
            }, {
                field: 'address',
                title: '客户地址',
                align: 'center',
                sortable: true,
                width: 200,
            }, {
                field: 'remarks',
                title: '备注',
                align: 'center',
                sortable: true,
                width: 150,
            }
        ],
        onClickRow: function (row, el) {
            let isSelect = $(el).hasClass('selected');
            if (isSelect) {
                $(el).removeClass('selected')
            } else {
                $(el).addClass('selected')
            }
        }
    })
}