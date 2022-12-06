let operation;
let fileId = "";

function getList() {
    $('#ks').val("");
    $('#js').val("");
    $('#chetou').val("");
    $ajax({
        type: 'post',
        url: '/shujv/getList',
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

//车牌信息组合
function getCombination() {
    $ajax({
        type: 'post',
        url: '/combination/getCombination',
    }, false, '', function (res) {
        if (res.code == 200) {
            setCombinationTable(res.data);
            $('#show-combination-modal').modal('show');
        }
    })
}

//客户
function getKehu() {
    $ajax({
        type: 'post',
        url: '/customer/getKehu',
    }, false, '', function (res) {
        if (res.code == 200) {
            setKehuTable(res.data);
            $('#show-kehu-modal').modal('show');
        }
    })
}

//地址
function getAddress() {
    $ajax({
        type: 'post',
        url: '/address/getAddress',
    }, false, '', function (res) {
        if (res.code == 200) {
            setAddressTable(res.data);
            $('#show-address-modal').modal('show');
        }
    })
}

//产品
function getProduct() {
    $ajax({
        type: 'post',
        url: '/product/getProduct',
    }, false, '', function (res) {
        if (res.code == 200) {
            setProductTable(res.data);
            $('#show-product-modal').modal('show');
        }
    })
}

//司机
function getDriver() {
    $ajax({
        type: 'post',
        url: '/driver/getDriver',
    }, false, '', function (res) {
        if (res.code == 200) {
            setDriverTable(res.data);
            $('#show-driver-modal').modal('show');
        }
    })
}

//车辆
function getVehicle() {
    $ajax({
        type: 'post',
        url: '/vehicle/getVehicle',
    }, false, '', function (res) {
        if (res.code == 200) {
            setVehicleTable(res.data);
            $('#show-vehicle-modal').modal('show');
        }
    })
}


//文件
function getFileList(id) {
    fileId = id;
    $ajax({
        type: 'post',
        url: '/filetable/getList',
        data: {
            id, id,
        }
    }, false, '', function (res) {
        if (res.code == 200) {
            setFileTable(res.data);
            $('#show-file-modal').modal('show');
        }
    })
}

$(function () {
    getList();

    $('#select-btn').click(function () {
        var ks = $('#ks').val();
        var js = $('#js').val();
        var chetou = $('#chetou').val();
        if (ks == "") {
            ks = "1900-01-01";
        }
        if (js == "") {
            js = "2200-01-01";
        }
        $ajax({
            type: 'post',
            url: '/shujv/queryList',
            data: {
                ks: ks,
                js: js,
                chetou: chetou,
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
                url: '/shujv/add',
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
        let rows = getTableSelection('#shujvTable');
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
                    url: '/shujv/update',
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
            let rows = getTableSelection("#shujvTable");
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
                url: '/shujv/delete',
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

    //添加窗体点击车头文本框
    $("#add-chetou").click(function () {
        operation = "添加";
        getCombination();
    });

    //修改窗体点击车头文本框
    $("#update-chetou").click(function () {
        operation = "修改";
        getCombination();
    });

    //车牌组合信息窗体关闭按钮
    $("#combination-close-btn").click(function () {
        $('#show-combination-modal').modal('hide');
    });

    //车牌组合信息窗体提交按钮
    $("#combination-submit-btn").click(function () {
        let rows = getTableSelection("#show-table-combination");
        if (rows.length != 1) {
            alert('请选择一条数据');
        } else {
            $.each(rows, function (index, row) {
                if (operation == "添加") {
                    $("#add-chetou").val(row.data.chepai);
                    $("#add-guache").val(row.data.guache);
                    $("#add-zhujia").val(row.data.zhujia);
                    $("#add-fujia").val(row.data.fujia);
                    $("#add-phone").val(row.data.phone);
                } else if (operation == "修改") {
                    $("#update-chetou").val(row.data.chepai);
                    $("#update-guache").val(row.data.guache);
                    $("#update-zhujia").val(row.data.zhujia);
                    $("#update-fujia").val(row.data.fujia);
                    $("#update-phone").val(row.data.phone);
                }
            });
            $('#show-combination-modal').modal('hide');
        }
    });


    //添加窗体点击客户本框
    $("#add-kehu").click(function () {
        operation = "添加";
        getKehu();
    });

    //修改窗体点击客户文本框
    $("#update-kehu").click(function () {
        operation = "修改";
        getKehu();
    });

    //客户窗体关闭按钮
    $("#kehu-close-btn").click(function () {
        $('#show-kehu-modal').modal('hide');
    });

    //客户窗体提交按钮
    $("#kehu-submit-btn").click(function () {
        let rows = getTableSelection("#show-table-kehu");
        if (rows.length != 1) {
            alert('请选择一条数据');
        } else {
            $.each(rows, function (index, row) {
                if (operation == "添加") {
                    $("#add-kehu").val(row.data.jiancheng);
                } else if (operation == "修改") {
                    $("#update-kehu").val(row.data.jiancheng);
                }
            });
            $('#show-kehu-modal').modal('hide');
        }
    });


    //添加窗体点击入场本框
    $("#add-chuchang").click(function () {
        operation = "出厂添加";
        getAddress();
    });

    //修改窗体点击入场文本框
    $("#update-chuchang").click(function () {
        operation = "出厂修改";
        getAddress();
    });

    //添加窗体点击入场本框
    $("#add-ruchang").click(function () {
        operation = "入厂添加";
        getAddress();
    });

    //修改窗体点击入场文本框
    $("#update-ruchang").click(function () {
        operation = "入厂修改";
        getAddress();
    });

    //地址窗体关闭按钮
    $("#address-close-btn").click(function () {
        $('#show-address-modal').modal('hide');
    });

    //地址窗体提交按钮
    $("#address-submit-btn").click(function () {
        let rows = getTableSelection("#show-table-address");
        if (rows.length != 1) {
            alert('请选择一条数据');
        } else {
            $.each(rows, function (index, row) {
                if (operation == "出厂添加") {
                    $("#add-chuchang").val(row.data.shAddress);
                } else if (operation == "出厂修改") {
                    $("#update-chuchang").val(row.data.shAddress);
                } else if (operation == "入厂添加") {
                    $("#add-ruchang").val(row.data.shAddress);
                } else if (operation == "入厂修改") {
                    $("#update-ruchang").val(row.data.shAddress);
                }
            });
            $('#show-address-modal').modal('hide');
        }
    });


    //添加窗体点击产品本框
    $("#add-item").click(function () {
        operation = "添加";
        getProduct();
    });

    //修改窗体点击产品文本框
    $("#update-item").click(function () {
        operation = "修改";
        getProduct();
    });

    //产品窗体关闭按钮
    $("#product-close-btn").click(function () {
        $('#show-product-modal').modal('hide');
    });

    //产品窗体提交按钮
    $("#product-submit-btn").click(function () {
        let rows = getTableSelection("#show-table-product");
        if (rows.length != 1) {
            alert('请选择一条数据');
        } else {
            $.each(rows, function (index, row) {
                if (operation == "添加") {
                    $("#add-item").val(row.data.product);
                } else if (operation == "修改") {
                    $("#update-item").val(row.data.product);
                }
            });
            $('#show-product-modal').modal('hide');
        }
    });


    //添加窗体点击司机文本框
    $("#add-zhujia").click(function () {
        operation = "主驾添加";
        getDriver();
    });

    //修改窗体点击司机文本框
    $("#update-zhujia").click(function () {
        operation = "主驾修改";
        getDriver();
    });

    //添加窗体点击司机文本框
    $("#add-fujia").click(function () {
        operation = "副驾添加";
        getDriver();
    });

    //修改窗体点击司机文本框
    $("#update-fujia").click(function () {
        operation = "副驾修改";
        getDriver();
    });

    //司机窗体关闭按钮
    $("#driver-close-btn").click(function () {
        $('#show-driver-modal').modal('hide');
    });

    //司机窗体提交按钮
    $("#driver-submit-btn").click(function () {
        let rows = getTableSelection("#show-table-driver");
        if (rows.length != 1) {
            alert('请选择一条数据');
        } else {
            $.each(rows, function (index, row) {
                if (operation == "主驾添加") {
                    $("#add-zhujia").val(row.data.name);
                } else if (operation == "主驾修改") {
                    $("#update-zhujia").val(row.data.name);
                } else if (operation == "副驾添加") {
                    $("#add-fujia").val(row.data.name);
                } else if (operation == "副驾修改") {
                    $("#update-fujia").val(row.data.name);
                }
            });
            $('#show-driver-modal').modal('hide');
        }
    });


    //添加窗体点击车辆文本框
    $("#add-label-chetou").click(function () {
        operation = "添加";
        getVehicle();
    });

    //修改窗体点击车辆文本框
    $("#update-label-chetou").click(function () {
        operation = "修改";
        getVehicle();
    });

    //车辆窗体关闭按钮
    $("#vehicle-close-btn").click(function () {
        $('#show-vehicle-modal').modal('hide');
    });

    //车辆窗体提交按钮
    $("#vehicle-submit-btn").click(function () {
        let rows = getTableSelection("#show-table-vehicle");
        if (rows.length != 1) {
            alert('请选择一条数据');
        } else {
            $.each(rows, function (index, row) {
                if (operation == "添加") {
                    $("#add-chetou").val(row.data.chepai);
                } else if (operation == "修改") {
                    $("#update-chetou").val(row.data.chepai);
                }
            });
            $('#show-vehicle-modal').modal('hide');
        }
    });


    //文件窗体关闭按钮
    $("#file-close-btn").click(function () {
        $('#show-file-modal').modal('hide');
    });
    //文件窗体上传按钮
    $("#file-up-btn").click(function () {
        $('#up-file-modal').modal('show');
    });
    $('#file-submit-btn').click(function () {
        $('#file').trigger('click');
    });

    $('#file').change(function () {
        var file = document.getElementById("file").files;
        var formData = new FormData();
        var filename = $('#filename').val();
        if (filename == "") {
            alert("请先填写文件名！");
            var fileInput = document.getElementById('file');
            fileInput.value = '';
            return
        }
        if (file.length == 0) {
            alert("请选择文件");
            return
        }
        //显示
        $('#loading').modal('show');
        for (var i = 0; i < file.length; i++) {    //提交时，我们把filearr中的数据遍历一遍
            formData.append("file", file[0]); //用append添加到formData中，就得用户最终要提交的图片了，多张的话[]必须
        }
        formData.append("filename", filename);
        formData.append("id", fileId);
        $ajax({
            type: 'post',
            url: '/filetable/add',
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
                $('#up-file-modal').modal('hide');
                getFileList(fileId);
                $('#filename').val("");
                //影藏
                $('#loading').modal('hide');
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

    //点击删除按钮
    $('#file-del-btn').click(function () {
        var msg = confirm("确认要删除吗？");
        if (msg) {
            let rows = getTableSelection("#show-table-file");
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
                url: '/filetable/delete',
                data: JSON.stringify({
                    idList: idList
                }),
                dataType: 'json',
                contentType: 'application/json;charset=utf-8'
            }, false, '', function (res) {
                if (res.code == 200) {
                    alert(res.msg);
                    getFileList(fileId);
                } else {
                    alert(res.msg);
                }
            })
        }
    });

    //下载
    $('#file-down-btn').click(function () {
        let rows = getTableSelection("#show-table-file");
        if (rows.length == 0) {
            alert('请选择要下载的文件！');
            return;
        }
        $.each(rows, function (index, row) {
            window.open("/filetable/getFile?filepath="+row.data.filepath);
        });
    });


});

function setTable(data) {
    if ($('#shujvTable').html != '') {
        $('#shujvTable').bootstrapTable('load', data);
    }

    $('#shujvTable').bootstrapTable({
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
                field: 'chetou',
                title: '车头',
                align: 'center',
                sortable: true,
                width: 100,
            }, {
                field: 'guache',
                title: '挂车',
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
                field: 'phone',
                title: '电话号码',
                align: 'center',
                sortable: true,
                width: 100,
            }, {
                field: 'kehu',
                title: '客户',
                align: 'center',
                sortable: true,
                width: 100,
            }, {
                field: 'chuchang',
                title: '出厂/起',
                align: 'center',
                sortable: true,
                width: 100,
            }, {
                field: 'ruchang',
                title: '入场/止',
                align: 'center',
                sortable: true,
                width: 100,
            }, {
                field: 'item',
                title: '品名',
                align: 'center',
                sortable: true,
                width: 100,
            }, {
                field: 'thNum',
                title: '提货数量',
                align: 'center',
                sortable: true,
                width: 100,
            }, {
                field: 'shNum',
                title: '收货数量',
                align: 'center',
                sortable: true,
                width: 100,
            }, {
                field: 'licheng',
                title: '总里程',
                align: 'center',
                sortable: true,
                width: 100,
            }, {
                field: 'btLicheng',
                title: '本次里程',
                align: 'center',
                sortable: true,
                width: 100,
            }, {
                field: 'bcJiayou',
                title: '本次加油',
                align: 'center',
                sortable: true,
                width: 100,
            }, {
                field: 'youhao',
                title: '100KM油耗',
                align: 'center',
                sortable: true,
                width: 100,
            }, {
                field: 'xingshilicheng',
                title: '每公升行驶里程',
                align: 'center',
                sortable: true,
                width: 100,
            }, {
                field: 'baidunyouhao',
                title: '百吨油耗',
                align: 'center',
                sortable: true,
                width: 100,
            }, {
                field: 'niaosu',
                title: '尿素',
                align: 'center',
                sortable: true,
                width: 100,
            }, {
                field: 'bangfei',
                title: '磅费',
                align: 'center',
                sortable: true,
                width: 100,
            }, {
                field: 'etc',
                title: 'ETC',
                align: 'center',
                sortable: true,
                width: 100,
            }, {
                field: 'xianjin',
                title: '现金',
                align: 'center',
                sortable: true,
                width: 100,
            }, {
                field: 'xiulifei',
                title: '修理费',
                align: 'center',
                sortable: true,
                width: 100,
            }, {
                field: 'xiche',
                title: '洗车',
                align: 'center',
                sortable: true,
                width: 100,
            }, {
                field: 'jiashui',
                title: '加水',
                align: 'center',
                sortable: true,
                width: 100,
            }, {
                field: 'chefei',
                title: '车费',
                align: 'center',
                sortable: true,
                width: 100,
            }, {
                field: 'tingche',
                title: '停车',
                align: 'center',
                sortable: true,
                width: 100,
            }, {
                field: 'zhusu',
                title: '住宿',
                align: 'center',
                sortable: true,
                width: 100,
            }, {
                field: 'zafei',
                title: '杂费',
                align: 'center',
                sortable: true,
                width: 100,
            }, {
                field: 'shenghuofei',
                title: '生活费',
                align: 'center',
                sortable: true,
                width: 100,
            }, {
                field: 'yunfei',
                title: '运费',
                align: 'center',
                sortable: true,
                width: 100,
            }, {
                field: 'jiaojingfakuan',
                title: '交警罚款',
                align: 'center',
                sortable: true,
                width: 100,
            }, {
                field: 'heji',
                title: '合计',
                align: 'center',
                sortable: true,
                width: 100,
            }, {
                field: 'shoufeizhan',
                title: '收费站',
                align: 'center',
                sortable: true,
                width: 500,
            }, {
                field: 'beizhu',
                title: '备注信息',
                align: 'center',
                sortable: true,
                width: 200,
            }, {
                field: '',
                title: '查看文件',
                align: 'center',
                sortable: true,
                width: 100,
                formatter: function (value, row, index) {
                    return '<button onclick="javascript:getFileList(' + row.id + ')" class="btn btn-primary">查看</button>'
                }
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

function setCombinationTable(data) {
    if ($('#show-table-combination').html() != '') {
        $('#show-table-combination').bootstrapTable('load', data);
    }
    $('#show-table-combination').bootstrapTable({
        data: data,
        sortStable: true,
        classes: 'table table-hover',
        idField: 'id',
        pagination: true,
        pageSize: 5,
        search: true,
        searchAlign: 'left',
        clickToSelect: true,
        singleSelect: true,
        locale: 'zh-CN',
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
                field: 'chepai',
                title: '车牌',
                align: 'center',
                sortable: true,
                width: 100,
            }, {
                field: 'guache',
                title: '挂车',
                align: 'center',
                sortable: true,
                width: 100,
            }, {
                field: 'type',
                title: '类型',
                align: 'left',
                sortable: true,
                width: 100,
            }, {
                field: 'zhujia',
                title: '主驾',
                align: 'left',
                sortable: true,
                width: 100,
            }, {
                field: 'fujia',
                title: '副驾',
                align: 'left',
                sortable: true,
                width: 100,
            }, {
                field: 'phone',
                title: '电话',
                align: 'left',
                sortable: true,
                width: 100,
            }, {
                field: 'remarks',
                title: '备注',
                align: 'left',
                sortable: true,
                width: 100,
            },
        ],
    })
}

function setKehuTable(data) {
    if ($('#show-table-kehu').html() != '') {
        $('#show-table-kehu').bootstrapTable('load', data);
    }
    $('#show-table-kehu').bootstrapTable({
        data: data,
        sortStable: true,
        classes: 'table table-hover',
        idField: 'id',
        pagination: true,
        pageSize: 5,
        search: true,
        searchAlign: 'left',
        clickToSelect: true,
        singleSelect: true,
        locale: 'zh-CN',
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
    })
}

function setAddressTable(data) {
    if ($('#show-table-address').html != '') {
        $('#show-table-address').bootstrapTable('load', data);
    }

    $('#show-table-address').bootstrapTable({
        data: data,
        sortStable: true,
        classes: 'table table-hover',
        idField: 'id',
        pagination: true,
        pageSize: 5,
        search: true,
        searchAlign: 'left',
        clickToSelect: true,
        singleSelect: true,
        locale: 'zh-CN',
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
            }, {
                field: 'shJx',
                title: '拼音简写',
                align: 'center',
                sortable: true,
                width: 150,
            }
        ],
    })
}

function setProductTable(data) {
    if ($('#show-table-product').html != '') {
        $('#show-table-product').bootstrapTable('load', data);
    }

    $('#show-table-product').bootstrapTable({
        data: data,
        sortStable: true,
        classes: 'table table-hover',
        idField: 'id',
        pagination: true,
        pageSize: 5,
        search: true,
        searchAlign: 'left',
        clickToSelect: true,
        singleSelect: true,
        locale: 'zh-CN',
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
                field: 'product',
                title: '产品',
                align: 'center',
                sortable: true,
                width: 150,
            }, {
                field: 'pinyin',
                title: '拼音简写',
                align: 'center',
                sortable: true,
                width: 150,
            }
        ],
    })
}

function setDriverTable(data) {
    if ($('#show-table-driver').html != '') {
        $('#show-table-driver').bootstrapTable('load', data);
    }

    $('#show-table-driver').bootstrapTable({
        data: data,
        sortStable: true,
        classes: 'table table-hover',
        idField: 'id',
        pagination: true,
        pageSize: 5,
        search: true,
        searchAlign: 'left',
        clickToSelect: true,
        singleSelect: true,
        locale: 'zh-CN',
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
                field: 'no',
                title: '驾驶员编号',
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
                field: 'sex',
                title: '性别',
                align: 'center',
                sortable: true,
                width: 100,
            }, {
                field: 'birth',
                title: '出生日期',
                align: 'center',
                sortable: true,
                width: 100,
            }, {
                field: 'idNo',
                title: '身份证号',
                align: 'center',
                sortable: true,
                width: 100,
            }, {
                field: 'jiashizhenghao',
                title: '驾驶证号',
                align: 'center',
                sortable: true,
                width: 100,
            }, {
                field: 'jiashizhengbianhao',
                title: '驾驶证编号',
                align: 'center',
                sortable: true,
                width: 100,
            }, {
                field: 'zhunjiachexing',
                title: '准驾车型',
                align: 'center',
                sortable: true,
                width: 100,
            }, {
                field: 'chepai',
                title: '车牌号',
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
                title: '家庭住址',
                align: 'center',
                sortable: true,
                width: 200,
            }
        ],
    })
}

function setVehicleTable(data) {
    if ($('#show-table-vehicle').html != '') {
        $('#show-table-vehicle').bootstrapTable('load', data);
    }

    $('#show-table-vehicle').bootstrapTable({
        data: data,
        sortStable: true,
        classes: 'table table-hover',
        idField: 'id',
        pagination: true,
        pageSize: 5,
        search: true,
        searchAlign: 'left',
        clickToSelect: true,
        singleSelect: true,
        locale: 'zh-CN',
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
                field: 'chepai',
                title: '车牌',
                align: 'center',
                sortable: true,
                width: 100,
            }
        ],
    })
}

function setFileTable(data) {
    if ($('#show-table-file').html != '') {
        $('#show-table-file').bootstrapTable('load', data);
    }

    $('#show-table-file').bootstrapTable({
        data: data,
        sortStable: true,
        classes: 'table table-hover',
        idField: 'id',
        pagination: true,
        pageSize: 5,
        search: true,
        searchAlign: 'left',
        clickToSelect: true,
        singleSelect: true,
        locale: 'zh-CN',
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
                field: 'filename',
                title: '文件名',
                align: 'center',
                sortable: true,
                width: 100,
            }
        ],
    })
}