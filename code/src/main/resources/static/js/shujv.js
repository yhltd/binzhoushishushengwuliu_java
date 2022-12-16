let operation;
let fileId = "";
let shujvId = "";
let fileColumn = "";

function getList() {
    $('#ks').val("");
    $('#js').val("");
    $('#chetou').val("");
    $ajax({
        type: 'post',
        url: '/shujv/queryList',
        data:{
            ks:getFirstDay(),
            js:getLastDay(),
            chetou:'',
        },
    }, false, '', function (res) {
        if (res.code == 200) {
            setTable(res.data);
        }
    })
}


function getFirstDay(){
    var y = new Date().getFullYear(); //获取年份
    var m = new Date().getMonth() + 1; //获取月份
    var d = '01'
    m = m < 10 ? '0' + m : m; //月份补 0

    return [y,m,d].join("-")
}
function getLastDay(){
    var y = new Date().getFullYear(); //获取年份
    var m = new Date().getMonth() + 1; //获取月份
    var d = new Date(y, m, 0).getDate(); //获取当月最后一日
    m = m < 10 ? '0' + m : m; //月份补 0
    d = d < 10 ? '0' + d : d; //日数补 0

    return [y,m,d].join("-")
}


//下拉
function getChetou() {
    $ajax({
        type: 'post',
        url: '/shujv/getChetou',
    }, false, '', function (res) {
        if (res.code == 200) {
            for (var i = 0; i < res.data.length; i++) {
                $("#chetou").append("<option>" + res.data[i].chetou + "</option>");
            }
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
    getChetou();

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
        if($.session.get('power')=="其他"||$.session.get('power')=="审核人"){
            $('#add-kehu-yincang').hide();
        }
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
        if($.session.get('power')=="其他"||$.session.get('power')=="审核人"){
            $('#update-kehu-yincang').hide();
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
        formData.append("column", fileColumn);
        $ajax({
            type: 'post',
            url: '/shujv/fileUp',
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
                getList();
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
            window.open("/filetable/getFile?filepath=" + row.data.filepath);
        });
    });

    //隐藏列
    $('#yincang-btn').click(function () {
        var yincang = $('#yincang').val();
        if (yincang == "提货日期") {
            $('#shujvTable').bootstrapTable('hideColumn', 'thRiqi');
        } else if (yincang == "卸货日期") {
            $('#shujvTable').bootstrapTable('hideColumn', 'xhRiqi');
        } else if (yincang == "车头") {
            $('#shujvTable').bootstrapTable('hideColumn', 'chetou');
        } else if (yincang == "挂车") {
            $('#shujvTable').bootstrapTable('hideColumn', 'guache');
        } else if (yincang == "主驾") {
            $('#shujvTable').bootstrapTable('hideColumn', 'zhujia');
        } else if (yincang == "副驾") {
            $('#shujvTable').bootstrapTable('hideColumn', 'fujia');
        } else if (yincang == "电话号码") {
            $('#shujvTable').bootstrapTable('hideColumn', 'phone');
        } else if (yincang == "客户") {
            $('#shujvTable').bootstrapTable('hideColumn', 'kehu');
        } else if (yincang == "出厂/起") {
            $('#shujvTable').bootstrapTable('hideColumn', 'chuchang');
        } else if (yincang == "入场/止") {
            $('#shujvTable').bootstrapTable('hideColumn', 'ruchang');
        } else if (yincang == "品名") {
            $('#shujvTable').bootstrapTable('hideColumn', 'item');
        } else if (yincang == "提货数量") {
            $('#shujvTable').bootstrapTable('hideColumn', 'thNum');
        } else if (yincang == "收货数量") {
            $('#shujvTable').bootstrapTable('hideColumn', 'shNum');
        } else if (yincang == "总里程") {
            $('#shujvTable').bootstrapTable('hideColumn', 'lichang');
        } else if (yincang == "本次里程") {
            $('#shujvTable').bootstrapTable('hideColumn', 'btLicheng');
        } else if (yincang == "本次加油") {
            $('#shujvTable').bootstrapTable('hideColumn', 'bcJiayou');
        } else if (yincang == "100KM油耗") {
            $('#shujvTable').bootstrapTable('hideColumn', 'youhao');
        } else if (yincang == "每公升行驶里程") {
            $('#shujvTable').bootstrapTable('hideColumn', 'xingshilicheng');
        } else if (yincang == "百吨油耗") {
            $('#shujvTable').bootstrapTable('hideColumn', 'baidunyouhao');
        } else if (yincang == "尿素") {
            $('#shujvTable').bootstrapTable('hideColumn', 'niaosu');
        } else if (yincang == "磅费") {
            $('#shujvTable').bootstrapTable('hideColumn', 'bangfei');
        } else if (yincang == "ETC") {
            $('#shujvTable').bootstrapTable('hideColumn', 'etc');
        } else if (yincang == "现金") {
            $('#shujvTable').bootstrapTable('hideColumn', 'xianjin');
        } else if (yincang == "修理费") {
            $('#shujvTable').bootstrapTable('hideColumn', 'xiulifei');
        } else if (yincang == "洗车") {
            $('#shujvTable').bootstrapTable('hideColumn', 'xiche');
        } else if (yincang == "加水") {
            $('#shujvTable').bootstrapTable('hideColumn', 'jiashui');
        } else if (yincang == "车费") {
            $('#shujvTable').bootstrapTable('hideColumn', 'chefei');
        } else if (yincang == "停车") {
            $('#shujvTable').bootstrapTable('hideColumn', 'tingche');
        } else if (yincang == "住宿") {
            $('#shujvTable').bootstrapTable('hideColumn', 'zhusu');
        } else if (yincang == "杂费") {
            $('#shujvTable').bootstrapTable('hideColumn', 'zafei');
        } else if (yincang == "生活费") {
            $('#shujvTable').bootstrapTable('hideColumn', 'shenghuofei');
        } else if (yincang == "运费") {
            $('#shujvTable').bootstrapTable('hideColumn', 'yunfei');
        } else if (yincang == "交警罚款") {
            $('#shujvTable').bootstrapTable('hideColumn', 'jiaojingfakuan');
        } else if (yincang == "合计") {
            $('#shujvTable').bootstrapTable('hideColumn', 'heji');
        } else if (yincang == "收费站") {
            $('#shujvTable').bootstrapTable('hideColumn', 'shoufeizhan');
        } else if (yincang == "备注信息") {
            $('#shujvTable').bootstrapTable('hideColumn', 'beizhu');
        }
    });
    //显示列
    $('#xianshi-btn').click(function () {
        var yincang = $('#yincang').val();
        if (yincang == "提货日期") {
            $('#shujvTable').bootstrapTable('showColumn', 'thRiqi');
        } else if (yincang == "卸货日期") {
            $('#shujvTable').bootstrapTable('showColumn', 'xhRiqi');
        } else if (yincang == "车头") {
            $('#shujvTable').bootstrapTable('showColumn', 'chetou');
        } else if (yincang == "挂车") {
            $('#shujvTable').bootstrapTable('showColumn', 'guache');
        } else if (yincang == "主驾") {
            $('#shujvTable').bootstrapTable('showColumn', 'zhujia');
        } else if (yincang == "副驾") {
            $('#shujvTable').bootstrapTable('showColumn', 'fujia');
        } else if (yincang == "电话号码") {
            $('#shujvTable').bootstrapTable('showColumn', 'phone');
        } else if (yincang == "客户") {
            $('#shujvTable').bootstrapTable('showColumn', 'kehu');
        } else if (yincang == "出厂/起") {
            $('#shujvTable').bootstrapTable('showColumn', 'chuchang');
        } else if (yincang == "入场/止") {
            $('#shujvTable').bootstrapTable('showColumn', 'ruchang');
        } else if (yincang == "品名") {
            $('#shujvTable').bootstrapTable('showColumn', 'item');
        } else if (yincang == "提货数量") {
            $('#shujvTable').bootstrapTable('showColumn', 'thNum');
        } else if (yincang == "收货数量") {
            $('#shujvTable').bootstrapTable('showColumn', 'shNum');
        } else if (yincang == "总里程") {
            $('#shujvTable').bootstrapTable('showColumn', 'lichang');
        } else if (yincang == "本次里程") {
            $('#shujvTable').bootstrapTable('showColumn', 'btLicheng');
        } else if (yincang == "本次加油") {
            $('#shujvTable').bootstrapTable('showColumn', 'bcJiayou');
        } else if (yincang == "100KM油耗") {
            $('#shujvTable').bootstrapTable('showColumn', 'youhao');
        } else if (yincang == "每公升行驶里程") {
            $('#shujvTable').bootstrapTable('showColumn', 'xingshilicheng');
        } else if (yincang == "百吨油耗") {
            $('#shujvTable').bootstrapTable('showColumn', 'baidunyouhao');
        } else if (yincang == "尿素") {
            $('#shujvTable').bootstrapTable('showColumn', 'niaosu');
        } else if (yincang == "磅费") {
            $('#shujvTable').bootstrapTable('showColumn', 'bangfei');
        } else if (yincang == "ETC") {
            $('#shujvTable').bootstrapTable('showColumn', 'etc');
        } else if (yincang == "现金") {
            $('#shujvTable').bootstrapTable('showColumn', 'xianjin');
        } else if (yincang == "修理费") {
            $('#shujvTable').bootstrapTable('showColumn', 'xiulifei');
        } else if (yincang == "洗车") {
            $('#shujvTable').bootstrapTable('showColumn', 'xiche');
        } else if (yincang == "加水") {
            $('#shujvTable').bootstrapTable('showColumn', 'jiashui');
        } else if (yincang == "车费") {
            $('#shujvTable').bootstrapTable('showColumn', 'chefei');
        } else if (yincang == "停车") {
            $('#shujvTable').bootstrapTable('showColumn', 'tingche');
        } else if (yincang == "住宿") {
            $('#shujvTable').bootstrapTable('showColumn', 'zhusu');
        } else if (yincang == "杂费") {
            $('#shujvTable').bootstrapTable('showColumn', 'zafei');
        } else if (yincang == "生活费") {
            $('#shujvTable').bootstrapTable('showColumn', 'shenghuofei');
        } else if (yincang == "运费") {
            $('#shujvTable').bootstrapTable('showColumn', 'yunfei');
        } else if (yincang == "交警罚款") {
            $('#shujvTable').bootstrapTable('showColumn', 'jiaojingfakuan');
        } else if (yincang == "合计") {
            $('#shujvTable').bootstrapTable('showColumn', 'heji');
        } else if (yincang == "收费站") {
            $('#shujvTable').bootstrapTable('showColumn', 'shoufeizhan');
        } else if (yincang == "备注信息") {
            $('#shujvTable').bootstrapTable('showColumn', 'beizhu');
        }

    })


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
        pageSize: 50,//单页记录数
        //clickToSelect: true,
        locale: 'zh-CN',
        toolbar: '#table-toolbar',
        toolbarAlign: 'left',
        theadClasses: "thead-light",//这里设置表头样式
        style: 'table-layout:fixed',
        height: document.body.clientHeight * 0.85,
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
                field: 'file1',
                title: '提货磅单图片',
                align: 'center',
                sortable: true,
                width: 150,
                formatter: function (value, row, index) {
                    if (value != null && value != "") {
                        var a = value.split("/");
                        a = "/" + a[a.length - 1];
                        return '<a href="' + a + '" style="display:block" target="_blank"><img src="' + a + '" style="width: 50px;"></a> <button onclick="javascript:fileUp(' + row.id + ',' + '\'file1\'' + ')" class="btn btn-small btn-primary">上传</button> <button onclick="javascript:fileDel(' + row.id + ',' + '\'file1\'' + ')" class="btn btn-small btn-primary">删除</button>'
                    } else {
                        return '<button onclick="javascript:fileUp(' + row.id + ',' + '\'file1\'' + ')" class="btn btn-small btn-primary">上传</button> </a>'
                    }
                }
            }, {
                field: 'file2',
                title: '仪表台盘照片1',
                align: 'center',
                sortable: true,
                width: 150,
                formatter: function (value, row, index) {
                    if (value != null && value != "") {
                        var a = value.split("/");
                        a = "/" + a[a.length - 1];
                        return '<a href="' + a + '" style="display:block" target="_blank"><img src="' + a + '" style="width: 50px;"></a> <button onclick="javascript:fileUp(' + row.id + ',' + '\'file2\'' + ')" class="btn btn-small btn-primary">上传</button> <button onclick="javascript:fileDel(' + row.id + ',' + '\'file2\'' + ')" class="btn btn-small btn-primary">删除</button>'
                    } else {
                        return '<button onclick="javascript:fileUp(' + row.id + ',' + '\'file2\'' + ')" class="btn btn-small btn-primary">上传</button> </a>'
                    }
                }
            }, {
                field: 'file3',
                title: '仪表台盘照片2',
                align: 'center',
                sortable: true,
                width: 150,
                formatter: function (value, row, index) {
                    if (value != null && value != "") {
                        var a = value.split("/");
                        a = "/" + a[a.length - 1];
                        return '<a href="' + a + '" style="display:block" target="_blank"><img src="' + a + '" style="width: 50px;"></a> <button onclick="javascript:fileUp(' + row.id + ',' + '\'file3\'' + ')" class="btn btn-mini btn-primary">上传</button> <button onclick="javascript:fileDel(' + row.id + ',' + '\'file3\'' + ')" class="btn btn-mini btn-primary">删除</button>'
                    } else {
                        return '<button onclick="javascript:fileUp(' + row.id + ',' + '\'file3\'' + ')" class="btn btn-mini btn-primary">上传</button>'
                    }
                }
            }, {
                field: 'file4',
                title: '仪表台盘照片3',
                align: 'center',
                sortable: true,
                width: 150,
                formatter: function (value, row, index) {
                    if (value != null && value != "") {
                        var a = value.split("/");
                        a = "/" + a[a.length - 1];
                        return '<a href="' + a + '" style="display:block" target="_blank"><img src="' + a + '" style="width: 50px;"></a> <button onclick="javascript:fileUp(' + row.id + ',' + '\'file4\'' + ')" class="btn btn-mini btn-primary">上传</button> <button onclick="javascript:fileDel(' + row.id + ',' + '\'file4\'' + ')" class="btn btn-mini btn-primary">删除</button>'
                    } else {
                        return '<button onclick="javascript:fileUp(' + row.id + ',' + '\'file4\'' + ')" class="btn btn-mini btn-primary">上传</button>'
                    }
                }
            }, {
                field: 'file5',
                title: '仪表台盘照片4',
                align: 'center',
                sortable: true,
                width: 150,
                formatter: function (value, row, index) {
                    if (value != null && value != "") {
                        var a = value.split("/");
                        a = "/" + a[a.length - 1];
                        return '<a href="' + a + '" style="display:block" target="_blank"><img src="' + a + '" style="width: 50px;"></a> <button onclick="javascript:fileUp(' + row.id + ',' + '\'file5\'' + ')" class="btn btn-mini btn-primary">上传</button> <button onclick="javascript:fileDel(' + row.id + ',' + '\'file5\'' + ')" class="btn btn-mini btn-primary">删除</button>'
                    } else {
                        return '<button onclick="javascript:fileUp(' + row.id + ',' + '\'file5\'' + ')" class="btn btn-mini btn-primary">上传</button>'
                    }
                }
            }, {
                field: 'file6',
                title: '加油归零前仪表照片1',
                align: 'center',
                sortable: true,
                width: 150,
                formatter: function (value, row, index) {
                    if (value != null && value != "") {
                        var a = value.split("/");
                        a = "/" + a[a.length - 1];
                        return '<a href="' + a + '" style="display:block" target="_blank"><img src="' + a + '" style="width: 50px;"></a> <button onclick="javascript:fileUp(' + row.id + ',' + '\'file6\'' + ')" class="btn btn-mini btn-primary">上传</button> <button onclick="javascript:fileDel(' + row.id + ',' + '\'file6\'' + ')" class="btn btn-mini btn-primary">删除</button>'
                    } else {
                        return '<button onclick="javascript:fileUp(' + row.id + ',' + '\'file6\'' + ')" class="btn btn-mini btn-primary">上传</button>'
                    }
                }
            }, {
                field: 'file7',
                title: '加油归零前仪表照片2',
                align: 'center',
                sortable: true,
                width: 150,
                formatter: function (value, row, index) {
                    if (value != null && value != "") {
                        var a = value.split("/");
                        a = "/" + a[a.length - 1];
                        return '<a href="' + a + '" style="display:block" target="_blank"><img src="' + a + '" style="width: 50px;"></a> <button onclick="javascript:fileUp(' + row.id + ',' + '\'file7\'' + ')" class="btn btn-mini btn-primary">上传</button> <button onclick="javascript:fileDel(' + row.id + ',' + '\'file7\'' + ')" class="btn btn-mini btn-primary">删除</button>'
                    } else {
                        return '<button onclick="javascript:fileUp(' + row.id + ',' + '\'file7\'' + ')" class="btn btn-mini btn-primary">上传</button>'
                    }
                }
            }, {
                field: 'file8',
                title: '加油归零前仪表照片3',
                align: 'center',
                sortable: true,
                width: 150,
                formatter: function (value, row, index) {
                    if (value != null && value != "") {
                        var a = value.split("/");
                        a = "/" + a[a.length - 1];
                        return '<a href="' + a + '" style="display:block" target="_blank"><img src="' + a + '" style="width: 50px;"></a> <button onclick="javascript:fileUp(' + row.id + ',' + '\'file8\'' + ')" class="btn btn-mini btn-primary">上传</button> <button onclick="javascript:fileDel(' + row.id + ',' + '\'file8\'' + ')" class="btn btn-mini btn-primary">删除</button>'
                    } else {
                        return '<button onclick="javascript:fileUp(' + row.id + ',' + '\'file8\'' + ')" class="btn btn-mini btn-primary">上传</button>'
                    }
                }
            }, {
                field: 'file9',
                title: '加油归零前仪表照片4',
                align: 'center',
                sortable: true,
                width: 150,
                formatter: function (value, row, index) {
                    if (value != null && value != "") {
                        var a = value.split("/");
                        a = "/" + a[a.length - 1];
                        return '<a href="' + a + '" style="display:block" target="_blank"><img src="' + a + '" style="width: 50px;"></a> <button onclick="javascript:fileUp(' + row.id + ',' + '\'file9\'' + ')" class="btn btn-mini btn-primary">上传</button> <button onclick="javascript:fileDel(' + row.id + ',' + '\'file9\'' + ')" class="btn btn-mini btn-primary">删除</button>'
                    } else {
                        return '<button onclick="javascript:fileUp(' + row.id + ',' + '\'file9\'' + ')" class="btn btn-mini btn-primary">上传</button>'
                    }
                }
            }, {
                field: 'file10',
                title: '加油归零前仪表照片5',
                align: 'center',
                sortable: true,
                width: 150,
                formatter: function (value, row, index) {
                    if (value != null && value != "") {
                        var a = value.split("/");
                        a = "/" + a[a.length - 1];
                        return '<a href="' + a + '" style="display:block" target="_blank"><img src="' + a + '" style="width: 50px;"></a> <button onclick="javascript:fileUp(' + row.id + ',' + '\'file10\'' + ')" class="btn btn-mini btn-primary">上传</button> <button onclick="javascript:fileDel(' + row.id + ',' + '\'file10\'' + ')" class="btn btn-mini btn-primary">删除</button>'
                    } else {
                        return '<button onclick="javascript:fileUp(' + row.id + ',' + '\'file10\'' + ')" class="btn btn-mini btn-primary">上传</button>'
                    }
                }
            }, {
                field: 'file11',
                title: '车辆类费用照片1',
                align: 'center',
                sortable: true,
                width: 150,
                formatter: function (value, row, index) {
                    if (value != null && value != "") {
                        var a = value.split("/");
                        a = "/" + a[a.length - 1];
                        return '<a href="' + a + '" style="display:block" target="_blank"><img src="' + a + '" style="width: 50px;"></a> <button onclick="javascript:fileUp(' + row.id + ',' + '\'file11\'' + ')" class="btn btn-mini btn-primary">上传</button> <button onclick="javascript:fileDel(' + row.id + ',' + '\'file11\'' + ')" class="btn btn-mini btn-primary">删除</button>'
                    } else {
                        return '<button onclick="javascript:fileUp(' + row.id + ',' + '\'file11\'' + ')" class="btn btn-mini btn-primary">上传</button>'
                    }
                }
            }, {
                field: 'file12',
                title: '车辆类费用照片2',
                align: 'center',
                sortable: true,
                width: 150,
                formatter: function (value, row, index) {
                    if (value != null && value != "") {
                        var a = value.split("/");
                        a = "/" + a[a.length - 1];
                        return '<a href="' + a + '" style="display:block" target="_blank"><img src="' + a + '" style="width: 50px;"></a> <button onclick="javascript:fileUp(' + row.id + ',' + '\'file12\'' + ')" class="btn btn-mini btn-primary">上传</button> <button onclick="javascript:fileDel(' + row.id + ',' + '\'file12\'' + ')" class="btn btn-mini btn-primary">删除</button>'
                    } else {
                        return '<button onclick="javascript:fileUp(' + row.id + ',' + '\'file12\'' + ')" class="btn btn-mini btn-primary">上传</button>'
                    }
                }
            }, {
                field: 'file13',
                title: '车辆类费用照片3',
                align: 'center',
                sortable: true,
                width: 150,
                formatter: function (value, row, index) {
                    if (value != null && value != "") {
                        var a = value.split("/");
                        a = "/" + a[a.length - 1];
                        return '<a href="' + a + '" style="display:block" target="_blank"><img src="' + a + '" style="width: 50px;"></a> <button onclick="javascript:fileUp(' + row.id + ',' + '\'file13\'' + ')" class="btn btn-mini btn-primary">上传</button> <button onclick="javascript:fileDel(' + row.id + ',' + '\'file13\'' + ')" class="btn btn-mini btn-primary">删除</button>'
                    } else {
                        return '<button onclick="javascript:fileUp(' + row.id + ',' + '\'file13\'' + ')" class="btn btn-mini btn-primary">上传</button>'
                    }
                }
            }, {
                field: 'file14',
                title: '车辆类费用照片4',
                align: 'center',
                sortable: true,
                width: 150,
                formatter: function (value, row, index) {
                    if (value != null && value != "") {
                        var a = value.split("/");
                        a = "/" + a[a.length - 1];
                        return '<a href="' + a + '" style="display:block" target="_blank"><img src="' + a + '" style="width: 50px;"></a> <button onclick="javascript:fileUp(' + row.id + ',' + '\'file14\'' + ')" class="btn btn-mini btn-primary">上传</button> <button onclick="javascript:fileDel(' + row.id + ',' + '\'file14\'' + ')" class="btn btn-mini btn-primary">删除</button>'
                    } else {
                        return '<button onclick="javascript:fileUp(' + row.id + ',' + '\'file14\'' + ')" class="btn btn-mini btn-primary">上传</button>'
                    }
                }
            }, {
                field: 'file6',
                title: '车辆类费用照片5',
                align: 'center',
                sortable: true,
                width: 150,
                formatter: function (value, row, index) {
                    if (value != null && value != "") {
                        var a = value.split("/");
                        a = "/" + a[a.length - 1];
                        return '<a href="' + a + '" style="display:block" target="_blank"><img src="' + a + '" style="width: 50px;"></a> <button onclick="javascript:fileUp(' + row.id + ',' + '\'file15\'' + ')" class="btn btn-mini btn-primary">上传</button> <button onclick="javascript:fileDel(' + row.id + ',' + '\'file15\'' + ')" class="btn btn-mini btn-primary">删除</button>'
                    } else {
                        return '<button onclick="javascript:fileUp(' + row.id + ',' + '\'file15\'' + ')" class="btn btn-mini btn-primary">上传</button>'
                    }
                }
            }, {
                field: 'file16',
                title: '车辆类费用照片6',
                align: 'center',
                sortable: true,
                width: 150,
                formatter: function (value, row, index) {
                    if (value != null && value != "") {
                        var a = value.split("/");
                        a = "/" + a[a.length - 1];
                        return '<a href="' + a + '" style="display:block" target="_blank"><img src="' + a + '" style="width: 50px;"></a> <button onclick="javascript:fileUp(' + row.id + ',' + '\'file16\'' + ')" class="btn btn-mini btn-primary">上传</button> <button onclick="javascript:fileDel(' + row.id + ',' + '\'file16\'' + ')" class="btn btn-mini btn-primary">删除</button>'
                    } else {
                        return '<button onclick="javascript:fileUp(' + row.id + ',' + '\'file16\'' + ')" class="btn btn-mini btn-primary">上传</button>'
                    }
                }
            }, {
                field: 'file17',
                title: '车辆类费用照片7',
                align: 'center',
                sortable: true,
                width: 150,
                formatter: function (value, row, index) {
                    if (value != null && value != "") {
                        var a = value.split("/");
                        a = "/" + a[a.length - 1];
                        return '<a href="' + a + '" style="display:block" target="_blank"><img src="' + a + '" style="width: 50px;"></a> <button onclick="javascript:fileUp(' + row.id + ',' + '\'file17\'' + ')" class="btn btn-mini btn-primary">上传</button> <button onclick="javascript:fileDel(' + row.id + ',' + '\'file17\'' + ')" class="btn btn-mini btn-primary">删除</button>'
                    } else {
                        return '<button onclick="javascript:fileUp(' + row.id + ',' + '\'file17\'' + ')" class="btn btn-mini btn-primary">上传</button>'
                    }
                }
            }, {
                field: 'file18',
                title: '生活类费用照片1',
                align: 'center',
                sortable: true,
                width: 150,
                formatter: function (value, row, index) {
                    if (value != null && value != "") {
                        var a = value.split("/");
                        a = "/" + a[a.length - 1];
                        return '<a href="' + a + '" style="display:block" target="_blank"><img src="' + a + '" style="width: 50px;"></a> <button onclick="javascript:fileUp(' + row.id + ',' + '\'file18\'' + ')" class="btn btn-mini btn-primary">上传</button> <button onclick="javascript:fileDel(' + row.id + ',' + '\'file18\'' + ')" class="btn btn-mini btn-primary">删除</button>'
                    } else {
                        return '<button onclick="javascript:fileUp(' + row.id + ',' + '\'file18\'' + ')" class="btn btn-mini btn-primary">上传</button>'
                    }
                }
            }, {
                field: 'file19',
                title: '生活类费用照片2',
                align: 'center',
                sortable: true,
                width: 150,
                formatter: function (value, row, index) {
                    if (value != null && value != "") {
                        var a = value.split("/");
                        a = "/" + a[a.length - 1];
                        return '<a href="' + a + '" style="display:block" target="_blank"><img src="' + a + '" style="width: 50px;"></a> <button onclick="javascript:fileUp(' + row.id + ',' + '\'file19\'' + ')" class="btn btn-mini btn-primary">上传</button> <button onclick="javascript:fileDel(' + row.id + ',' + '\'file19\'' + ')" class="btn btn-mini btn-primary">删除</button>'
                    } else {
                        return '<button onclick="javascript:fileUp(' + row.id + ',' + '\'file19\'' + ')" class="btn btn-mini btn-primary">上传</button>'
                    }
                }
            }, {
                field: 'file20',
                title: '生活类费用照片3',
                align: 'center',
                sortable: true,
                width: 150,
                formatter: function (value, row, index) {
                    if (value != null && value != "") {
                        var a = value.split("/");
                        a = "/" + a[a.length - 1];
                        return '<a href="' + a + '" style="display:block" target="_blank"><img src="' + a + '" style="width: 50px;"></a> <button onclick="javascript:fileUp(' + row.id + ',' + '\'file20\'' + ')" class="btn btn-mini btn-primary">上传</button> <button onclick="javascript:fileDel(' + row.id + ',' + '\'file20\'' + ')" class="btn btn-mini btn-primary">删除</button>'
                    } else {
                        return '<button onclick="javascript:fileUp(' + row.id + ',' + '\'file20\'' + ')" class="btn btn-mini btn-primary">上传</button>'
                    }
                }
            }, {
                field: 'file21',
                title: '生活类费用照片4',
                align: 'center',
                sortable: true,
                width: 150,
                formatter: function (value, row, index) {
                    if (value != null && value != "") {
                        var a = value.split("/");
                        a = "/" + a[a.length - 1];
                        return '<a href="' + a + '" style="display:block" target="_blank"><img src="' + a + '" style="width: 50px;"></a> <button onclick="javascript:fileUp(' + row.id + ',' + '\'file21\'' + ')" class="btn btn-mini btn-primary">上传</button> <button onclick="javascript:fileDel(' + row.id + ',' + '\'file21\'' + ')" class="btn btn-mini btn-primary">删除</button>'
                    } else {
                        return '<button onclick="javascript:fileUp(' + row.id + ',' + '\'file21\'' + ')" class="btn btn-mini btn-primary">上传</button>'
                    }
                }
            }


            // , {
            //     field: '',
            //     title: '查看文件',
            //     align: 'center',
            //     sortable: true,
            //     width: 100,
            //     formatter: function (value, row, index) {
            //         return '<button onclick="javascript:getFileList(' + row.id + ')" class="btn btn-primary">查看</button>'
            //     }
            // }
        ],

        // onClickRow: function (row, el) {
        //     let isSelect = $(el).hasClass('selected');
        //     if (isSelect) {
        //         $(el).removeClass('selected')
        //     } else {
        //         $(el).addClass('selected')
        //     }
        // }
    });
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

function fileUp(id, column) {
    fileId = id;
    fileColumn = column;
    $('#file').trigger('click');
}


function fileDel(id, column) {
    $ajax({
        type: 'post',
        url: '/shujv/fileDel',
        data: {
            id: id,
            column: column,
        }
    }, false, '', function (res) {
        if (res.code == 200) {
            alert(res.msg);
            getList();
        }
    })
}