/**
 * 判断是否为空
 */
export function validatenull(val) {
    if (typeof val === 'boolean') {
        return false
    }
    if (typeof val === 'number') {
        return false
    }
    if (val instanceof Array) {
        if (val.length === 0) return true
    } else if (val instanceof Object) {
        if (JSON.stringify(val) === '{}') return true
    } else {
        if (val === 'null' || val == null || val === 'undefined' || val === undefined || val === '') return true
        return false
    }
    return false
}

/**
 * 对象深拷贝
 */
export const deepClone = data => {
    var type = getObjType(data)
    var obj
    if (type === 'array') {
        obj = []
    } else if (type === 'object') {
        obj = {}
    } else {
        // 不再具有下一层次
        return data
    }
    if (type === 'array') {
        for (var i = 0, len = data.length; i < len; i++) {
            obj.push(deepClone(data[i]))
        }
    } else if (type === 'object') {
        for (var key in data) {
            obj[key] = deepClone(data[key])
        }
    }
    return obj
}


/**
 * 浏览器判断是否全屏
 */
export const fullscreenToggel = () => {
    if (fullscreenEnable()) {
        exitFullScreen()
    } else {
        reqFullScreen()
    }
}
/**
 * esc监听全屏
 */
export const listenfullscreen = callback => {
    function listen() {
        callback()
    }

    document.addEventListener('fullscreenchange', function () {
        listen()
    })
    document.addEventListener('mozfullscreenchange', function () {
        listen()
    })
    document.addEventListener('webkitfullscreenchange', function () {
        listen()
    })
    document.addEventListener('msfullscreenchange', function () {
        listen()
    })
}
/**
 * 浏览器判断是否全屏
 */
export const fullscreenEnable = () => {
    return (
        document.isFullScreen ||
        document.mozIsFullScreen ||
        document.webkitIsFullScreen
    )
}

/**
 * 浏览器全屏
 */
export const reqFullScreen = () => {
    if (document.documentElement.requestFullScreen) {
        document.documentElement.requestFullScreen()
    } else if (document.documentElement.webkitRequestFullScreen) {
        document.documentElement.webkitRequestFullScreen()
    } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen()
    }
}
/**
 * 浏览器退出全屏
 */
export const exitFullScreen = () => {
    if (document.documentElement.requestFullScreen) {
        document.exitFullScreen()
    } else if (document.documentElement.webkitRequestFullScreen) {
        document.webkitCancelFullScreen()
    } else if (document.documentElement.mozRequestFullScreen) {
        document.mozCancelFullScreen()
    }
}

/**
 * 生成随机len位数字
 */
export const randomLenNum = (len, date) => {
    let random = ''
    random = Math.ceil(Math.random() * 100000000000000)
        .toString()
        .substr(0, len || 4)
    if (date) random = random + Date.now()
    return random
}

/**
 * tree to array 【扁平化数据】
 * */
export const treeToArray = (data) => {
    return data.reduce((res, { children = [], ...params }) => {
        params['children'] = [];
        return res.concat([params], treeToArray(children))
    }, [])
}


/**
 * listToTree
 */
export function listToTree(list, parent) {
    const out = []
    for (let node of list) {
        if (node.parentId == parent) {
            // 递归
            let children = listToTree(list, node.id)
            if (children.length) {
                node.children = children
            }
            out.push(node)
        }
    }
    return out
}


/**
 * 简单实现防抖方法
 *
 * 防抖(debounce)函数在第一次触发给定的函数时，不立即执行函数，而是给出一个期限值(delay)，比如100ms。
 * 如果100ms内再次执行函数，就重新开始计时，直到计时结束后再真正执行函数。
 * 这样做的好处是如果短时间内大量触发同一事件，只会执行一次函数。
 *
 * @param fn 要防抖的函数
 * @param delay 防抖的毫秒数
 * @returns {Function}
 */
