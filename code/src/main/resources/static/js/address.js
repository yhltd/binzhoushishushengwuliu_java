function getList() {
    $('#sh').val("");
    $('#sf').val("");
    $ajax({
        type: 'post',
        url: '/address/getList',
    }, false, '', function (res) {
        if (res.code == 200) {
            setTable(res.data);
            // $("#addressTable").colResizable({
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

    //刷新
    $("#refresh-btn").click(function () {
        getList();
    });

    $('#select-btn').click(function () {
        var sh = $('#sh').val();
        var sf = $('#sf').val();
        $ajax({
            type: 'post',
            url: '/address/queryList',
            data: {
                sh: sh,
                sf: sf,
            }
        }, true, '', function (res) {
            if (res.code == 200) {
                setTable(res.data);
            }
        })
    });

    //添加一行
    $("#add-btn").click(function () {
        $ajax({
            type: 'post',
            url: '/address/addRow',
        }, false, '', function (res) {
            if (res.code == 200) {
                alert(res.msg);
                getList();
            }
        });
    });

    //点击删除按钮
    $('#delete-btn').click(function () {
        var msg = confirm("确认要删除吗？");
        if (msg) {
            let rows = getTableSelection("#addressTable");
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
                url: '/address/delete',
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

function columnUpd(id, column) {
    var this_value = $('#' + column + id).val();
    $ajax({
        type: 'post',
        url: '/address/update',
        data: {
            value: this_value,
            column: column,
            id: id,
        },
    }, true, '', function (res) {
        if (res.code == 200) {
            var obj = "";
            if (res.msg == '修改成功') {
                obj = document.getElementById("upd_1");
            } else {
                obj = document.getElementById("upd_2");
            }
            obj.hidden = false;
            setTimeout(function () {
                obj.hidden = true
            }, 3000);
        }
    })
}

function setTable(data) {
    if ($('#addressTable').html != '') {
        $('#addressTable').bootstrapTable('load', data);
    }

    $('#addressTable').bootstrapTable({
        data: data,
        sortStable: true,
        classes: 'table',
        idField: 'id',
        pagination: true,
        pageSize: 50,//单页记录数
        // clickToSelect: true,
        // singleSelect: true,
        locale: 'zh-CN',
        toolbar: '#table-toolbar',
        toolbarAlign: 'left',
        theadClasses: "thead-light",//这里设置表头样式
        style: 'table-layout:fixed',
        height: document.body.clientHeight * 0.93,
        //search:true,
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
                field: 'shAddress',
                title: '送货地址',
                align: 'center',
                sortable: true,
                width: 150,
                formatter: function (value, row, index) {
                    return '<input id="sh_address' + row.id + '" onblur="javascript:columnUpd(' + row.id + ',' + '\'sh_address\'' + ')" value="' + value + '" class="form-control" style="font-size:13px"  >'
                }
            }, {
                field: 'shJx',
                title: '拼音简写',
                align: 'center',
                sortable: true,
                width: 150,
                formatter: function (value, row, index) {
                    return '<input id="sh_jx' + row.id + '" onblur="javascript:columnUpd(' + row.id + ',' + '\'sh_jx\'' + ')" value="' + value + '" class="form-control" style="font-size:13px" >'
                }
            }, {
                field: 'sfAddress',
                title: '收费站',
                align: 'center',
                sortable: true,
                width: 150,
                formatter: function (value, row, index) {
                    return '<input id="sf_address' + row.id + '" onblur="javascript:columnUpd(' + row.id + ',' + '\'sf_address\'' + ')" value="' + value + '" class="form-control" style="font-size:13px" >'
                }
            }, {
                field: 'sfJx',
                title: '拼音简写',
                align: 'center',
                sortable: true,
                width: 150,
                formatter: function (value, row, index) {
                    return '<input id="sf_jx' + row.id + '" onblur="javascript:columnUpd(' + row.id + ',' + '\'sf_jx\'' + ')" value="' + value + '" class="form-control" style="font-size:13px" >'
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