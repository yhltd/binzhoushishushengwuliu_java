function getList() {
    $('#ks').val("");
    $('#js').val("");
    $('#name').val("");
    $ajax({
        type: 'post',
        url: '/shujv/getSalary',
        data: {
            ks: '',
            js: '',
            name: '',
        }
    }, true, '', function (res) {
        if (res.code == 200) {
            setTable(res.data);
        }
    })
}

$(function () {
    getList();

    $('#refresh-btn').click(function () {
        getList();
    });


    $('#select-btn').click(function () {
        var ks = $('#ks').val();
        var js = $('#js').val();
        var name = $('#name').val();
        $ajax({
            type: 'post',
            url: '/shujv/getSalary',
            data: {
                ks: ks,
                js: js,
                name: name,
            }
        }, true, '', function (res) {
            if (res.code == 200) {
                setTable(res.data);
            }
        })
    });
});

function setTable(data) {
    if ($('#salaryTable').html != '') {
        $('#salaryTable').bootstrapTable('load', data);
    }

    $('#salaryTable').bootstrapTable({
        data: data,
        sortStable: true,
        classes: 'table table-hover text-nowrap table table-bordered',
        idField: 'id',
        pagination: true,
        pageSize: 20,//单页记录数
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
                field: 'thRiqi',
                title: '提货日期',
                align: 'center',
                sortable: true,
                width: 100,
            }, {
                field: 'xhRiqi',
                title: '卸货日期',
                align: 'center',
                sortable: true,
                width: 100,
            }, {
                field: 'zhujia',
                title: '主驾',
                align: 'center',
                sortable: true,
                width: 100,
            }, {
                field: 'fujia',
                title: '副驾',
                align: 'center',
                sortable: true,
                width: 100,
            }, {
                field: 'ruchang',
                title: '装货点',
                align: 'center',
                sortable: true,
                width: 100,
            }, {
                field: 'chuchang',
                title: '卸货点',
                align: 'center',
                sortable: true,
                width: 100,
            }, {
                field: 'thNum',
                title: '提数',
                align: 'center',
                sortable: true,
                width: 100,
            }, {
                field: 'shNum',
                title: '实收',
                align: 'center',
                sortable: true,
                width: 100,
            }, {
                field: 'beizhu',
                title: '提成工资',
                align: 'center',
                sortable: true,
                width: 100,
            }
        ],
    })
}