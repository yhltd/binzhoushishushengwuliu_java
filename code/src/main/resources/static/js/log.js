function getList() {
    $('#name').val("");
    $('#ks').val("");
    $('#js').val("");
    $ajax({
        type: 'post',
        url: '/log/getList',
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
        var name = $('#name').val();
        var ks = $('#ks').val();
        var js = $('#js').val();
        $ajax({
            type: 'post',
            url: '/log/queryList',
            data: {
                name: name,
                ks: ks,
                js: js,
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

    //点击删除按钮
    $('#delete-btn').click(function () {
        var msg = confirm("确认要删除吗？");
        if (msg) {
            let rows = getTableSelection("#logTable");
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
                url: '/log/delete',
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
});

function setTable(data) {
    if ($('#logTable').html != '') {
        $('#logTable').bootstrapTable('load', data);
    }

    $('#logTable').bootstrapTable({
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
                width: 30,
                formatter: function (value, row, index) {
                    return index + 1;
                }
            }, {
                field: 'riqi',
                title: '操作时间',
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
                field: 'viewName',
                title: '页面名称',
                align: 'center',
                sortable: true,
                width: 100,
            }, {
                field: 'content',
                title: '操作内容',
                align: 'center',
                sortable: true,
                width: 100,
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