export function simpleDebounce(fn, delay = 500) {
    let timer = null
    return function () {
        let args = arguments
        if (timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(() => {
            fn.apply(this, args)
        }, delay)
    }
}

/**
 *
 * 获取指定时间范围内指定间隔天数的所有日期
 * getDateStr('2023-02-01', '2023-03-10', 0);
 * */
export function getDateStr(startDate, endDate, dayLength) {
    let str = startDate;
    for (let i = 0; ; i++) {
        let getDate = getTargetDate(startDate, dayLength);
        startDate = getDate;
        if (getDate <= endDate) {
            str += ',' + getDate;
        } else {
            break;
        }
    }
    return str;
}
export function getTargetDate(date, dayLength) {
    dayLength = dayLength + 1;
    let tempDate = new Date(date);
    tempDate.setDate(tempDate.getDate() + dayLength);
    let year = tempDate.getFullYear();
    let month = tempDate.getMonth() + 1 < 10 ? "0" + (tempDate.getMonth() + 1) : tempDate.getMonth() + 1;
    let day = tempDate.getDate() < 10 ? "0" + tempDate.getDate() : tempDate.getDate();
    return year + "-" + month + "-" + day;
}


/**
 * 计算两个日期之间的天数
 *  date1  开始日期 yyyy-MM-dd
 *  date2  结束日期 yyyy-MM-dd
 *  如果日期相同 返回一天 开始日期大于结束日期，返回0
 */
export function getDaysBetween(date1, date2) {
    let startDate = Date.parse(date1);
    let endDate = Date.parse(date2);
    if (startDate > endDate) {
        return 0;
    }
    if (startDate == endDate) {
        return 1;
    }
    let days = (endDate - startDate) / (1 * 24 * 60 * 60 * 1000);
    return days;
}


/**
 * 数组嵌套json 去重
 * id 判断条件字段
 */
export function unRepeat(arr, id) {
    const res = new Map();
    return arr.filter((arr) => !res.has(arr[id]) && res.set(arr[id], 1))
}

/**
 * 复制上下文
 * */
export function copyToClipboard(textToCopy) {
    // navigator clipboard 需要https等安全上下文
    if (navigator.clipboard && window.isSecureContext) {
        // navigator clipboard 向剪贴板写文本
        return navigator.clipboard.writeText(textToCopy);
    } else {
        // 创建text area
        let textArea = document.createElement("textarea");
        textArea.value = textToCopy;
        // 使text area不在viewport，同时设置不可见
        textArea.style.position = "absolute";
        textArea.style.opacity = 0;
        textArea.style.left = "-999999px";
        textArea.style.top = "-999999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        return new Promise((res, rej) => {
            // 执行复制命令并移除文本框
            document.execCommand('copy') ? res() : rej();
            textArea.remove();
        });
    }
}


/**
 * element-plus 单元格合并
 * tableConfig: {
 *    combineProp: ["bridgeId"], // 需要合并的字段key,按顺序树状合并
 *    tableIndex: [0], // 列表合并列的下标和combineProp对应
 * }
 * this.tableList = mergeRowspan(
 *         this.tableData,
 *         this.tableConfig.combineProp
 *       );
 *
 */

export const mergeRowspan = (tableData, combineProp) => {
    if (!tableData.length) {
        return tableData;
    }
    // 读取配置
    // 判断基准值是否存在 | 基准值是否tableData中数据的属性
    if (!combineProp[0] || !tableData[0][combineProp[0]]) {
        return tableData;
    }
    const fn = (tableData, i = 0) => {
        let column = combineProp[i];
        let tableDataGroup = tableData.reduce((pre, current) => {
            if (!pre[current[column]]) {
                current[`${column}Span`] = {
                    rowspan: 1,
                    colspan: 1,
                };
                pre[current[column]] = [current];
                return pre;
            } else {
                current[`${column}Span`] = {
                    rowspan: 0,
                    colspan: 0,
                };
                pre[current[column]][0][`${column}Span`].rowspan =
                    pre[current[column]].length + 1;
                pre[current[column]].push(current);
                return pre;
            }
        }, {});
        i++;
        if (combineProp[i]) {
            for (let key in tableDataGroup) {
                tableDataGroup[key] = fn(tableDataGroup[key], i);
            }
        }
        return tableDataGroup;
    };
    let tableDataGroup = fn(tableData);
    const treeToArray = (tree) => {
        // 判断 tree 是否有值，无返回 []
        if (Array.isArray(tree) && tree.length) return Array.from(tree);
        let res = [];
        for (let key in tree) {
            res.push(...treeToArray(tree[key]));
        }
        return res;
    };
    let list = treeToArray(tableDataGroup);
    return list;
}
/**
 * element-plus el-tabel span-method 函数
 * 使用方式
 * :span-method="objectSpanMethod(tableConfig)"
 *
 */
export const objectSpanMethod = (tableConfig) => {
    // 需要合并的列，需求是合并第一、二列
    return ({ row, column, rowIndex, columnIndex }) => {
        let list = tableConfig.combineProp;
        let indexlist = tableConfig.tableIndex;
        for (let i = 0; i < list.length; i++) {
            if (!row[list[i]]) break;
            if (indexlist[i] === columnIndex) {
                let rowspan = row[`${list[i]}Span`]["rowspan"];
                let colspan = row[`${list[i]}Span`]["colspan"];
                return {
                    rowspan: rowspan,
                    colspan: colspan,
                };
            }
        }
    };
}
